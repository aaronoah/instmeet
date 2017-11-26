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
import ProfileDetail from './views/ProfileDetail';
import userProfile from './views/userProfile';
import Notifications from './views/Notifications';

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
  ProfileDetail: {
    screen: ProfileDetail
  },

  userProfile: {
    screen: userProfile
  },

  Notifications: {
    screen: Notifications
  }
}, {
  headerMode: "none"
});

export default RootNavigator;