import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Form, Item, Icon, Button, Header, Left, Right, Body, Title } from 'native-base';
// import users from '../../data/users.json';
import { DebounceInput } from '../../components/DebounceInput';

export default class Signup extends React.Component {
  static navigationOptions = {
    title: "Sign up"
  };

  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this._signupFollowup = this._signupFollowup.bind(this);
    this._retrieveUsers = this._retrieveUsers.bind(this);
    this.state = {
      users: [],
      email: "",
      password: "",
      passwd: "",
      message: "",
      pin1Secure: true,
      pin2Secure: true
    };
  }

  async _retrieveUsers() {
    try {
      const u = await AsyncStorage.getItem('users');
      return JSON.parse(u);

    } catch (error) {
      return error;
    }
  }

  signup() {
    let flag = true;
    if(this.state.email === ''){
      this.setState({message: 'email field must be provided'});
      flag = false;
    }else if (this.state.password === '') {
      this.setState({ message: 'you must enter password' });
      flag = false;
    }else if(this.state.passwd === ''){
      this.setState({ message: 'you must re-enter password' });
      flag = false;
    }else if (this.state.passwd !== this.state.password) {
      this.setState({ message: 'your re-entered password does not match' });
      flag = false;
    }

    for (let i=0; i<this.state.users.length; ++i) {
      if (this.state.users[i].email === this.state.email) {
        this.setState({ message: 'this email has been used' });
        flag = false;
      }
    }

    if (flag) {
          let newUser = {
            email: this.state.email,
            username: this.state.email.split("@")[0],
            password: this.state.password
          };

          let ur = this.state.users;
          ur.push(newUser);
          this.setState(prev => ({
            users: ur
          }));
          this._signupFollowup().then(val => {
            if(val !== 'success'){
              console.error(val);
            }else{
              this.props.navigation.navigate('FillInfo', { user: newUser });
            }
          });
    }
  }

  async _signupFollowup(){
    try{
      await AsyncStorage.setItem('users', JSON.stringify(this.state.users));
    }catch(error){
      return error;
    }
    return 'success';
  }

  componentWillMount(){
    this._retrieveUsers().then(val => {
      if(Array.isArray(val)){
        this.setState({
          users: val
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Sign Up</Title>
          </Body>
          <Right></Right>
        </Header>
        <Form style={{ backgroundColor: 'white', height: 667 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 18, marginLeft: 22 }}>Email:</Text>
            <Item style={{ flex: 0.6 }}>
              <DebounceInput onChangeText={(input) => this.setState({ email: input.trim() + '@umn.edu' })} />
            </Item>
            <Text style={{ flex: 0.4, fontSize: 18 }}>@umn.edu</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Password:</Text>
            <Item style={{ flex: 0.6 }}>
              <DebounceInput secureTextEntry={this.state.pin1Secure} onChangeText={(input) => this.setState({ password: input.trim() })} />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Re-enter:</Text>
            <Item style={{ flex: 0.6 }}>
              <DebounceInput secureTextEntry={this.state.pin2Secure} onChangeText={(input) => this.setState({ passwd: input.trim() })} />
            </Item>
          </View>
          <Text style={{ color: 'red' }}>{this.state.message}</Text>
          <Button block info style={{ width: 355, marginTop: 30, marginLeft: 10 }}
            onPress={() => this.signup()}>
            <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  input: {
    width: 30,
    justifyContent: "center",
    alignItems: "stretch",
    borderRightWidth: 30,
    borderLeftWidth: 30,
  }
});