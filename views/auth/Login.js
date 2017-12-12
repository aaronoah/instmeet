import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Form, Item, Icon, Button, Header, Left, Body, Right, Title } from 'native-base';
// import users from '../../data/users.json';
import { DebounceInput } from '../../components/DebounceInput';

export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this._retrieveUser = this._retrieveUser.bind(this);
    this.state = {
      email: "",
      password: "",
      message: "",
      pinSecure: true
    };
  }

  async _retrieveUser(){
    try{
      const u = await AsyncStorage.getItem('users');
      const users = JSON.parse(u);
      for(let i=0; i<users.length; ++i){
        if(users[i].email === this.state.email && users[i].password === this.state.password){
          return users[i];
        }
      }
      return "not found";
    }catch(error){
      return error;
    }
  }

  login(){
    let flag = false;
    if(this.state.email === ''){
      this.setState({message: 'you must provide your email'});
    }else if(this.state.password === ''){
      this.setState({message: 'password cannot be empty'});
    }else{
      this._retrieveUser().then(val => {
        if(typeof val !== "object"){
          this.setState({
            message: "invalid username or password"
          });
          throw new Error(val);
        }else{
          this.setState({ message: '' });
          flag = true;
          this.props.navigation.navigate('Main', {user: val});
        }
      });
    }
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
            <Title>Login</Title>
          </Body>
          <Right></Right>
        </Header>
        <Form style={{ backgroundColor: 'white', height: 667 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ flex: 0.2, fontSize: 18, marginLeft: 22 }}>Email:</Text>
            <Item style={{ flex: 0.6 }}>
              <DebounceInput onChangeText={(input) => this.setState({ email: input.trim() + '@umn.edu' })} />
            </Item>
            <Text style={{ flex: 0.4, fontSize: 18 }}>@umn.edu</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Password:</Text>
            <Item style={{ flex: 0.6 }}>
              <DebounceInput id="password" secureTextEntry={this.state.pinSecure} onChangeText={(input) => this.setState({ password: input.trim() })} />
            </Item>
          </View>
          <Text style={{ color: 'red', marginTop: 2 }}>{this.state.message}</Text>
          <TouchableOpacity style={{ marginTop: 2, marginLeft: 196 }} onPress = {()=>this.props.navigation.navigate('Forgetpassword')}>
            <Text style={{ color: 'blue' }}>Forget your password?</Text>
          </TouchableOpacity>
          <Button block info style={{ marginTop: 30, width: 355, marginLeft: 10 }}
            onPress={this.login}>
            <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
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
