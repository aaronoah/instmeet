import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Button } from 'native-base';

export default class Login extends React.Component{

  static navigationOptions = {
    title: "Login"
  };

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.toggleEye = this.toggleEye.bind(this);
    this.state = {
      email: "",
      password: "",
      message: "",
      pinSecure: true
    };
  }

  login(){
    if(this.state.email === ''){
      this.setState({message: 'you must provide your email'});
      return;
    }else if(this.state.password === ''){
      this.setState({message: 'password cannot be empty'});
      return;
    }

    if(this.state.email === 'test' && this.state.password === '1234'){
      this.props.navigation.navigate('Main');
    }else{
      this.setState({
        message: "invalid username or password"
      });
    }
  }

  toggleEye(){
    // let prev = this.state.pinSecure;
    // this.setState({
    //   pinSecure: !prev
    // });
  }

  render() {
    return (
      <Form style={{backgroundColor: 'white', height: 667}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text style={{flex: 0.2, fontSize: 18, marginLeft: 22 }}>Email:</Text>
          <Item style={{flex: 0.6}}>
            <Input onChangeText={(input) => this.setState({email: input})}/>
          </Item>
          <Text style={{flex: 0.4, fontSize: 18}}>@umn.edu</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Password:</Text>
          <Item style={{ flex: 0.6 }}>
            <Input id="password" secureTextEntry={this.state.pinSecure} onChangeText={(input) => this.setState({password: input})} />
          </Item>
          <TouchableOpacity onPress={this.toggleEye()}>
            <Icon name='eye' style={{fontSize: 30}}/>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'red', marginTop: 2}}>{this.state.message}</Text>
        <TouchableOpacity style={{marginTop: 2, marginLeft: 196}}>
          <Text style={{ color: 'blue' }}>Forget your password?</Text>
        </TouchableOpacity>
        <Button block info style={{marginTop: 30, width: 355, marginLeft: 10}}
        onPress={() => this.login()}>
          <Text style={{color: 'white', fontSize: 18}}>Login</Text>
        </Button>
      </Form>
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
