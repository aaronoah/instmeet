import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Easing, Animated, View } from 'react-native';
import { Icon, Button } from 'native-base';
import People from './People';
import NewEvent from './NewEvent';
import Search from './Search';
import Home from './Home';
import Settings from './Settings';
// import Notifications from './Notifications'

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


const MainNavigator = StackNavigator({
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
    mode: 'modal',
});

export default MainNavigator;