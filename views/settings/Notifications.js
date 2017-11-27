import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document
        , Left, Right, Title } from 'native-base';
import { events } from '../../data/events';


export default class Notifications extends Component {

  constructor(props){
    super(props);
  };

  static navigationOptions = {
  };

  render(){

    function findImg(name){
      switch(name){
        case 'swim': return require('../../images/swim.png');
        case 'cook': return require('../../images/cook.png');
        case 'club': return require('../../images/club.png');
        case 'rock': return require('../../images/music.png');
        case 'games': return require("../../images/xbox.png");
      }
    }

    return (
    <Container>
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
      <Content>
        <List>
      {this.props.event.map((element, key) => {
        return (
      <ListItem key={key}>
        <Thumbnail square source={findImg(element.thumbnail)} />
        <Body>
          <Text style={{flex: 0.3}}>{element.title}</Text>
          <Text note style={{flex: 0.3}}>Haven‘t decided yet!</Text>
        </Body>
      </ListItem>
        );
      })}
      </List>
      </Content>
    </Container>
     );

 }
}

Notifications.defaultProps = {
  event: events.array
}
