import React from 'react';
import { View } from 'react-native';
import { StackNavigator, Header } from 'react-navigation';
import Landing from './views/Landing';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import People from './views/People';
import MainNavigator from './views/Main';
import FillInfo from './views/auth/FillInfo';
import Megha_profile from './views/Megha_profile';

const RootNavigator = StackNavigator({
  Landing: {
    screen: Landing
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up'
    }
  },
  FillInfo: {
    screen: FillInfo
  },
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  Megha_profile: {
    screen: Megha_profile
  }
}, {
  headerMode: "none"
});

export default RootNavigator;