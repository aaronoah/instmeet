import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { Container, Icon, Content, Card, CardItem, Body, Text, Button, Badge, List, ListItem, Picker, Item, Form } from 'native-base';
// import events from '../data/events.json';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import { EventCard } from '../components/EventCard';

class Home extends Component {
  constructor(props){
    super(props);
    this.showMyEvents = this.showMyEvents.bind(this);
    this._setEvents = this._setEvents.bind(this);
    this.state = {
      selectedSort: "key0",
      cards: [],
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ fontSize: 30, color: tintColor }} />
    )
  });

  onSortChange(value) {
    let callback;
    const { latitude, longitude } = this.props.screenProps.token.location;
    const { user } = this.props.screenProps.token;
    switch(value){
      case 'time': callback = (o) => new moment(o.time.start); break;
      case 'groupSize': callback = (o) => o.groupSize; break;
      case 'distance': callback = (o) => Math.pow(Math.abs(o.location.latitude - latitude), 2) + Math.pow(Math.abs(o.location.longitude - longitude), 2); break;
      default: callback = (o) => !user.interests.includes(o.tags[0]); break;//recommend based on interests
    }
    const sortedCards = sortBy(this.state.cards, callback);
    this.setState({
      selectedSort: value,
      cards: sortedCards
    });
  }

  showMyEvents(events){
    this.props.navigation.navigate('MyEvents', { eventIds: events });
  }

  async _setEvents(){
    try{
      let c = await AsyncStorage.getItem('events');
      const { user } = this.props.screenProps.token;
      let callback = (o) => !user.interests.includes(o.tags[0]);
      let sortedCards = sortBy(JSON.parse(c), callback);
      this.setState({
        cards: sortedCards
      });
    }catch(error){
      return error;
    }

    return "success"
  }

  componentDidMount(){
    this._setEvents().then(val => {
      if(val !== 'success'){
        throw new Error(val);
      }
    });
  }

  render(){

    let { user } = this.props.screenProps.token;
    let myEvents = (user.events !== undefined && user.events.incoming !== undefined) ? user.events.incoming : [];

    return (
      <Container>
        <List>
          <ListItem itemHeader first style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text>My Events: </Text>
              <Button bordered style={{ height: 30 }} onPress={() => this.showMyEvents(myEvents)}>
                <Text>{myEvents.length}</Text>
              </Button>
            </View>
            <Form>
              <Button bordered style={{height: 30}}>
                <Picker
                  mode="dropdown"
                  iosHeader="Sort"
                  selectedValue={this.state.selectedSort}
                  onValueChange={this.onSortChange.bind(this)}
                >
                  <Item label="Sort" value="key0"></Item>
                  <Item label="Sort: Time" value="time" />
                  <Item label="Sort: Distance" value="distance" />
                  <Item label="Sort: Group size" value="groupSize" />
                </Picker>
              </Button>
            </Form>
          </ListItem>
        </List>
        <FlatList
          data={this.state.cards}
          keyExtractor={item => item.id}
          extraData={this.state}
          refreshing={this.state.refreshing}
          renderItem={({item}) => (
            <EventCard item={item} onPress={() => this.props.navigation.navigate('Event', {event: item})} />
          )}
        />
      </Container>
    );
  }
}

export default Home;