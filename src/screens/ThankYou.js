import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {ApiHelperPOST} from '../util/APIhelper';
import SpinnerModal from '../common/SpinnerModal';
import Logo from '../images/Logo.png';
import GVG from '../images/GVGvector.png';
import ASC from '../images/ASCvector.png';
import IQ from '../images/IQvector.png';
import {ScrollView} from 'react-native-gesture-handler';

const button = {
  fontSize: 17,
  flex: 1,
  lineHeight: 46,
  borderRadius: 20,
  marginRight: 'auto',
  marginLeft: 'auto',
};

export default function ThankYou(props) {
  const [loader, showLoader] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');
  const [finalMessageDescription, setFinalMessageDescription] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [warningMessageDescription, setWarningMessageDescription] = useState(
    '',
  );
  const [warning, setWarningFlag] = useState(false);

  useEffect(() => {
    const {
      navigation: {
        state: {
          params: {url, data},
        },
      },
    } = props;
    showLoader(true);
    ApiHelperPOST(url, data, 'POST').then((response) => {
      const {
        statusCode,
        body: {
          finalMessage,
          finalMessageDescription,
          warning,
          warningMessage,
          warningMessageDescription,
          error,
          errorMessage,
        },
      } = response;
      if (statusCode === 200) {
        if (!error) {
          setFinalMessage(finalMessage);
          setFinalMessageDescription(finalMessageDescription);
          if (warning) {
            setWarningFlag(true);
            setWarningMessage(warningMessage);
            setWarningMessageDescription(warningMessageDescription);
          }
          showLoader(false);
        } else if (error) {
          setFinalMessage(
            errorMessage ||
              'There seems to be some problem. Please try again after sometime',
          );
          showLoader(false);
        }
      } else {
        setFinalMessage(
          'There seems to be some problem. Please try again after sometime',
        );
        showLoader(false);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!loader && !warning && <Text style={styles.pInfo}>Thank You</Text>}
      {!loader && warning && <Text style={styles.pInfo}>Risk Assessment</Text>}
      <ScrollView>
        {!loader && !warning && (
          <View style={styles.messageWrapper}>
            <Image style={{alignSelf: 'center'}} source={Logo} />
            <Text style={styles.finalMessage}>{finalMessage}</Text>
            <Text style={styles.finalMessageDescription}>
              {finalMessageDescription}
            </Text>
            <Text
              style={{
                color: 'blue',
                textAlign: 'center',
                fontSize: 17,
                marginTop: 10,
              }}
              onPress={() => Linking.openURL('https://ghanahealthservice.org')}>
              GHS Website
            </Text>
          </View>
        )}
        {/* {!loader && !warning && (
          <View style={styles.shareContainer}>
            <View style={styles.buttonWrapperFinal}>
              <TouchableOpacity accessible style={styles.buttonFinal}>
                <Text style={styles.buttonTextFinal}>Share App</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}
        {!loader && !warning && (
          <View style={styles.branding}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Partners
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Image style={{marginRight: 5}} source={IQ} />
              <Image style={{marginLeft: 5}} source={ASC} />
            </View>
          </View>
        )}
        {!loader && warning && (
          <View style={styles.warningMessageWrapper}>
            <Text style={styles.warningMessage}>{warningMessage}</Text>
            <Text style={styles.warningMessageDescription}>
              {warningMessageDescription}
            </Text>
          </View>
        )}
        {!loader && warning && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              accessible
              onPress={() => setWarningFlag(false)}
              style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <SpinnerModal visible={loader} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    height: 'auto',
    padding: 15,
  },
  pInfo: {
    fontSize: 25,
    textAlign: 'center',
    color: '#20477D',
    margin: 10,
    width: '100%',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  branding: {
    justifyContent: 'center',
    height: '20%',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  shareContainer: {
    alignSelf: 'center',
    height: 'auto',
    width: '80%',
    borderRadius: 10,
  },
  shareText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#20477D',
    margin: 5,
    fontWeight: 'bold',
  },
  shareTextMessage: {
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
    margin: 5,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: 'black',
    margin: 5,
  },
  finalMessage: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  finalMessageDescription: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    marginTop: 10,
    marginBottom: 0,
  },
  warningMessage: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  warningMessageDescription: {
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
  },
  warningMessageWrapper: {
    height: 'auto',
    width: '95%',
    alignSelf: 'center',
    margin: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
  },
  messageWrapper: {
    alignSelf: 'center',
    height: 'auto',
    width: '95%',
    minWidth: '95%',
    margin: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
  },
  buttonFinal: {
    ...button,
    backgroundColor: '#fc9f00',
    height: 40,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonTextFinal: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 20,
  },
  buttonWrapperFinal: {
    height: 50,
    margin: 20,
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
    marginTop: 40,
    marginBottom: 40,
    width: '60%',
    height: 'auto',
    alignSelf: 'center',
  },
});
