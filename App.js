import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Landing from './views/Landing';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import People from './views/People';
import MainNavigator from './views/Main';

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
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      headerLeft: <View></View>
    }
  },
  // People: {
  //   screen: People,
  //   navigationOptions: {
  //     title: 'People'
  //   }
  // }
});

export default RootNavigator;