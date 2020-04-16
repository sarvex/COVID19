import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import {Image, Text, View} from 'react-native';
import Home from '../screens/Home';
import Froms from '../screens/Forms';
import ThankYou from '../screens/ThankYou';
import HeaderLogo from '../images/header.png';

const screens = {
  GHS_COVID_19: {
    screen: Home,
  },
  Questionaire: {
    screen: Froms,
    navigationOptions: {
      headerLeft: null,
    },
  },
  ThankYouScreen: {
    screen: ThankYou,
    navigationOptions: {
      headerLeft: null,
    },
  },
};

const HomeStack = createStackNavigator(
  screens,
  {
    defaultNavigationOptions: {
      title: 'GH COVID-19 Tracker',
      headerStyle: {
        backgroundColor: '#ffffff',
        height: 90,
      },
      headerTintColor: '#ffffff',
      headerTitle: (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image style={{height: 40, width: 40}} source={HeaderLogo} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#10243f',
              marginLeft: 10,
            }}>
            GH COVID-19 Tracker
          </Text>
        </View>
      ),
    },
  },
  {
    headerLayoutPreset: 'center',
  },
);

export default createAppContainer(HomeStack);
