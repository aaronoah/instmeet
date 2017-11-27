import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Button, Header, Left, Right, Body, Title } from 'native-base';
import { users } from '../../data/users';

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

    for(let user of users.array){
      if(user.email === this.state.email){
        this.setState({ message: 'this email has been used' });
        return;
      }
    }

    if (this.state.passwd !== this.state.password) {
      this.setState({ message: 'your re-entered password does not match' });
      return;
    }

    const newUser = {
      email: "test@umn.edu",
      password: "1234"
    };

    this.props.navigation.navigate('FillInfo', {user: newUser});
  }

  toggleEye(){
    // let prev = this.state.pinSecure;
    // this.setState({
    //   pinSecure: !prev
    // });
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
              <Input onChangeText={(input) => this.setState({ email: input })} />
            </Item>
            <Text style={{ flex: 0.4, fontSize: 18 }}>@umn.edu</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Password:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input secureTextEntry={this.state.pinSecure} onChangeText={(input) => this.setState({ password: input })} />
            </Item>
            <Icon name='eye' style={{ fontSize: 30 }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Re-enter:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input secureTextEntry={this.state.pinSecure} onChangeText={(input) => this.setState({ passwd: input })} />
            </Item>
            <TouchableOpacity onPress={() => this.toggleEye()}>
              <Icon name='eye' style={{ fontSize: 30 }} />
            </TouchableOpacity>
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