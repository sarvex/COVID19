import React, {Component} from 'react';
import Navigator from './src/routes/homeStack';
import {ApiHelperGET} from './src/util/APIhelper';
import SpinnerModal from './src/common/SpinnerModal';

export default class App extends Component {
  state = {
    dataSet: {},
    id: '',
    showLoader: false,
  };
  componentDidMount() {
    let url = `https://95vhy0wg9d.execute-api.eu-west-2.amazonaws.com/ghcovid19testtracker?locale=ENG`;
    const encoded = encodeURI(url);
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
