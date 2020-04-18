/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigator from './src/routes/homeStack';
import { ApiHelperGET } from './src/util/APIhelper';
import { SECTION_API_URL } from './src/util/constants';
import SpinnerModal from './src/common/SpinnerModal';
import { Alert } from 'react-native';

export default class App extends Component {
  state = {
    dataSet: {},
    id: '',
    showLoader: false,
  };
  componentDidMount() {
    const encoded = encodeURI(SECTION_API_URL);
    try {
      this.setState({ showLoader: true });
      ApiHelperGET(SECTION_API_URL, {}).then((response) => {
        if (response.statusCode == 403) {
          this.setState({ dataSet: { errorMessage: response.body.errorMessage } });
        } else {
          this.setState({ dataSet: response });
        }
      });
    } catch (error) {
      Alert.alert('Technical error, please try again later')
    } finally {
      this.setState({ showLoader: false });
    }
  }
  render() {
    const { dataSet, showLoader } = this.state;
    return showLoader ? (
      <SpinnerModal visible={showLoader} />
    ) : (
      <Navigator screenProps={dataSet} />
    );
  }
}

