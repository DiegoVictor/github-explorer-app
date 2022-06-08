import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { act, waitFor } from '@testing-library/react-native';
import { render, fireEvent } from 'react-native-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { Keyboard, Alert } from 'react-native';
import { faker } from '@faker-js/faker';

import api from '~/services/github';
import factory from '../utils/factory';
import Main from '~/pages/Main';

const mockedNavigate = jest.fn();

jest.mock('react-native-gesture-handler');
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Main page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to add user', async () => {
    const username = faker.internet.userName();
    const user = await factory.attrs('User');

    apiMock.onGet(`https://api.github.com/users/${username}`).reply(200, user);

    const dismiss = jest.fn();
    jest.spyOn(Keyboard, 'dismiss').mockImplementation(dismiss);

    const { getByPlaceholder, getByTestId, getByText } = render(<Main />);

    await waitFor(async () => {
      fireEvent.changeText(
        getByPlaceholder('Digite um nome de usuário'),
        username,
      );
    });
    await act(async () => {
      fireEvent.press(getByTestId('add_user'));
    });

    expect(dismiss).toHaveBeenCalled();
    expect(getByTestId(`user_${user.login}`)).toBeTruthy();
    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.bio)).toBeTruthy();
  });

  it('should not be able to add an user twice', async () => {
    const username = faker.internet.userName();
    const user = await factory.attrs('User', { login: username });

    await AsyncStorage.setItem('users', JSON.stringify([user]));
    apiMock.onGet(`https://api.github.com/users/${username}`).reply(200, user);

    const dismiss = jest.fn();
    jest.spyOn(Keyboard, 'dismiss').mockImplementation(dismiss);

    const { getByPlaceholder, getByTestId, getByText } = render(<Main />);

    await act(async () => {
      fireEvent.changeText(
        getByPlaceholder('Digite um nome de usuário'),
        username,
      );
    });
    await act(async () => {
      fireEvent.press(getByTestId('add_user'));
    });

    expect(dismiss).toHaveBeenCalled();
    expect(getByText('Este usuário já foi adicionado!')).toBeTruthy();
  });

  it('should not be able to add user without type its username', async () => {
    await AsyncStorage.setItem('users', JSON.stringify([]));

    const dismiss = jest.fn();
    jest.spyOn(Keyboard, 'dismiss').mockImplementation(dismiss);

    const { getByTestId, getByText } = render(<Main />);

    await act(async () => {
      fireEvent.press(getByTestId('add_user'));
    });

    expect(dismiss).toHaveBeenCalled();
    expect(getByText('Digite um usuário válido')).toBeTruthy();
  });

  it('should not be able to add invalid user', async () => {
    const username = faker.internet.userName();

    await AsyncStorage.setItem('users', JSON.stringify([]));
    apiMock.onGet(`https://api.github.com/users/${username}`).reply(400);

    const dismiss = jest.fn();
    const alert = jest.fn();
    jest.spyOn(Keyboard, 'dismiss').mockImplementation(dismiss);
    jest.spyOn(Alert, 'alert').mockImplementation(alert);

    const { getByPlaceholder, getByTestId } = render(<Main />);

    await act(async () => {
      fireEvent.changeText(
        getByPlaceholder('Digite um nome de usuário'),
        username,
      );
    });
    await act(async () => {
      fireEvent.press(getByTestId('add_user'));
    });

    expect(dismiss).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!',
    );
  });

  it('should be able to delete a user', async () => {
    const user = await factory.attrs('User');

    await AsyncStorage.setItem('users', JSON.stringify([user]));

    const { getByTestId, queryByTestId } = render(<Main />);

    await waitFor(() => getByTestId(`user_remove_${user.login}`));
    await act(async () => {
      fireEvent.press(getByTestId(`user_remove_${user.login}`));
    });

    expect(queryByTestId(`user_${user.login}`)).toBeFalsy();
  });

  it('should be able to navigate to user profile', async () => {
    const user = await factory.attrs('User');

    await AsyncStorage.setItem('users', JSON.stringify([user]));

    const { getByTestId } = render(<Main />);

    await waitFor(() => getByTestId(`user_${user.login}`));
    await act(async () => {
      fireEvent.press(getByTestId(`user_${user.login}`));
    });

    expect(mockedNavigate).toHaveBeenCalledWith('User', { user });
  });
});
