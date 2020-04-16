import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Questions from '../common/Questions';
import ThankYou from './ThankYou';

export class Forms extends Component {
  state = {
    tempData: {},
    counter: 0,
    finalSet: [],
  };

  componentDidMount() {
    const {
      screenProps: {sections},
    } = this.props;
    this.setState({tempData: sections[0]});
  }

  handleFormChange = (dataSet) => {
    const {counter, finalSet} = this.state;
    const {screenProps} = this.props;

    if (counter <= screenProps.sections.length - 1) {
      this.setState({
        finalSet: [...finalSet, dataSet],
        counter: counter + 1,
        tempData: screenProps.sections[counter + 1],
      });
    } else {
      console.log('No Next Page');
    }
  };

  callingQuestions = (count) => {
    const {tempData, finalSet} = this.state;
    const {
      screenProps,
      navigation: {state, push},
    } = this.props;

    let data;
    let set = [];
    const url =
      'https://95vhy0wg9d.execute-api.eu-west-2.amazonaws.com/ghcovid19testtracker';
    const urlProd =
      'https://lu8tf795jk.execute-api.eu-west-2.amazonaws.com/prod';
    if (count < screenProps.sections.length) {
      return (
        <Questions
          dataSet={tempData}
          showSubmit={screenProps.sections.length - count}
          handleFormChange={this.handleFormChange}
        />
      );
    } else {
      finalSet.map((sections) => {
        sections.questions.map((item) => {
          set.push({id: item.id, answer: item.answer});
        });
      });
      data = {
        detail: state.params,
        question: set,
      };
      push('ThankYouScreen', {url: url, data});
    }
  };

  render() {
    const {counter} = this.state;
    const {screenProps} = this.props;
    return (
      <View style={styles.container}>
        {screenProps && this.callingQuestions(counter)}
      </View>
    );
  }
}

export default Forms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#f2f2f7',
  },
});
