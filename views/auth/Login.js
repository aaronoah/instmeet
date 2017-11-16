import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Button } from 'native-base';

export default class Login extends React.Component{

  render() {
    return (
      <Form style={{backgroundColor: 'white', height: 667}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text style={{flex: 0.2, fontSize: 18, marginLeft: 22 }}>Email:</Text>
          <Item style={{flex: 0.6}}>
            <Input />
          </Item>
          <Text style={{flex: 0.4, fontSize: 18}}>@umn.edu</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Password:</Text>
          <Item style={{ flex: 0.6 }}>
            <Input />
          </Item>
          <Icon name='eye' style={{fontSize: 30}}/>
        </View>
        <TouchableOpacity style={{marginTop: 2, marginLeft: 196}}>
          <Text style={{ color: 'blue' }}>Forget your password?</Text>
        </TouchableOpacity>
        <Button block info style={{marginTop: 30, width: 355, marginLeft: 10}}>
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