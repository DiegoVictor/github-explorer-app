import React from 'react';
import { StatusBar } from 'react-native';

import Routes from '~/routes';

export default () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
      <Routes />
    </>
  );
};
