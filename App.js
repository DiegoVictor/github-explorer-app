import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121214" />
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </>
  );
}
