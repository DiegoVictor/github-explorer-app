import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/github';
import {
  Container,
  Header,
  HeaderImage,
  Form,
  Label,
  Search,
  Input,
  Button,
  Error,
  List,
  User,
  Avatar,
  About,
  Name,
  Bio,
  Actions,
  Action,
} from './styles';

export default () => {
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  const handleAddUser = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const foundUser = users.find(
        user => user.login.toLowerCase() === newUser.toLowerCase(),
      );

      if (foundUser) {
        setError('Este usuário já foi adicionado!');
      } else {
        const schema = Yup.string('Deve ser um usuário válido')
          .min(3, 'Deve conter pelo menos 3 caracteres')
          .required('Digite um usuário válido');

        await schema.validate(newUser, { abortEarly: false });

        const { data } = await api.get(`/users/${newUser}`);
        const user = {
          name: data.name.trim(),
          login: data.login.trim(),
          bio: data.bio.trim(),
          avatar: data.avatar_url.trim(),
        };

        setUsers([user, ...users]);
        setNewUser('');

        await AsyncStorage.setItem('users', JSON.stringify([user, ...users]));
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.inner.pop().message);
      } else {
        Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
      }
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  }, [newUser, users]);

  const handleRemoveUser = useCallback(
    async login => {
      const updatedUsers = users.filter(user => user.login !== login);

      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    },
    [users],
  );

  const handleNavigate = useCallback(user => {
    navigation.navigate('User', { user });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('users').then(starred_users => {
      if (starred_users) {
        setUsers(JSON.parse(starred_users));
      }
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderImage />
        <Form>
          <Label>Explore usuários no GitHub:</Label>
          <Search>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite um nome de usuário"
              value={newUser}
              onChangeText={text => setNewUser(text)}
              returnKeyType="send"
              onSubmitEditing={handleAddUser}
            />
            <Button onPress={handleAddUser} testID="add_user">
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="search" size={27} color="#FFF" />
              )}
            </Button>
          </Search>

          {error.length > 0 && <Error>{error}</Error>}
        </Form>
      </Header>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item: user }) => (
          <User
            testID={`user_${user.login}`}
            onPress={() => handleNavigate(user)}
          >
            <Avatar source={{ uri: user.avatar }} />

            <About>
              <Name>{user.name}</Name>
              <Bio>{user.bio}</Bio>
            </About>

            <Actions>
              <Action
                testID={`user_remove_${user.login}`}
                onPress={() => {
                  handleRemoveUser(user.login);
                }}
              >
                <Icon name="delete" color="#fff" size={15} />
              </Action>
            </Actions>
          </User>
        )}
      />
    </Container>
  );
};
