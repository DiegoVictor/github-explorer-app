import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
} from 'react-native-testing-library';
import { wait } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/github';
import factory from '../utils/factory';
import User from '~/pages/User';

const mockedNavigate = jest.fn();
let mockedRoute = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: () => {
      return mockedRoute();
    },
  };
});

describe('User page', () => {
  const apiMock = new MockAdapter(api);
  const url = 'https://api.github.com/users/';

  it('should be able to see user details', async () => {
    const user = await factory.attrs('User');
    mockedRoute = () => ({
      params: { user },
    });

    apiMock.onGet(`${url}${user.login}/starred`).reply(200, []);

    let getByText;
    await wait(async () => {
      const component = render(<User />);
      getByText = component.getByText;
    });

    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.bio)).toBeTruthy();
  });

  it("should be able to see user's projects starred", async () => {
    const user = await factory.attrs('User');
    const repository = await factory.attrs('Repository');

    apiMock.onGet(`${url}${user.login}/starred`).reply(200, [repository]);
    mockedRoute = () => ({
      params: { user },
    });

    let getByText;
    let getByTestId;
    await wait(async () => {
      const component = render(<User />);

      getByText = component.getByText;
      getByTestId = component.getByTestId;
    });

    await waitForElement(() => getByTestId(`repository_${repository.id}`));

    expect(getByText(repository.name)).toBeTruthy();
    expect(getByText(repository.owner.login)).toBeTruthy();
  });

  it('should be able to navigate to repository page', async () => {
    const user = await factory.attrs('User');
    const repository = await factory.attrs('Repository');

    apiMock.onGet(`${url}${user.login}/starred`).reply(200, [repository]);
    mockedRoute = () => ({
      params: { user },
    });

    let getByTestId;
    await wait(async () => {
      const component = render(<User />);

      getByTestId = component.getByTestId;
    });

    await waitForElement(() => getByTestId(`repository_${repository.id}`));
    fireEvent.press(getByTestId(`repository_${repository.id}`));

    expect(mockedNavigate).toHaveBeenCalledWith('Repository', { repository });
  });

  it('should be able to get the second page of starred repos', async () => {
    const user = await factory.attrs('User');
    const [page_1, page_2] = await factory.attrsMany('Repository', 2);

    apiMock
      .onGet(`${url}${user.login}/starred`, {
        params: {
          page: 1,
        },
      })
      .reply(200, [page_1])
      .onGet(`${url}${user.login}/starred`, {
        params: {
          page: 2,
        },
      })
      .reply(200, [page_2]);

    mockedRoute = () => ({
      params: { user },
    });

    let getByType;
    let getByTestId;
    await wait(async () => {
      const component = render(<User />);

      getByTestId = component.getByTestId;
      getByType = component.getByType;
    });

    await waitForElement(() => getByTestId(`repository_${page_1.id}`));
    await wait(async () => {
      fireEvent.scroll(getByType('ScrollView'), {
        nativeEvent: {
          contentOffset: {
            y: 221,
          },
          contentSize: {
            height: 200,
            width: 100,
          },
          layoutMeasurement: {
            height: 100,
            width: 100,
          },
        },
      });
    });

    expect(getByTestId(`repository_${page_2.id}`)).toBeTruthy();
  });

  it('should not be able to get the second page of starred repos', async () => {
    const user = await factory.attrs('User');
    const repo = await factory.attrs('Repository');

    apiMock
      .onGet(`${url}${user.login}/starred`, {
        params: {
          page: 1,
        },
      })
      .reply(200, [repo])
      .onGet(`${url}${user.login}/starred`, {
        params: {
          page: 2,
        },
      })
      .reply(200, []);

    mockedRoute = () => ({
      params: { user },
    });

    let getByType;
    let getByTestId;
    await wait(async () => {
      const component = render(<User />);

      getByTestId = component.getByTestId;
      getByType = component.UNSAFE_getByType;
    });

    await waitForElement(() => getByTestId(`repository_${repo.id}`));
    await wait(async () => {
      fireEvent.scroll(getByType('ScrollView'), {
        nativeEvent: {
          contentOffset: {
            y: 221,
          },
          contentSize: {
            height: 200,
            width: 100,
          },
          layoutMeasurement: {
            height: 100,
            width: 100,
          },
        },
      });
    });

    expect(getByTestId(`repository_${repo.id}`)).toBeTruthy();
  });
});
