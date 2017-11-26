import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document
        , Left, Right, Title } from 'native-base';

export default class Settings extends Component {

  constructor(props){
    super(props);
  };

  static navigationOptions = {
  };

  render(){
     return (
      <Header>
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
          <Icon name='arrow-back' />
        </Button>
        </Left>
        <Body>
          <Title>Notifications</Title>
        </Body>
        <Right></Right>
    </Header>
     );

 }
}