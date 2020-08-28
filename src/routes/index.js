import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '~/pages/Main';
import Repository from '~/pages/Repository';
import User from '~/pages/User';

const { Navigator, Screen } = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Main" component={Main} />
        <Screen name="User" component={User} />
        <Screen name="Repository" component={Repository} />
      </Navigator>
    </NavigationContainer>
  );
};
