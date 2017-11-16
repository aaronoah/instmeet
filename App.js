import { StackNavigator } from 'react-navigation';
import Landing from './views/Landing';
import Auth from './views/Auth';

const RootNavigator = StackNavigator({
  Landing: {
    screen: Landing
  },
  Login: {
    screen: Auth,

  }
});

export default RootNavigator;