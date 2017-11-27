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

  // Event1() {
  //   return(
  //     <ListItem>
  //     <Thumbnail square source={require('../images/cook.png')} />
  //     <Body>
  //       <Text style={{flex: 0.3}}>Italian Cooking</Text>
  //       <Text note style={{flex: 0.3}}>Location changed to Stadium view!</Text>
  //     </Body>
  //     </ListItem>
  //   );
  // }

  // Event1() {
  //   return(
  //     <ListItem>
  //     <Thumbnail square source={require('../images/swim.png')} />
  //     <Body>
  //       <Text style={{flex: 0.3}}>Group swimming</Text>
  //       <Text note style={{flex: 0.3}}>Group size enlarged!</Text>
  //     </Body>
  //     </ListItem>
  //   );
  // }


  render(){

    function findImg(name){
      switch(name){
        case 'swim': return require('../../images/swim.png');
        case 'cook': return require('../../images/cook.png');
        case 'club': return require('../../images/club.png');
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
  {this.props.event.map((element, key) => {
    return (
      <ListItem>
      <Thumbnail square source={findImg(element.thumbnail)} />
      <Body>
        <Text style={{flex: 0.3}}>{element.title}</Text>
        <Text note style={{flex: 0.3}}>Havent decided yet!</Text>
      </Body>
      </ListItem>
    );
  })}
</Content>
</Container>
     );

 }
}

Notifications.defaultProps = {
  event: events.array
}
