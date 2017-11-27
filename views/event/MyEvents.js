import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Tab, Tabs, Left, Right, Title, Card, CardItem, Badge } from 'native-base';
import { events } from '../../data/events';

const TabContent = (props) => {
  /**
     * find image path according to its name
     * @param name string - image name
     * @return object
    */
  function findImg(name) {
    switch (name) {
      case 'swim': return require('../../images/swim.png');
      case 'cook': return require('../../images/cook.png');
      case 'club': return require('../../images/club.png');
      case 'rock': return require('../../images/music.png');
      case 'games': return require("../../images/xbox.png");
    }
  }

  return (
    <Content>
      {props.events.filter(event => {
        if((props.tab === 'initiated' && event.initiator === props.user) || props.tab === 'all'){
          return true;
        }else if(props.tab === 'joined' && event.participants.indexOf(props.user) !== -1){
          return true;
        }
        return false;
      }).map((element, key) => {
        return (
          <Card key={key} style={{ backgroundColor: element.color }}>
            <CardItem bordered header style={{ backgroundColor: element.color, marginVertical: 0 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>{element.title}</Text>
            </CardItem>
            <CardItem button onPress={() => props.navigation.navigate('Event', { event: element })} style={{ backgroundColor: element.color }}>
              <Body style={{ flexDirection: 'row' }}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="time" style={styles.icon} />
                    <Text style={styles.bodyText}>{element.time.start} - {element.time.end}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="pin" style={styles.icon} />
                    <Text style={styles.bodyText}>{element.location}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="people" style={styles.icon} />
                    <Text style={styles.bodyText}>{element.groupSize}</Text>
                  </View>
                </View>
                <View>
                  <Image style={{ width: 100, height: 100 }} source={findImg(element.thumbnail)} />
                </View>
              </Body>
            </CardItem>
            <CardItem footer style={{ backgroundColor: element.color }}>
              <Text>Tags: </Text>
              {element.tags.map((tag, k) => {
                return (
                  <Badge key={k} style={{ backgroundColor: 'white' }}>
                    <Text style={{ color: 'gray' }}>{tag}</Text>
                  </Badge>
                );
              })}
            </CardItem>
          </Card>
        );
      })}
    </Content>
  );
}

export default class MyEvents extends Component {
  constructor(props){
    super(props);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.state = {
      events: []
    };
  }

  fetchEvents(){
    const { state } = this.props.navigation;
    return events.array.filter(event => state.params.eventIds.indexOf(event.id) !== -1);
  }

  componentDidMount(){
    this.setState({
      events: this.fetchEvents()
    })
  }

  render() {
    const { state } = this.props.navigation;
    const username = this.props.screenProps.username;
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
            <TabContent tab="all" navigation={this.props.navigation} events={this.state.events} user={username} />
          </Tab>
          <Tab heading="Initiated">
            <TabContent tab="initiated" navigation={this.props.navigation} events={this.state.events} user={username} />
          </Tab>
          <Tab heading="Joined">
            <TabContent tab="joined" navigation={this.props.navigation} events={this.state.events} user={username} />
          </Tab>
        </Tabs>
      </Container>
    )
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