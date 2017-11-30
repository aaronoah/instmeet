import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Left, Right, Title } from 'native-base';
import events from '../../data/events.json';

export default class Notifications extends Component {

  constructor(props){
    super(props);
  }

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
    <Container style={{backgroundColor: 'white'}}>
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
      <FlatList
        data={this.props.navigation.state.params.notifications}
        keyExtractor={item => item}
        renderItem={({item}) => {
          let event;
          for(let i=0; i<events.length; ++i){
            if(events[i].id === item){
              event = events[i];
            }
          }
          return (
              <ListItem>
                <Thumbnail source={findImg(event.thumbnail)} />
                <Body>
                  <Text style={{ flex: 0.3 }}>{event.title}</Text>
                  <Text note style={{ flex: 0.3 }}>Haven‘t decided yet!</Text>
                </Body>
              </ListItem>
          );
        }} />
    </Container>
    );
 }

}
