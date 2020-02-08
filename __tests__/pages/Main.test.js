import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { act, wait } from '@testing-library/react-native';
import {
  render,
  fireEvent,
  waitForElement,
} from 'react-native-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { Keyboard } from 'react-native';
import faker from 'faker';

import api from '~/services/api';
import Main from '~/pages/Main';
import factory from '../utils/factories';

const api_mock = new MockAdapter(api);

jest.mock('react-native-gesture-handler');

describe('Main page', () => {
  it('should be able to add user', async () => {
    const username = faker.internet.userName();
    const user = await factory.attrs('User');

    await AsyncStorage.setItem('users', []);
    api_mock.onGet(`https://api.github.com/users/${username}`).reply(200, user);

    let getByPlaceholder;
    let getByTestId;
    let getByText;

    Keyboard.dismiss = jest.fn();

    await wait(async () => {
      const component = render(<Main navigation={{ navigate: jest.fn() }} />);

      getByPlaceholder = component.getByPlaceholder;
      getByTestId = component.getByTestId;
      getByText = component.getByText;
    });

    await act(async () => {
      fireEvent.changeText(getByPlaceholder('Adicionar usuário'), username);
    });

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    expect(Keyboard.dismiss).toHaveBeenCalled();
    expect(getByTestId(`user_${user.login}`)).toBeTruthy();
    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.bio)).toBeTruthy();
  });

  it('should be able to navigate to user profile', async () => {
    const user = await factory.attrs('User');
    const navigate = jest.fn();

    await AsyncStorage.setItem('users', [user]);

    let getByTestId;

    await wait(async () => {
      const component = render(<Main navigation={{ navigate }} />);

      getByTestId = component.getByTestId;
    });

    await waitForElement(() => getByTestId(`user_${user.login}`));

    await act(async () => {
      fireEvent.press(getByTestId(`user_profile_${user.login}`));
    });

    expect(navigate).toHaveBeenCalledWith('User', { user });
  });
});
