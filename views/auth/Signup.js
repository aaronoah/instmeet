import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Button } from 'native-base';

export default class Signup extends React.Component {
  static navigationOptions = {
    title: "Sign up"
  };

  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      passwd: "",
      message: "",
      pinSecure: true
    };
  }

  signup() {
    if(this.state.email === ''){
      this.setState({message: 'email field must be provided'});
      return;
    }

    if (this.state.password === '') {
      this.setState({ message: 'you must enter password' });
      return;
    }

    if(this.state.passwd === ''){
      this.setState({ message: 'you must re-enter password' });
      return;
    }

    if (this.state.passwd !== this.state.password) {
      this.setState({ message: 'your re-entered password does not match' });
      return;
    }

    this.props.navigation.navigate('FillInfo');
  }

  toggleEye(){
    // let prev = this.state.pinSecure;
    // this.setState({
    //   pinSecure: !prev
    // });
  }

  render() {
    return (
      <Form style={{ backgroundColor: 'white', height: 667 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.2, fontSize: 18, marginLeft: 22 }}>Email:</Text>
          <Item style={{ flex: 0.6 }}>
            <Input onChangeText={(input) => this.setState({email: input})}/>
          </Item>
          <Text style={{ flex: 0.4, fontSize: 18 }}>@umn.edu</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Password:</Text>
          <Item style={{ flex: 0.6 }}>
            <Input secureTextEntry={this.state.pinSecure} onChangeText={(input) => this.setState({password: input})} />
          </Item>
          <Icon name='eye' style={{ fontSize: 30 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Re-enter:</Text>
          <Item style={{ flex: 0.6 }}>
            <Input secureTextEntry={this.state.pinSecure} onChangeText={(input) => this.setState({passwd: input})} />
          </Item>
          <TouchableOpacity onPress={() => this.toggleEye()}>
            <Icon name='eye' style={{ fontSize: 30 }} />
          </TouchableOpacity>
        </View>
        <Text style={{color: 'red'}}>{this.state.message}</Text>
        <Button block info style={{width: 355, marginTop: 30, marginLeft: 10}}
          onPress={() => this.signup()}>
          <Text style={{color: 'white', fontSize: 18}}>Sign Up</Text>
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