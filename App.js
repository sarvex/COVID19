import React, {Component} from 'react';
import Navigator from './src/routes/homeStack';
import {ApiHelperGET} from './src/util/APIhelper';
import SpinnerModal from './src/common/SpinnerModal';
import {SECTION_API_URL} from './src/util/constants';

export default class App extends Component {
  state = {
    dataSet: {},
    id: '',
    showLoader: false,
  };
  componentDidMount() {
    const encoded = encodeURI(SECTION_API_URL);
    this.setState({showLoader: true});
    ApiHelperGET(encoded, {}).then((response) => {
      if (response.statusCode == 403) {
        this.setState({
          dataSet: {errorMessage: response.body.errorMessage},
          showLoader: false,
        });
      } else {
        this.setState({dataSet: response, showLoader: false});
      }
    });
  }
  render() {
    const {dataSet, showLoader} = this.state;
    return showLoader ? (
      <SpinnerModal visible={showLoader} />
    ) : (
      <Navigator screenProps={dataSet} />
    );
  }
}
