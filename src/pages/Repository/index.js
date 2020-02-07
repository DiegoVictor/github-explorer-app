import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({ navigation }) {
  return (
    <WebView
      source={{ uri: navigation.getParam('repository').html_url }}
      style={{ flex: 1 }}
    />
  );
}

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
