import React, {Component} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import Questions from '../common/Questions';
import {SUBMIT_QUESTION_API_URL} from '../util/constants';

export class Forms extends Component {
  state = {
    tempData: {},
    counter: 0,
    finalSet: [],
  };

  componentDidMount() {
    // const sections = [...this.props.screenProps.sections];
    // this.setState({tempData: sections[0]});
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        const sections = [...this.props.screenProps.sections];
        this.setState({tempData: sections[0]});
      },
    );

    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      () => {
        // you can perform actions here when the screen `willBlur`
        this.setState({
          tempData: {},
          counter: 0,
          finalSet: [],
        });
      },
    );
  }

  componentWillUnmount() {
    if (this.didBlurSubscription) {
      this.didBlurSubscription.remove();
    }

    if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }

    if (this.backHandler) {
      return () => backHandler.remove();
    }
  }

  moveBack = () => {
    const {counter, finalSet, tempData} = this.state;
    const screenProps = {...this.props.screenProps};
    this.setState({
      finalSet: finalSet.filter((section) => section.id != tempData.id - 1),
      tempData: screenProps.sections[counter - 1],
      counter: counter - 1,
    });
  };

  moveNext = (dataSet) => {
    const {counter, finalSet} = this.state;
    const screenProps = {...this.props.screenProps};

    if (counter <= screenProps.sections.length - 1) {
      this.setState({
        finalSet: [...finalSet, dataSet],
        counter: counter + 1,
        tempData: [...screenProps.sections][counter + 1],
      });
    }
  };

  callingQuestions = (count) => {
    const {tempData, finalSet} = this.state;
    const {
      screenProps,
      navigation: {state, push},
    } = {...this.props};

    let data;
    let set = [];
    if (count < screenProps.sections.length) {
      return (
        <Questions
          dataSet={tempData}
          showSubmit={screenProps.sections.length - count}
          isPrevDisabled={count == 0}
          moveNext={this.moveNext}
          moveBack={this.moveBack}
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
      push('ThankYouScreen', {url: SUBMIT_QUESTION_API_URL, data});
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
