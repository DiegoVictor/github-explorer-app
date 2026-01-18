import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from '../pages/Main';
import Repository from '../pages/Repository';
import User from '../pages/User';

const { Navigator, Screen } = createNativeStackNavigator();

export const Routes = () => {
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
