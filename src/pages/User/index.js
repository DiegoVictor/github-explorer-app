import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const user = navigation.getParam('user');

  const loadMore = useCallback(() => {
    (async () => {
      const { data } = await api.get(`/users/${user.login}/starred`, {
        params: { page: page + 1 },
      });

      if (data.length > 0) {
        setStars([...stars, ...data]);
  }
      setPage(page + 1);
      setLoading(false);
    })();
  }, [stars, page, user]);

  const handlePress = useCallback(repository => {
    navigation.navigate('Repository', { repository });
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });
      setStars(data);
      setLoading(false);
    })();
  }, []);

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading>
            <ActivityIndicator color="#7159C1" />
          </Loading>
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
