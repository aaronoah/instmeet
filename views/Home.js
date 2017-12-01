import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Container, Icon, Content, Card, CardItem, Body, Text, Button, Badge, List, ListItem, Picker, Item, Form } from 'native-base';
import events from '../data/events.json';
import sortBy from 'lodash/sortBy';
import moment from 'moment';

class Home extends Component {
  constructor(props){
    super(props);
    this.showMyEvents = this.showMyEvents.bind(this);
    this.state = {
      selectedSort: "key0",
      cards: events
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
    switch(value){
      case 'time': callback = (o) => new moment(o.time.start); break;
      case 'groupSize': callback = (o) => o.groupSize; break;
      case 'distance': callback = (o) => Math.pow(Math.abs(o.latitude - latitude), 2) + Math.pow(Math.abs(o.longitude - longitude), 2); break;
    }
    const sortedCards = sortBy(this.state.cards, callback);
    this.setState({
      selectedSort: value,
      cards: sortedCards
    });
  }

  showMyEvents(){
    this.props.navigation.navigate('MyEvents', { eventIds: this.props.screenProps.token.user.events.incoming });
  }

  componentDidMount(){

  }

  render(){
    /**
     * find image path according to its name
     * @param name string - image name
     * @return object
    */
    function findImg(name){
      switch(name){
        case 'swim': return require('../images/swim.png');
        case 'cook': return require('../images/cook.png');
        case 'club': return require('../images/club.png');
        case 'rock': return require('../images/music.png');
        case 'games': return require("../images/xbox.png");

      }
    }

    let { user } = this.props.screenProps.token;
    let myEvents = (user.events !== undefined && user.events.incoming !== undefined) ? user.events.incoming : [];

    return (
      <Container>
        <List>
          <ListItem itemHeader first style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text>My Events: </Text>
              <Button bordered style={{ height: 30 }} onPress={() => this.showMyEvents()}>
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
          renderItem={({item}) => (
            <Card style={{ backgroundColor: item.color }}>
              <CardItem header style={{ backgroundColor: item.color, marginVertical: 0 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>{item.title}</Text>
              </CardItem>
              <CardItem button onPress={() => this.props.navigation.navigate('Event', { event: item })} style={{ backgroundColor: item.color }}>
                <Body style={{ flexDirection: 'row' }}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="time" style={styles.icon} />
                      <Text style={styles.bodyText}>{item.time.start} - {item.time.end}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="pin" style={styles.icon} />
                      <Text style={styles.bodyText}>{item.location.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name="people" style={styles.icon} />
                      <Text style={styles.bodyText}>{item.groupSize}</Text>
                    </View>
                  </View>
                  <View>
                    <Image style={{ width: 100, height: 100 }} source={findImg(item.thumbnail)} />
                  </View>
                </Body>
              </CardItem>
              <CardItem footer style={{ backgroundColor: item.color }}>
                <Text>Tags: </Text>
                {item.tags.map((tag, k) => {
                  return (
                    <Badge key={k} style={{ backgroundColor: 'white' }}>
                      <Text style={{ color: 'gray' }}>{tag}</Text>
                    </Badge>
                  );
                })}
              </CardItem>
            </Card>
          )}
        />
        {/* <Content>
          {this.props.card.map((element, key) => {
            return (
            );
          })}
        </Content> */}
      </Container>
    );
  }
}

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

Home.defaultProps = {
  card: events
}

export default Home;