import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/github';
import {
  Container,
  HeaderContainer,
  Header,
  BackButton,
  HeaderImage,
  User,
  Avatar,
  Name,
  Bio,
  Stars,
  EmptyList,
  EmptyListText,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default () => {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params;

  const loadMore = useCallback(async () => {
    const { data } = await api.get(`/users/${user.login}/starred`, {
      params: { page: page + 1 },
    });

    if (data.length > 0) {
      setStars([...stars, ...data]);
    }

    setPage(page + 1);
    setLoading(false);
  }, [stars, page, user]);

  const handlePress = useCallback(repository => {
    navigation.navigate('Repository', { repository });
  }, []);

  useEffect(() => {
    api
      .get(`/users/${user.login}/starred`, {
        params: { page },
      })
      .then(({ data }) => {
        setStars(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <BackButton onPress={navigation.goBack}>
            <Icon name="keyboard-arrow-left" color="#FFF" size={20} />
          </BackButton>

          <HeaderImage />
        </Header>

        <User>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </User>
      </HeaderContainer>

      {loading ? (
        <Loading>
          <ActivityIndicator color="#121214" />
        </Loading>
      ) : (
        <Stars
          testID="list"
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          ListEmptyComponent={
            <EmptyList>
              <EmptyListText>Sem repos para listar!</EmptyListText>
            </EmptyList>
          }
          renderItem={({ item: repository }) => (
            <Starred
              testID={`repository_${repository.id}`}
              onPress={() => handlePress(repository)}
            >
              <OwnerAvatar source={{ uri: repository.owner.avatar_url }} />
              <Info>
                <Title>{repository.name}</Title>
                <Author>{repository.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
};
