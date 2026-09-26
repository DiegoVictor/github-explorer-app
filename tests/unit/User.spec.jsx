import { waitFor, render, fireEvent } from '@testing-library/react-native';
import { factory } from '../utils/factory';
import { User } from '../../src/pages/User';

const mockedNavigate = jest.fn();
let mockedRoute = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: () => mockedRoute(),
  };
});

const mockApiGet = jest.fn();
jest.mock('../../src/services/github', () => {
  return {
    api: {
      get: (...args) => mockApiGet(...args),
    },
  };
});

describe('User page', () => {
  it('should be able to see user details', async () => {
    const user = await factory.attrs('User');
    mockedRoute = () => ({
      params: { user },
    });

    mockApiGet.mockResolvedValueOnce({ data: [] });

    const { getByText } = await render(<User />);

    await waitFor(() => getByText(user.name));

    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.bio)).toBeTruthy();
  });

  it("should be able to see user's projects starred", async () => {
    const user = await factory.attrs('User');
    const repository = await factory.attrs('Repository');

    mockApiGet.mockResolvedValueOnce({ data: [repository] });
    mockedRoute = () => ({
      params: { user },
    });

    const { getByTestId, getByText } = await render(<User />);

    await waitFor(() => getByTestId(`repository_${repository.id}`));

    expect(getByText(repository.name)).toBeTruthy();
    expect(getByText(repository.owner.login)).toBeTruthy();
  });

  it('should be able to navigate to repository page', async () => {
    const user = await factory.attrs('User');
    const repository = await factory.attrs('Repository');

    mockApiGet.mockResolvedValueOnce({ data: [repository] });
    mockedRoute = () => ({
      params: { user },
    });

    const { getByTestId } = await render(<User />);

    await waitFor(() => getByTestId(`repository_${repository.id}`));
    await fireEvent.press(getByTestId(`repository_${repository.id}`));

    expect(mockedNavigate).toHaveBeenCalledWith('Repository', { repository });
  });

  it('should be able to get the second page of starred repos', async () => {
    const user = await factory.attrs('User');
    const [page1, page2] = await factory.attrsMany('Repository', 2);

    mockApiGet
      .mockResolvedValueOnce({ data: [page1] })
      .mockResolvedValueOnce({ data: [page2] });

    mockedRoute = () => ({
      params: { user },
    });

    const { getByTestId } = await render(<User />);

    await waitFor(() => getByTestId(`repository_${page1.id}`));

    const flatList = getByTestId('list');
    await fireEvent(flatList, 'onEndReached');

    await waitFor(() => getByTestId(`repository_${page2.id}`));

    expect(getByTestId(`repository_${page2.id}`)).toBeTruthy();
  });

  it('should not be able to get the second page of starred repos', async () => {
    const user = await factory.attrs('User');
    const repo = await factory.attrs('Repository');

    mockApiGet
      .mockResolvedValueOnce({ data: [repo] })
      .mockResolvedValueOnce({ data: [] });

    mockedRoute = () => ({
      params: { user },
    });

    const { getByTestId } = await render(<User />);

    await waitFor(() => getByTestId(`repository_${repo.id}`));

    const repository = getByTestId(`repository_${repo.id}`);
    await fireEvent.scroll(repository.parent, {
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

    expect(getByTestId(`repository_${repo.id}`)).toBeTruthy();
  });
});
