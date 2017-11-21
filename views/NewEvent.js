import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document } from 'native-base';

export default class NewEvent extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  render(){
    return (
      <View></View>
    )
  }
}