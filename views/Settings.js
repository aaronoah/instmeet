import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document } from 'native-base';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: "Settings",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-person" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  Yuqi() {
    return(
      <ListItem>
      <Thumbnail square source={require('../images/Yuqi.png')} />
      <Body>
        <Text style={{flex: 0.3}}>Yuqi Zhou</Text>
        <Text note style={{flex: 0.3}}>Carpe diem</Text>
      </Body>
      </ListItem>
    );
  }

  notifications(){
      this.props.navigation.navigate('Notifications');
    }


  render(){
    // return (
    //   <View></View>
    // )
   
    return (
      <Form style={{backgroundColor: 'white', height: 667}}>
        <List>
            {this.Yuqi()}
        </List>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40}}>
          <Icon name="ios-notifications" style={{fontSize: 40, marginLeft: 44}}></Icon>
          <TouchableOpacity style={{ marginLeft: 90, marginTop: 4}} onPress={this.notifications()}>
            <Text style={{ flex: 0.7, textAlign: 'center' }}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="ios-clock" style={{fontSize: 40, marginLeft: 44}}></Icon>
          <TouchableOpacity style={{ marginLeft: 90, marginTop: 4}}>
          <Text style={{ flex: 0.7, textAlign: 'center' }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 60}}>
          <Icon name="ios-lock" style={{fontSize: 40, marginLeft: 44}}></Icon>
          <TouchableOpacity style={{ marginLeft: 90, marginTop: 6}}>
          <Text style={{ flex: 0.7, textAlign: 'center' }}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        
      </Form>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  buttonactive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  textactive:{
    color:'#FFFFFF'
  },
  buttoninactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000'
  },
  textinactive: {
    color: '#000000'
  }
});