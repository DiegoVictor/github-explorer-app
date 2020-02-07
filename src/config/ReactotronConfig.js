// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure()
    .useReactNative()
    .connect()
    .clear();
}
