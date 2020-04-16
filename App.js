import React, {Component} from 'react';
import Navigator from './src/routes/homeStack';
import {ApiHelperGET} from './src/util/APIhelper';

export default class App extends Component {
  state = {
    dataSet: {},
    id: '',
  };
  componentDidMount() {
    let url = `https://95vhy0wg9d.execute-api.eu-west-2.amazonaws.com/ghcovid19testtracker?locale=ENG`;
    let urlProd = `https://lu8tf795jk.execute-api.eu-west-2.amazonaws.com/prod?locale=ENG`;
    ApiHelperGET(url, {}).then((response) => {
      if (response.statusCode == 403) {
        this.setState({dataSet: {errorMessage: response.body.errorMessage}});
      } else {
        this.setState({dataSet: response});
      }
    });
  }
  render() {
    const {dataSet} = this.state;
    return <Navigator screenProps={dataSet} />;
  }
}
