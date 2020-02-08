import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';
import { wait } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';
import factory from '../utils/factories';
import User from '~/pages/User';

const api_mock = new MockAdapter(api);

describe('User page', () => {
  it('should be able to see user details', async () => {
    const user = await factory.attrs('User');

    api_mock
      .onGet(`https://api.github.com//users/${user.login}/starred`)
      .reply(200, []);

    const { getByText } = render(
      <User
        navigation={{ navigate: jest.fn(), getParam: jest.fn(() => user) }}
      />
    );

    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.bio)).toBeTruthy();
  });

  it("should be able to see user's projects starred", async () => {
    const user = await factory.attrs('User');
    const repository = await factory.attrs('Repository');

    api_mock
      .onGet(`https://api.github.com/users/${user.login}/starred`)
      .reply(200, [repository]);

    let getByText;
    let getByTestId;

    await wait(async () => {
      const component = render(
        <User
          navigation={{ navigate: jest.fn(), getParam: jest.fn(() => user) }}
        />
      );

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
    const navigate = jest.fn();

    api_mock
      .onGet(`https://api.github.com/users/${user.login}/starred`)
      .reply(200, [repository]);

    let getByTestId;

    await wait(async () => {
      const component = render(
        <User navigation={{ navigate, getParam: jest.fn(() => user) }} />
      );

      getByTestId = component.getByTestId;
    });

    await waitForElement(() => getByTestId(`repository_${repository.id}`));

    fireEvent.press(getByTestId(`repository_${repository.id}`));

    expect(navigate).toHaveBeenCalledWith('Repository', { repository });
  });

  it('should be able to get second page', async () => {
    const user = await factory.attrs('User');
    const [page_1, page_2] = await factory.attrsMany('Repository', 2);

    api_mock
      .onGet(`https://api.github.com/users/${user.login}/starred`, {
        params: {
          page: 1,
        },
      })
      .reply(200, [page_1]);

    api_mock
      .onGet(`https://api.github.com/users/${user.login}/starred`, {
        params: {
          page: 2,
        },
      })
      .reply(200, [page_2]);

    let getByType;
    let getByTestId;

    await wait(async () => {
      const component = render(
        <User
          navigation={{ navigate: jest.fn(), getParam: jest.fn(() => user) }}
        />
      );

      getByTestId = component.getByTestId;
      getByType = component.getByType;
    });

    await waitForElement(() => getByTestId(`repository_${page_1.id}`));

    await act(async () => {
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
});
