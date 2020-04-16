import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configStore from './src/store/configureStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

const store = configStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
