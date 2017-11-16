import { StackNavigator } from 'react-navigation';
import Landing from './views/Landing';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

const RootNavigator = StackNavigator({
  Landing: {
    screen: Landing
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'InstMeet'
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'InstMeet'
    }
  }
});

export default RootNavigator;