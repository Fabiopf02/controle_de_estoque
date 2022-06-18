import React from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';

import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#925bf0" />
      <Routes />
      <Toast />
    </>
  );
};

export default App;
