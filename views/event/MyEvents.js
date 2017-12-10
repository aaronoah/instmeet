import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Tab, Tabs, Left, Right, Title, Card, CardItem, Badge } from 'native-base';
import events from '../../data/events.json';
import { EventCard } from '../../components/EventCard';

export default class MyEvents extends Component {
  constructor(props){
    super(props);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.state = {
      events: this.fetchEvents(),
      initiatedEvents: [],
      joinedEvents: []
    };
  }

  fetchEvents(){
    const { state } = this.props.navigation;
    return events.filter(event => state.params.eventIds.indexOf(event.id) !== -1);
  }

  componentDidMount(){
    const { username } = this.props.screenProps.token.user;
    this.setState(prev => ({
      initiatedEvents: prev.events.filter(event => {
        if (event.initiator === username) {
          return true;
        } else {
          return false;
        }
      }),
      joinedEvents: prev.events.filter(event => {
          if (event.participants.indexOf(username) !== -1) {
            return true;
          } else {
            return false;
          }
        })
    }));
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Event Details</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Tabs initialPage={0}>
          <Tab heading="All">
            <TabContent
              tab="all"
              navigation={this.props.navigation}
              events={this.state.events} />
          </Tab>
          <Tab heading="Initiated">
            <TabContent
              tab="initiated"
              navigation={this.props.navigation}
              events={this.state.initiatedEvents} />
          </Tab>
          <Tab heading="Joined">
            <TabContent
              tab="joined"
              navigation={this.props.navigation}
              events={this.state.joinedEvents} />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const TabContent = (props) => ({
  render() {
    return (
      <View>
        {props.events.length > 0 ?
          (<FlatList
            data={props.events}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <EventCard item={item} onPress={() => props.navigation.navigate('Event', { event: item })} />
            )} />
          )
          : (
            <Text>You do not have any events now</Text>
          )
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    margin: 3
  },
  bodyText: {
    margin: 3,
    fontSize: 14,
    width: 190
  }
});