import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Alert,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import { strings } from "../translations/index";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import Logo from "../images/Logo.png";
import TermsAndCondition from "../common/TermsAndConditions";
import Geolocation from "@react-native-community/geolocation";
import { ApiHelperPUT } from "../util/APIhelper";
import SpinnerModal from "../common/SpinnerModal";
import { OTP_SERVICE_API_URL, COUNTRY_CODE } from "../util/constants";
import * as store from '../util/localStorage';

const ios = {
  input: {
    color: "black",
    textAlign: "left",
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    height: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "silver",
  },
};

const android = {
  input: {
    color: "black",
    textAlign: "left",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    height: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "silver",
  },
};

const button = {
  fontSize: 17,
  flex: 1,
  height: 20,
  lineHeight: 46,
  borderRadius: 20,
  marginRight: 0,
  marginLeft: 30,
};

function Home(props) {
  const [tncChecked, onCheckTnC] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [emailId, setEmailId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => setLocation(info));
    if (props.screenProps.update && !props.screenProps.forceUpdate) {
      Alert.alert(props.screenProps.updateMessage, "", [
        {
          text: "Update Now",
          onPress: handleUpdateClick
        },
        {
          text: "Update Later",
          style: "cancel"
        }
      ],
      { cancelable: false });
    }
  }, [props]);

  // Reset form function
  const resetScreen = () => {
    setIsOtpGenerated(false);
    setContactNumber("");
    setOtp("");
    setEmailId("");
  };

  // Checking the validity of form and returning object containing the validity status and errormessage if any
  const validateForm = () => {
    const formValidy = {
      isValid: true,
      errorMessage: "",
    };

    const regexEmail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    const regexNumber = new RegExp(/^(0)[2,5][0,3-9]([0-9]{7})$/);

    if (emailId != "" && !regexEmail.test(String(emailId).toLowerCase())) {
      formValidy.isValid = false;
      formValidy.errorMessage = "Please enter a valid email id";
    } else if (contactNumber === "") {
      formValidy.isValid = false;
      formValidy.errorMessage = "Please enter a valid Ghana mobile number";
      // } else if (!validateMobileNumber()) {
    }
    else if (COUNTRY_CODE == '233' && !regexNumber.test(String(contactNumber.length == 9 ? '0' + contactNumber : contactNumber).toLowerCase())) {
      formValidy.isValid = false;
      formValidy.errorMessage = "Please enter a valid Ghana mobile number";
    }
    return formValidy;
  };

  const otpRequestObject = {
    email: emailId,
    phone: contactNumber,
    countryCode: COUNTRY_CODE,
    otp: otp,
    verify: "",
  };

  // Method for generating the OTP
  const generateOTP = async () => {
    const requestObject = { ...otpRequestObject };
    return ApiHelperPUT(OTP_SERVICE_API_URL, requestObject);
  };

  // Verify OTP and Porceed to next screen
  const verifyOtpAndProceed = async () => {
    const removeLoader = () => {
      setIsLoading(false);
    };
    const requestObject = { ...otpRequestObject };
    requestObject.verify = "true";
    try {
      setIsLoading(true);
      const verifyOtpResponse = await ApiHelperPUT(OTP_SERVICE_API_URL, requestObject);
      // Handle OTP verification success and failue
      if (
        verifyOtpResponse.statusCode == 0 &&
        verifyOtpResponse.body.successMessage != ""
      ) {
        // Set User in local storage start
        if (verifyOtpResponse.body.token) {
          await store.removeItem("VALIDATED_USERS");
          const userObject = {};
          userObject[contactNumber] = verifyOtpResponse.body.token;
          await store.setItem("VALIDATED_USERS", JSON.stringify(userObject));
        }
        setIsLoading(false);
        redirectUserToNextScrren();
        resetScreen();
      } else {
        Alert.alert(verifyOtpResponse.body.errorMessage, "", [
          {
            text: "Ok",
            onPress: removeLoader,
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Technical error, please try again later", "", [
        {
          text: "Ok",
          onPress: removeLoader,
        },
      ]);
    }
  };

  const redirectUserToNextScrren = () => {
    if (validateForm().isValid) {
      let userDetail = {
        email: emailId || "",
        phone: contactNumber,
        locale: "eng",
        deviceId: contactNumber,
        location: location || "",
      };
      navigation.push("Questionaire", userDetail);
    } else {
      Alert.alert(validateForm().errorMessage);
    }
  };

  const validateUser = async () => {
    const removeLoader = () => {
      setIsLoading(false);
    };
    if (validateForm().isValid) {
      // Check if user is already verified and stored in local storage
      const validatedUsers = await store.getItem("VALIDATED_USERS");
      if (
        validatedUsers != null &&
        Object.keys(JSON.parse(validatedUsers)).includes(contactNumber)
      ) {
        // User available in local storage redirect to next screen
        redirectUserToNextScrren();
      } else {
        // User is not verfied already so Generating OTP
        try {
          setIsLoading(true);
          const generateOtpResponse = await generateOTP();
          // Handle generate otp response
          if (
            generateOtpResponse.statusCode == 0 &&
            !generateOtpResponse.body.error
          ) {
            setIsOtpGenerated(true);
            setIsLoading(false);
          } else {
            Alert.alert(generateOtpResponse.body.errorMessage, "", [
              {
                text: "Ok",
                onPress: removeLoader,
              },
            ]);
            setIsOtpGenerated(true);
            setIsLoading(false);
          }
        } catch (error) {
          Alert.alert("Technical error, please try again later", "", [
            {
              text: "Ok",
              onPress: removeLoader,
            },
          ]);
        }
      }
    } else {
      Alert.alert(validateForm().errorMessage, "", [
        {
          text: "Ok",
          onPress: removeLoader,
        },
      ]);
    }
  };

  const getMainContent = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <SpinnerModal visible={isLoading} />

          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={(value) => setEmailId(value)}
              style={{ ...styles.input, marginBottom: 0 }}
              keyboardType={"email-address"}
              placeholder={"Enter Email ID (Optional)"}
              maxLength={50}
              placeholderTextColor={"#ffffff"}
              value={emailId}
            />
          </View>
          <View
            style={{
              ...styles.inputWrapper,
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "silver",
              height: 40,
              alignItems: "center",
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 7,
                marginRight: 0,
              }}
            >+233
            </Text>
            <TextInput
              onChangeText={(value) => setContactNumber(value)}
              style={{
                ...styles.input,
                flex: 1,
                borderLeftWidth: 0,
                height: "100%",
                marginTop: 0,
                marginBottom: 0,
              }}
              keyboardType={"number-pad"}
              placeholder={"Enter Mobile Number"}
              maxLength={10}
              editable={!isOtpGenerated}
              placeholderTextColor={"#ffffff"}
              value={contactNumber}
            ></TextInput>
            {isOtpGenerated && (
              <TouchableOpacity
                style={{ marginLeft: 0 }}
                onPress={() => {
                  setIsOtpGenerated(false);
                  setContactNumber("");
                  setOtp("");
                }}
              >
                <Text
                  style={{
                    height: "100%",
                    fontSize: 12,
                    color: "white",
                    paddingTop: 12,
                    paddingRight: 7,
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {isOtpGenerated && (
            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={(value) => setOtp(value)}
                style={styles.input}
                keyboardType={"number-pad"}
                placeholder={"Enter OTP"}
                placeholderTextColor={"#ffffff"}
                value={otp}
              />
              <TouchableOpacity onPress={validateUser}>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    paddingRight: 10,
                    fontSize: 12,
                    color: "#1e3463",
                  }}
                >
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <CheckBox
            checkedColor="#1e3463"
            containerStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#FFFFFF",
              marginLeft: 0,
              paddingLeft: 0,
            }}
            size={28}
            title={strings("home.TnC")}
            checked={tncChecked}
            onPress={() => setModalVisible(!modalVisible)}
            onIconPress={() => onCheckTnC(!tncChecked)}
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              accessible
              onPress={() =>
                isOtpGenerated ? verifyOtpAndProceed() : validateUser()
              }
              style={tncChecked ? styles.button : styles.buttonDisabled}
              disabled={!tncChecked}
            >
              <Text style={styles.buttonText}>
                {strings("home.ProceedButton")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ alignSelf: "center", marginTop: 20 }}>
            Powered By Ministry of Communications
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const modalVisibility = (val) => {
    setModalVisible(val);
    if (!tncChecked) {
      onCheckTnC(!tncChecked);
    }
  };

  const handleUpdateClick = () => {
    Linking.openURL(props.screenProps.updateUrl);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={-200}
    >
      <SafeAreaView style={styles.container}>
        {!props.screenProps.errorMessage && (
          <>
            {
              !props.screenProps.forceUpdate &&
              <ScrollView>
                <Image
                  style={{ alignSelf: "center", height: 90, width: 90 }}
                  source={Logo}
                />
                <Text style={styles.welcome}>{strings("home.Intro")}</Text>
                <Text style={styles.introMessagel}>
                  {strings("home.Intro1")} Please visit the Ghana Health Service{" "}
                  <Text
                    style={{ color: "blue" }}
                    onPress={() =>
                      Linking.openURL("https://ghanahealthservice.org/covid19")
                    }
                  >
                    website
              </Text>{" "}
              if you need health advice
              </Text>
                <View>{getMainContent()}</View>
              </ScrollView>
            }
            {props.screenProps.forceUpdate && (
              <View style={{
                justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 150
              }}>
                <Image
                  style={{ alignSelf: "center", height: 90, width: 90 }}
                  source={Logo}
                />
                
                <Text style={{
                  textAlign: "center",
                  fontSize: 18,
                  padding: 30,
                }}>
                  {props.screenProps.updateMessage}
                </Text>
                <TouchableOpacity
                  accessible
                  onPress={handleUpdateClick}
                  style={{
                    backgroundColor: "#fc9f00",
                    width: 150,
                    borderRadius: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Text style={styles.buttonText}>
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        {props.screenProps.errorMessage && (
          <Text style={styles.appNotAvailableText}>
            {props.screenProps.errorMessage}
          </Text>
        )}
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent={false}
        statusBarTranslucent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TermsAndCondition modalVisibility={modalVisibility} />
      </Modal>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  welcome: {
    fontSize: 17,
    textAlign: "center",
    color: "#20477D",
    margin: 10,
    fontWeight: "bold",
  },
  introMessagel: {
    fontSize: 17,
    textAlign: "center",
    color: "black",
    margin: 10,
  },
  formContainer: {
    borderRadius: 10,
    margin: 20,
    width: "80%",
    alignSelf: "center",
  },
  inputWrapper: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  itemLabel: {
    color: "#20477D",
    textAlign: "left",
    fontSize: 17,
    marginTop: 13,
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    ...button,
    backgroundColor: "#fc9f00",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonDisabled: {
    ...button,
    backgroundColor: "silver",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    height: 46,
    lineHeight: 46,
    fontSize: 20,
  },

  buttonWrapper: {
    height: 50,
    margin: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 0,
    padding: 10,
    marginTop: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  appNotAvailableText: {
    textAlign: "center",
    fontSize: 25,
    padding: 30,
    alignSelf: "center",
  },

  ...Platform.select({
    ios,
    android,
  }),
});
