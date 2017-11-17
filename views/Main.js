import { TabNavigator } from 'react-navigation';
import People from './People';
import NewEvent from './NewEvent';
import Search from './Search';
import Home from './Home';
import Settings from './Settings';

const MainNavigator = TabNavigator({
  Home: { screen: Home },
  People: { screen: People },
  NewEvent: { screen: NewEvent },
  Search: { screen: Search },
  Settings: { screen: Settings }
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '',
    inactiveTintColor: ''
  }
});