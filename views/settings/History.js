import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Container, Form, Item, Content, Card, CardItem, Input, List, ListItem, Picker,
        Icon, Button, Header, Left, Right, Body, Title, Badge } from 'native-base';
import { EventCard } from '../../components/EventCard';
import events from '../../data/events.json';

export default class History extends React.Component {
  constructor(props){
    super(props);
    this._fetchHistory = this._fetchHistory.bind(this);
    this.state = {
      selectedSort: "key0",
      histories: this._fetchHistory()
    };
  }

  onSortChange(value) {
    let callback;
    const { latitude, longitude } = this.props.screenProps.token.location;
    switch (value) {
      case 'time': callback = (o) => new moment(o.time.start); break;
      case 'groupSize': callback = (o) => o.groupSize; break;
      case 'distance': callback = (o) => Math.pow(Math.abs(o.location.latitude - latitude), 2) + Math.pow(Math.abs(o.location.longitude - longitude), 2); break;
    }
    const sortedCards = sortBy(this.state.cards, callback);
    this.setState({
      selectedSort: value,
      cards: sortedCards
    });
  }

  _fetchHistory(){
    const { history } = this.props.navigation.state.params;
    return events.filter(event => history.indexOf(event.id) !== -1);
  }

  render(){
    // function findImg(name){
    //   switch(name){
    //     case 'swim': return require('../../images/swim.png');
    //     case 'cook': return require('../../images/cook.png');
    //     case 'club': return require('../../images/club.png');
    //     case 'rock': return require('../../images/music.png');
    //   }
    // }

  return(
    <Container>
    <Header>
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
          <Icon name='arrow-back' />
        </Button>
        </Left>
        <Body>
          <Title>History</Title>
        </Body>
        <Right></Right>
    </Header>
    <List>
      <ListItem itemHeader first style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{ paddingHorizontal: 15}}>Total: {this.state.histories.length}</Text>
        </View>
        <Form>
          <Button bordered style={{height: 30}}>
            <Picker
              mode="dropdown"
              iosHeader="Sort History"
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
      {(this.state.histories !== undefined && this.state.histories.length > 0) ? (
        <FlatList
          data={this.state.histories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EventCard item={item} onPress={() => this.props.navigation.navigate('Event', { event: item })} />
          )} />
        ) : (
          <View>
            <Text>You don't have any history events</Text>
          </View>
      )}
  </Container>
  );

  }
}

