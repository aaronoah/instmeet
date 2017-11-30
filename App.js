import React from 'react';
import { View } from 'react-native';
import { StackNavigator, Header } from 'react-navigation';
import Landing from './views/Landing';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import People from './views/People';
import Settings from './views/Settings';
import MainNavigator from './views/Main';
import FillInfo from './views/auth/FillInfo';
import { Root } from 'native-base';

const RootNavigator = StackNavigator({
  Landing: {
    screen: Landing,
    navigationOptions: {
      gesturesEnabled: false
    }
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
  }
}, {
  headerMode: "none"
});

export default App = () => (
  <Root>
    <RootNavigator />
  </Root>
);