import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Button, Text, Body, Left, Right, Title, Card, CardItem, Thumbnail } from 'native-base';
import moment from 'moment';

export default class Event extends Component {
  constructor(props){
    super(props);

  }

  render() {
    const { state } = this.props.navigation;
    let { user } = this.props.screenProps.token;
    const event = state.params.event;
    let txt = 'Join';
    for(let i=0; i<event.participants.length; ++i){
      if(event.participants[i] === this.props.screenProps.token.user.username){
        txt = 'Quit';
        break;
      }
    }
    if (moment(event.time.end).isBefore(moment())){
      txt = 'Event is Ended';
    }
    let btn = (
      <Button block light={(txt === 'Event is Ended') ? true : false} success={(txt === 'Join') ? true : false} danger={(txt === 'Quit') ? true : false}>
        <Text>{txt}</Text>
      </Button>
    );

    let editBtn = (event.initiator === user.username) ? (
      <Button transparent>
        <Text>Edit</Text>
      </Button>
    ) : null;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' style={{marginRight: 0}}/>
              <Text>Home</Text>
            </Button>
          </Left>
          <Body>
            <Title>Event Details</Title>
          </Body>
          <Right>
            {editBtn}
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Body style={{flexDirection: "row", alignItems: 'center'}}>
                <Icon style={{ fontSize: 60 }}name='clock' />
                <View style={{flex:1, justifyContent: 'center'}}>
                  <Text style={{marginLeft: 15, width: 250}}>
                    From: {event.time.start}
                  </Text>
                  <Text style={{marginLeft: 15, width: 250 }}>
                    To: {event.time.end}
                  </Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body style={{flexDirection: "row", alignItems: 'center'}}>
                <Icon name='navigate' style={{ fontSize: 60}}/>
                <Text style={{marginLeft:15, width: 280}}>
                  {event.location.name}
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
                <Text>{event.description}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Icon name='people' style={{ fontSize: 35 }}/>
              <Text style={{marginLeft: 3}}>({event.participants.length})</Text>
            </CardItem>
            <CardItem>
              <Body style={{flexDirection: 'row'}}>
                {event.participants.map((participant, key) => {
                  return (
                    <Thumbnail key={key} source={{ uri: `https://ui-avatars.com/api/?name=${participant}`}}/>
                  );
                })}
              </Body>
            </CardItem>
          </Card>
          {btn}
        </Content>
      </Container>
    )
  }
}