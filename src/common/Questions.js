import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import InputQuestion from './InputQuestion';
import DropdownQuestion from './DropdownQuestion';
import {strings} from '../translations/index';
import YesNoQuestion from './YesNoQuestion';

const button = {
  backgroundColor: '#fc9f00',
  fontSize: 17,
  flex: 1,
  height: 20,
  lineHeight: 46,
  borderRadius: 20,
  marginRight: 0,
  marginLeft: 30,
};

export default function Questions(props) {
  const [answeredQuestions, setAnsweredData] = useState(props.dataSet);
  const [answerSet, setAnswers] = useState(props.dataSet.questions);

  const ref = React.useRef(null);

  useEffect(() => {
    setAnsweredData(props.dataSet);
    setAnswers(props.dataSet.questions);
  }, [props]);

  const handleTextChange = (value) => {
    const changeAnswer = (answer) => {
      let tempAnswers = answerSet;
      const index = tempAnswers.findIndex((item) => item.id === answer.id);
      tempAnswers.splice(index, 1);
      tempAnswers.push(answer);
      return tempAnswers;
    };
    setAnsweredData({...answeredQuestions, questions: changeAnswer(value)});
  };

  const handleDropdownChange = (value) => {
    const changeAnswer = (answer) => {
      let tempAnswers = answeredQuestions.questions;
      const index = tempAnswers.findIndex((item) => item.id === answer.id);
      tempAnswers.splice(index, 1);
      tempAnswers.push(answer);
      return tempAnswers;
    };
    setAnsweredData({...answeredQuestions, questions: changeAnswer(value)});
  };

  const handleChangeAnswer = (value) => {
    const changeAnswer = (answer) => {
      let tempAnswers = answeredQuestions.questions;
      const index = tempAnswers.findIndex((item) => item.id === answer.id);
      tempAnswers.splice(index, 1);
      tempAnswers.push(answer);
      return tempAnswers;
    };
    setAnsweredData({...answeredQuestions, questions: changeAnswer(value)});
  };

  const displayQuestion = () => {
    const alternatingColor = ['#D3D3D3', '#ffffff'];
    if (answeredQuestions.questions) {
      return answeredQuestions.questions
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          // Handling if question is dependent on any other question and that question have expected value start
          if (item.dependentQuestion != '' && item.dependentQuestion != null) {
            const dependentQuestions = item.dependentQuestion
              .toString()
              .split('#');
            if (dependentQuestions.length === 1) {
              const qusId = dependentQuestions[0].split('/')[0];
              const expectedValue = dependentQuestions[0].split('/')[1];
              const answer = answeredQuestions.questions.filter(
                (ques) => ques.id == qusId,
              )[0].answer;
              if (
                answer.toString().trim().toLowerCase() !=
                expectedValue.toString().trim().toLowerCase()
              ) {
                item.answer = undefined;
                return;
              }
            } else {
              let isValid = false;
              dependentQuestions.map((item) => {
                const qusId = item.split('/')[0];
                const expectedValue = item.split('/')[1];
                const answer = answeredQuestions.questions.filter(
                  (ques) => ques.id == qusId,
                )[0].answer;
                if (
                  answer.toString().trim().toLowerCase() ==
                  expectedValue.toString().trim().toLowerCase()
                ) {
                  isValid = true;
                }
              });
              if (!isValid) {
                item.answer = undefined;
                return;
              }
            }
          }
          // Handling if question is dependent on any other question and that question have expected value end
          if (item.options.length == 2) {
            item.optionType = 'boolean';
          }
          if (item.optionType === 'opentext') {
            return (
              <View
                style={{
                  backgroundColor:
                    alternatingColor[index % alternatingColor.length],
                  padding: 5,
                }}>
                <InputQuestion
                  item={item}
                  label={item.questionName}
                  description={item.questionDescription}
                  handleTextChange={handleTextChange}
                  answer={item.answer}
                />
              </View>
            );
          } else if (item.optionType === 'dropdown') {
            return (
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  margin: 10,
                  marginLeft: 0,
                  marginRight: 0,
                  elevation: 1,
                }}>
                <DropdownQuestion
                  item={item}
                  label={item.questionName}
                  options={item.options}
                  handleDropdownChange={handleDropdownChange}
                  answer={item.answer}
                  color={alternatingColor[index % alternatingColor.length]}
                />
              </View>
            );
          } else if (item.optionType === 'boolean') {
            return (
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  margin: 10,
                  marginLeft: 0,
                  marginRight: 0,
                  elevation: 1,
                }}>
                <YesNoQuestion
                  item={item}
                  label={item.questionName}
                  description={''}
                  handleChangeAnswer={handleChangeAnswer}
                  answer={item.answer}
                  answer={item.answer}
                />
              </View>
            );
          }
        });
    }
  };

  const validateData = () => {
    let formNotCompelete = false;
    let label = '';

    for (var i = 0; i <= answeredQuestions.questions.length; i++) {
      if (
        answeredQuestions.questions[i] &&
        (answeredQuestions.questions[i].answer === '' ||
          answeredQuestions.questions[i].answer === undefined) &&
        answeredQuestions.questions[i].answerRequired
      ) {
        formNotCompelete = true;
        label = answeredQuestions.questions[i].questionErrorMessage;
        break;
      }
    }

    if (formNotCompelete) {
      Alert.alert(label);
    } else {
      props.handleFormChange(answeredQuestions);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%'}}
      behavior={Platform.Os == 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.pInfo}>{answeredQuestions.sectionTitle}</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.scrollView} ref={ref}>
            {answeredQuestions.questions && (
              <View style={styles.formContainer}>{displayQuestion()}</View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
        {answeredQuestions.questions && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              accessible
              onPress={() => validateData()}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {props.showSubmit === 1 ? 'Submit' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{flex: 1}} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  pInfo: {
    width: '100%',
    fontSize: 25,
    textAlign: 'center',
    color: '#20477D',
    margin: 10,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  inputWrapper: {
    width: '100%',
    borderColor: 'silver',
    borderBottomWidth: 1,
  },
  itemLabel: {
    color: 'grey',
    textAlign: 'left',
    fontSize: 20,
    marginTop: 13,
    marginBottom: 10,
  },
  button: {
    ...button,
    backgroundColor: '#fc9f00',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    height: 46,
    lineHeight: 46,
    fontSize: 20,
  },

  buttonWrapper: {
    height: 50,
    margin: 20,
    width: '60%',
  },
  quitButtonWrapper: {
    height: 25,
    width: '25%',
    margin: 5,
    alignSelf: 'flex-end',
  },
  quitButtonText: {
    color: 'white',
    textAlign: 'center',
    height: 26,
    lineHeight: 26,
    fontSize: 15,
  },
});
