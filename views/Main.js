import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Easing, Animated, View } from 'react-native';
import { Icon, Button } from 'native-base';
import People from './People';
import NewEvent from './NewEvent';
import Search from './Search';
import Home from './Home';
import Settings from './Settings';
<<<<<<< HEAD
// import Notifications from './Notifications'
=======
import Event from './event/Event';
import MyEvents from './event/MyEvents';
>>>>>>> 10d526d5a3986bf9250954ec734d3793636b31b9

class NewEventTab extends React.Component{
  static navigationOptions = ({navigation}) => ({
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
    ),
    tabBarOnPress: (previousScene, scene, jumpToIndex) => {
      navigation.navigate('NewEventModal');
    }
  });

  render(){
    return(
      <View></View>
    );
  }
}

const Tabs = TabNavigator({
  Home: { screen: Home },
  People: { screen: People },
  NewEvent: { screen: NewEventTab },
  Search: { screen: Search },
  Settings: { screen: Settings }
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'blue'
  }
});

const MainModalNavigator = StackNavigator({
  Tabs: {
    screen: Tabs
  },
  NewEventModal: {
    screen: NewEvent,
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
}, {
    mode: 'modal'
});

const MainNavigator = StackNavigator({
  Modal: {
    screen: MainModalNavigator,
  },
  Event: {
    screen: Event
  },
  MyEvents: {
    screen: MyEvents
  }
}, {
  headerMode: 'none'
});

export default MainNavigator;