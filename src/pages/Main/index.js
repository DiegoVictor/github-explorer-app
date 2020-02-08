import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const starred_users = await AsyncStorage.getItem('users');

      if (starred_users) {
        setUsers(starred_users);
      }
    })();
  }, []);

  const handleAddUser = useCallback(async () => {
    (async () => {
      if (newUser.length > 0) {
        setLoading(true);

        const { data } = await api.get(`/users/${newUser}`);
        const user = {
          name: data.name,
          login: data.login,
          bio: data.bio,
          avatar: data.avatar_url,
        };

        setUsers([...users, user]);
        setNewUser('');
        setLoading(false);
        await AsyncStorage.setItem('users', JSON.stringify([...users, user]));
      }

      Keyboard.dismiss();
    })();
  }, [newUser]);

  const handleNavigate = useCallback(user => {
    navigation.navigate('User', { user });
  }, []);

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton testID="submit" loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item: user }) => (
          <User testID={`user_${user.login}`}>
            <Avatar source={{ uri: user.avatar }} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>

            <ProfileButton
              testID={`user_profile_${user.login}`}
              onPress={() => handleNavigate(user)}
            >
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
