import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import { Easing, Animated, View } from 'react-native';
import { Icon, Button } from 'native-base';
import People from './People';
import NewEvent from './NewEvent';
import Search from './Search';
import Home from './Home';
import Settings from './Settings';
import Event from './event/Event';
import MyEvents from './event/MyEvents';

const Tabs = TabNavigator({
  Home: { screen: Home },
  People: { screen: People },
  NewEvent: {
  screen: View,
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
      ),
      tabBarOnPress: (previousScene, scene, jumpToIndex) => {
        navigation.navigate('NewEventModal');
      }
    })
  },
  Search: { screen: Search },
  Settings: { screen: Settings }
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'blue'
  },
    tabBarComponent: ({ jumpToIndex, ...props }) => {
      const { navigation, navigationState } = props;
      return (
          <TabBarBottom
            {...props}
            jumpToIndex={index => {
              tab = navigationState.routes[index];
              tabRoute = tab.routeName;
              const TabNav = NavigationActions.navigate({
                routeName: tabRoute,
                params: {user: props.screenProps.username}
              });
              navigation.dispatch(TabNav);
            }}
          />
      );
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

const Main = (props) => (
  <MainNavigator screenProps={props.navigation.state.params.user} />
);

export default Main;