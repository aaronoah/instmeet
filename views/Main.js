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
import ProfileDetail from './ProfileDetail';
import userProfile from './settings/userProfile';
import Notifications from './settings/Notifications';
import resetPassword from './settings/resetPassword';
import History from './settings/History';
import Searchpeople from './Searchpeople';
import debounce from 'lodash/debounce';

const Tabs = TabNavigator({
  Home: { screen: Home },
  People: { screen: People },
  NewEvent: {
    screen: View,
    navigationOptions: ({navigation}) => {
      let debounceOnPress = debounce((previousScene, scene, jumpToIndex) => {
        navigation.navigate('NewEventModal');
      }, 200);
      return {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
        ),
        tabBarOnPress: debounceOnPress
      };
    }
  },
  Search: { screen: Search },
  Settings: { screen: Settings }
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#4fadf9'
  },
  // tabBarComponent: ({ jumpToIndex, ...props }) => {
  //     const { navigation, navigationState } = props;
  //     return (
  //         <TabBarBottom
  //           {...props}
  //           jumpToIndex={index => {
  //             tab = navigationState.routes[index];
  //             tabRoute = tab.routeName;
  //             const TabNav = NavigationActions.navigate({
  //               routeName: tabRoute
  //             });
  //             navigation.dispatch(TabNav);
  //           }}
  //         />
  //     );
  // }
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
  },
  ProfileDetail: {
    screen: ProfileDetail
  },
  Searchpeople: {
    screen: Searchpeople
  },
  userProfile: {
    screen: userProfile
  },
  resetPassword: {
    screen: resetPassword
  },
  History: {
    screen: History
  },
  Notifications: {
    screen: Notifications
  }
}, {
  headerMode: 'none'
});

function success(position){
  this.setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    error: null,
  });
}

function error(error){
  this.setState({ error: error.message });
}

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: ""
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      success.bind(this),
      error.bind(this),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

    this.watchId = navigator.geolocation.watchPosition(
      success.bind(this),
      error.bind(this),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render(){
    let token = {
      user: this.props.navigation.state.params.user,
      location: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    };
    return (
      <MainNavigator screenProps={{ authNavigator: this.props.navigation, token: token}} />
    );
  }
}
