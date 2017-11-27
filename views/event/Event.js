import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Button, Text, Body, Left, Right, Title, Card, CardItem } from 'native-base';

export default class Event extends Component {
  constructor(props){
    super(props);

  }

  render() {
    const { state } = this.props.navigation;
    let txt = 'Join';
    for(let person of state.params.event.participants){
      if(person === this.props.screenProps.username){
        txt = 'Quit';
        break;
      }
    }
    if(state.params.event.time.end < new Date()){
      txt = 'Event is Ended';
    }
    let btn = (
      <Button block light={(txt === 'Event is Ended') ? true : false} success={(txt === 'Join') ? true : false} danger={(txt === 'Quit') ? true : false}>
        <Text>{txt}</Text>
      </Button>
    );
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
              <Text>Home</Text>
            </Button>
          </Left>
          <Body>
            <Title>Event Details</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Icon name='clock' />
                <Text>
                  {state.params.event.time.start} - {state.params.event.time.end}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Icon name='navigate' />
                <Text>
                  {state.params.event.location}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text style={{color: 'black'}}>Description</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{state.params.event.description}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Icon name='people' />
              <Text>({state.params.event.participants.length})</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>//thumbnails</Text>
              </Body>
            </CardItem>
          </Card>
          {btn}
        </Content>
      </Container>
    )
  }
}