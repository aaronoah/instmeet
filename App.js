import React from 'react';
import ReactNative, { View, AsyncStorage } from 'react-native';
import { StackNavigator, Header } from 'react-navigation';
import Landing from './views/Landing';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import People from './views/People';
import Settings from './views/Settings';
import MainNavigator from './views/Main';
import FillInfo from './views/auth/FillInfo';
import Forgetpassword from './views/auth/Forgetpassword';
import { Root } from 'native-base';
import users from './data/users.json';
import events from './data/events.json';
import interests from './data/interests.json';
import digests from './data/digests.json';

async function loadData() {
  try {
    AsyncStorage.clear();
    const u = await AsyncStorage.getItem('users');
    if (u === null) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
    const e = await AsyncStorage.getItem('events');
    if (e === null) {
      AsyncStorage.setItem('events', JSON.stringify(events));
    }
    const i = await AsyncStorage.getItem('interests');
    if (i === null) {
      AsyncStorage.setItem('interests', JSON.stringify(interests));
    }
    const d = await AsyncStorage.getItem('digests');
    if (d === null) {
      AsyncStorage.setItem('digests', JSON.stringify(digests));
    }
  } catch (error) {
    return error;
  }

  return "succeed";
}

loadData().then(output => {
  if(output !== 'succeed'){
    throw new Error(output);
  }
});

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
  Forgetpassword: {
    screen: Forgetpassword
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