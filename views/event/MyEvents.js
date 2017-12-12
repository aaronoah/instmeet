import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Tab, Tabs, Left, Right, Title, Card, CardItem, Badge } from 'native-base';
// import events from '../../data/events.json';
import { EventCard } from '../../components/EventCard';

export default class MyEvents extends Component {
  constructor(props){
    super(props);
    this._fetchEvents = this._fetchEvents.bind(this);
    this.state = {
      events: [],
      initiatedEvents: [],
      joinedEvents: []
    };
  }

  async _fetchEvents(){
    const { state } = this.props.navigation;
    const e = await AsyncStorage.getItem('events');
    return JSON.parse(e).filter(event => state.params.eventIds.indexOf(event.id) !== -1);
  }

  componentWillMount(){
    this._fetchEvents().then(val => {
      if(Array.isArray(val)){
        this.setState({ events: val});
        const { username } = this.props.screenProps.token.user;
        this.setState({
          initiatedEvents: val.filter(event => {
            if (event.initiator === username) {
              return true;
            } else {
              return false;
            }
          }),
          joinedEvents: val.filter(event => {
            if (event.participants.indexOf(username) !== -1) {
              return true;
            } else {
              return false;
            }
          })
        });
        this.forceUpdate();
      }
    });
  }

  render() {
    if(this.state.events.length == 0){
      return false;
    }
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
            extraData={props.events}
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