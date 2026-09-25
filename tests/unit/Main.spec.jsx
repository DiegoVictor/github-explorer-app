import { Alert } from 'react-native';
import { faker } from '@faker-js/faker';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { factory } from '../utils/factory';
import { Main } from '../../src/pages/Main';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const mockApiGet = jest.fn();
jest.mock('../../src/services/github', () => {
  return {
    api: {
      get: async (...args) => mockApiGet(...args),
    },
  };
});

describe('Main page', () => {
  it('should be able to add user', async () => {
    const username = faker.internet.username();
    const user = await factory.attrs('User');

    mockApiGet.mockResolvedValueOnce({ data: user });

    const { getByTestId, getByText } = await render(<Main />);

    await fireEvent.changeText(getByTestId('input_user'), username);
    await fireEvent.press(getByTestId('add_user'));

    await waitFor(() => getByTestId(`user_${user.login}`));

    expect(getByTestId(`user_${user.login}`)).toBeTruthy();
    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.bio)).toBeTruthy();
  });

  it('should not be able to add an user twice', async () => {
    const user = await factory.attrs('User');

    await AsyncStorage.setItem('users', JSON.stringify([user]));

    const { getByTestId, getByText } = await render(<Main />);

    await waitFor(() => getByTestId(`user_${user.login}`));

    await fireEvent.changeText(getByTestId('input_user'), user.login);
    await fireEvent.press(getByTestId('add_user'));

    expect(getByText('Este usuário já foi adicionado!')).toBeTruthy();
  });

  it('should not be able to add user without username', async () => {
    await AsyncStorage.setItem('users', JSON.stringify([]));

    const { getByTestId, getByText } = await render(<Main />);

    await fireEvent.press(getByTestId('add_user'));

    expect(getByText('Digite um usuário válido')).toBeTruthy();
  });

  it('should not be able to add invalid user', async () => {
    const username = faker.internet.username();

    await AsyncStorage.setItem('users', JSON.stringify([]));
    mockApiGet.mockRejectedValueOnce({ response: { status: 400 } });

    const alert = jest.spyOn(Alert, 'alert');

    const { getByTestId } = await render(<Main />);

    await fireEvent.changeText(getByTestId('input_user'), username);
    await fireEvent.press(getByTestId('add_user'));

    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!',
    );
  });

  it('should be able to delete a user', async () => {
    const user = await factory.attrs('User');

    await AsyncStorage.setItem('users', JSON.stringify([user]));

    const { getByTestId, queryByTestId } = await render(<Main />);

    await waitFor(() => getByTestId(`user_remove_${user.login}`));
    await fireEvent.press(getByTestId(`user_remove_${user.login}`));

    expect(queryByTestId(`user_${user.login}`)).toBeFalsy();
  });

  it('should be able to navigate to user profile', async () => {
    const user = await factory.attrs('User');

    await AsyncStorage.setItem('users', JSON.stringify([user]));

    const { getByTestId } = await render(<Main />);

    await waitFor(() => getByTestId(`user_${user.login}`));
    await fireEvent.press(getByTestId(`user_${user.login}`));

    expect(mockedNavigate).toHaveBeenCalledWith('User', { user });
  });
});
