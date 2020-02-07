import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '~/pages/Main';
import User from '~/pages/User';
import Repository from '~/pages/Repository';

export default createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: () => ({
          title: 'Usuários',
        }),
      },
      User: {
        screen: User,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam('user').name,
        }),
      },
      Repository: {
        screen: Repository,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam('repository').name,
        }),
      },
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159C1',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);
