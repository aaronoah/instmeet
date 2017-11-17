import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { Button } from 'native-base';

export default class Landing extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground source={require('../images/friends2.png')} style={styles.container}>
        <Text style={styles.headline}>InstMeet</Text>
        <View style={styles.auth}>
          <Button info style={styles.login}
            onPress={() => this.props.navigation.navigate('Login', {mode: 'login'})}>
            <Text style={styles.loginText}>Login</Text>
          </Button>
          <Button light style={styles.signup}
            onPress={() => this.props.navigation.navigate('Signup', {mode: 'signup'})}>
            <Text style={styles.signupText}>Sign up</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headline: {
    marginTop: 174,
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white'
  },
  auth: {
    marginTop: 314,
    flex: 1,
    flexDirection: 'row'
  },
  login: {
    width: 153,
    height: 35,
    justifyContent: 'center',
    marginRight: 15
  },
  signup: {
    width: 153,
    height: 35,
    justifyContent: 'center',
    marginLeft: 15
  },
  loginText: {
    color: 'white',
    fontSize: 18
  },
  signupText: {
    color: '#4fadf9',
    fontSize: 18
  }
});
