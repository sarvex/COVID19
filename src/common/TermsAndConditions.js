import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Platform,
} from "react-native";
import HeaderLogo from "../images/header.png";

const button = {
  fontSize: 17,
  flex: 1,
  height: 20,
  lineHeight: 46,
  borderRadius: 20,
  marginRight: 0,
  marginLeft: 30,
};

const ios = {
  header: {
    marginTop: 50,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

const android = {
  header: {
    marginTop: 20,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
};
export default function TermsAndCondition(props) {
  return (
    <View style={styles.header}>
      <View style={styles.headerStyle}>
        <Image style={{ height: 40, width: 40 }} source={HeaderLogo} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#10243f",
            marginLeft: 10,
          }}
        >
          GH COVID-19 Tracker
        </Text>
      </View>
      <View style={styles.modalView}>
        <ScrollView>
          <Text style={{ ...styles.modalHeaderText, fontSize: 17 }}>
            GOVERNMENT OF GHANA (GoG) COVID-19 TRACKER TERMS AND CONDITIONS
          </Text>
          <Text style={styles.modalNormalText}>
            Version 1.0 - Last Updated on 08/04/2020
          </Text>
          <Text style={styles.modalNormalText}>
            The services provided by the GH COVID-19 Tracker App are subject to
            following Terms of Use, which may be updated from time to time
            without notice to you. You will always be able to view the most
            recent version of this document by clicking the terms and conditions
            link in the App. Please read the terms and conditions carefully
            before using this App. By using this App and services provided by
            this App, you agree to these Terms and Conditions. Please do not use
            this App if you do not agree with the Terms and Conditions provided
            below. This App is operated by the Government of Ghana (GoG).
          </Text>
          <Text style={styles.modalNormalText}>
            The General Terms and Conditions govern the use of the services
            provided by the GH COVID-19 Tracker App and its accompanying
            website, the conditions of processing personal data provided by you
            through the App and website, and the relationships between you and
            the Government of Ghana.
          </Text>
          <Text style={styles.modalNormalText}>
            When you accept to adhere to the terms and conditions, Government of
            Ghana grants you a limited, non-exclusive license to utilize the
            services of the App from this day. The terms “you” and “User” shall
            be used to refer to all individuals and entities that access or use
            the App and its services.
          </Text>
          <Text style={styles.modalNormalText}>
            The services of this App are available to all Users who will
            download, install and use this App. By clicking on the “I Agree”
            button, you declare your acceptance of all of the terms and
            conditions and are ready to comply with them.
          </Text>
          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Installation and Use
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            In compliance with the provisions of the laws governing terms and
            conditions and privacy policy, only persons 18 years and over are
            allowed to access the services of this App. If in any case, a User
            under 18 years wishes to use our App, we will require an
            authorisation from parents or guardians. During the installation and
            use of the “GH COVID-19 Tracker” App, it is assumed that you fulfil
            this requirement and otherwise accept the consequences if they
            arise. We advise that you do not use this App if you are unable to
            comply with the Terms and Conditions. You can have access to the
            application once it is installed on your mobile device.
          </Text>
          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            How it Works
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            “GH COVID-19 Tracker” App works through the devices on which the
            application has been installed.
          </Text>
          <Text style={styles.modalNormalText}>
            The App uses the details provided by the User including access to
            Bluetooth and GPS Location Services of device.
          </Text>
          <Text style={styles.modalNormalText}>
            This App will need you to turn on and allow the App access to the
            Bluetooth and GPS location services on your device. This App shall
            not function properly and accurately if Bluetooth and GPS services
            are turned off or if the App’s access to Bluetooth and GPS services
            is revoked on the device on which this App is installed.
          </Text>
          <Text style={styles.modalNormalText}>
            When you start using GH COVID-19 Tracker App as a User, the App will
            collect certain health-related information about you, and other
            general information such as your name, phone number, gender, age,
            sex, risk factors, the region in which you live, or information
            about your existing health conditions, which may be helpful for the
            GoG to correctly provide you with any required help and advice.
          </Text>
          <Text style={styles.modalNormalText}>
            Whilst using this App as a User, you will allow “GH COVID-19
            Tracker” App to use your data but note that this data will only be
            used for the intended purpose. GoG may use the mobile number
            provided by you to contact you in case of possible infection. Any
            personal information provided by you may also be shared with other
            necessary and relevant persons (if required) in order to carry out
            necessary administrative and medical interventions.
          </Text>
          <Text style={styles.modalNormalText}>
            We may use your information to enhance and improve your experience
            of our Service.
          </Text>
          <Text style={styles.modalNormalText}>
            All users through the App may submit, access, modify, correct or
            cancel their information as and when they wish.
          </Text>
          <Text style={styles.modalNormalText}>
            You agree that information provided by you will not be false or
            misleading. You agree that you will not do anything which can limit
            or impair the functionality or performance of the App. You agree
            that you will not tamper with or use the App for any purpose for
            which it was not intended, such as trying to access the database of
            the Service.
          </Text>
          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Termination
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            These provisions in the terms and conditions will continue to apply
            until terminated by either you or the Government of Ghana, in
            accordance to with the Terms and Conditions.
          </Text>
          <Text style={styles.modalNormalText}>
            You may uninstall/delete the App anytime from your device or revoke
            the App’s access to Bluetooth and GPS services, if you wish not to
            use it. However, by doing so, you acknowledge that you will no
            longer be able to avail of the services provided by this App.
          </Text>
          <Text style={styles.modalNormalText}>
            Government of Ghana may decide to cancel any relationship with you
            if you breach any of the clauses in the Terms and Conditions. This
            will mean cancelling your services with “GH COVID-19 Tracker App”
            and cancelling your account and accompanying personal data.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Ownership of GH COVID-19 Tracker App Services
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            Government of Ghana owns and has rights to all of the contents in
            the GH COVID-19 Tracker App. The contents of the GH COVID-19 Tracker
            App services include designs, text, graphics, images, videos,
            information, logo, button icons, software, audio files, computer
            code and other GH COVID-19 Tracker App content.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Information
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            The information that we provide on this App is intended for the
            general public with regards to COVID-19 symptoms and advice. We
            follow standard procedures for information that we make available on
            this App. Government of Ghana has applied all the measures required
            for securing personal and health data.
          </Text>
          <Text style={styles.modalNormalText}>
            The purpose of the GH COVID-19 Tracker App is to present the User
            with the probability of COVID-19 infection based on symptoms and
            health details entered by the User during the questionnaire and are
            for informational purpose only. The questions and the advice/results
            do not constitute a basis for self-diagnosis and under any
            circumstances, may not be interpreted or treated as advice,
            diagnosis, or treatment by a doctor.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Disclaimers, Limitations and Prohibitions
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            You are responsible for the transmission of health related
            information and personal data through the GH COVID-19 Tracker App
            platforms. You undertake to comply with all the security measures
            and obligations applicable.
          </Text>
          <Text style={styles.modalNormalText}>
            Government of Ghana forbids you to publish or disseminate
            information that will end up causing fear and panic or allowing us
            activate any level of public emergency responses when it is not
            true.
          </Text>
          <Text style={styles.modalNormalText}>
            Government of Ghana reserves the right to terminate the account of a
            User and all related data if it detects or assesses anything illicit
            or identifies your account as a regular submitter of fake
            information.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Linking to us
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            We do not mind if you include a simple link from your website, blog,
            or social media platforms to our App. However, you must first ask
            permission if you intend to frame our App, or its contents, in such
            a way that is not clear to your users that we are the source of the
            content. You are not allowed to link to us if you engage in the
            publication or promotions of illegal, obscene, or offensive content,
            or if the link in anyway negatively impacts the reputation of
            Government of Ghana.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Modifications
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            We reserve the right, at our discretion, to modify or replace these
            Terms and Conditions from time to time. You will always be able to
            view the most recent version of this document by clicking the Terms
            and Conditions link in the App. It is your responsibility to visit
            the most current Terms and Conditions. After an update is released
            and you still continue to use the GH COVID-19 Tracker App, it means
            you have accepted the current Terms and Conditions. If a
            modification to the Terms and Conditions is material, we will try to
            provide some days’ notice prior to the release of the modifications.
            What is material will be determined at our sole discretion.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Information that you provide to us
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            This App requires that you submit information to us. When you submit
            any information to areas of our App, you give us the consent to use,
            reproduce, modify, adapt and process that information in connection
            with this App.
          </Text>
          <Text style={styles.modalNormalText}>
            Any information submitted using this App, will not be displayed
            publicly without any form of pseudonymisation.
          </Text>

          <Text
            style={styles.modalNormalText}
            style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}
          >
            Contact us
          </Text>
          <Text style={{ ...styles.modalNormalText, marginTop: 0 }}>
            For questions or concerns about our Terms and Conditions, please
            contact the support centre on 769.
          </Text>

          <TouchableOpacity
            style={{ ...styles.button, height: 50, marginTop: 40 }}
            onPress={() => {
              props.modalVisibility(false);
            }}
          >
            <Text style={styles.buttonText}>Agree</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalHeaderText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalNormalText: {
    marginTop: 5,
    textAlignVertical: "center",
  },
  fontBold: {
    fontWeight: "bold",
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    marginBottom: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    ...button,
    backgroundColor: "#fc9f00",
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
  ...Platform.select({
    ios,
    android,
  }),
});
