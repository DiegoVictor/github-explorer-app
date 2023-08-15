import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

export default () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#121214" />
      <Routes />
    </React.Fragment>
  );
};
