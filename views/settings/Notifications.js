import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Left, Right, Title } from 'native-base';
import digests from '../../data/digests.json';
import ViewMore from '../../components/ViewMore';

export default class Notifications extends Component {

  constructor(props){
    super(props);
    this.state = {
      array: [],
      unreadCount: 0
    };
  }

  componentDidMount(){
    let { notifications } = this.props.navigation.state.params;
    this.setState({
      array: [...notifications.unread, ...notifications.read],  //contains only ids
      unreadCount: notifications.unread.length
    });
  }

  _onRead(){
    this.setState(prev => ({
      unreadCount: prev.unreadCount--
    }))
  }

  render(){

    let detailedNotifications = [];
    for(let i=0; i<this.state.array.length; ++i){
      let tmp;
      for(let j=0; j<digests.length; ++j){
        if(digests[j].eventId === this.state.array[i]){
          tmp = digests[j];
          break;
        }
      }
      detailedNotifications.push(tmp);
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
          data={detailedNotifications}
          keyExtractor={item => item.eventId}
          renderItem={({ item }) => {
            return (
              <ListItem>
                <ViewMore
                  thumbnail={item.thumbnail}
                  title={item.eventTitle}
                  note={`Change announcements: ${Object.keys(item.announcements).length}`}
                  unread={this.state.array.indexOf(item.eventId) < this.state.unreadCount}
                  onRead={this._onRead.bind(this)}
                >
                  <List>
                    {Object.keys(item.announcements).map((announcement, key) => {
                      return (
                        <ListItem key={key} style={{flexDirection: 'column'}}>
                          <Text style={{fontWeight: 'bold', textAlign: 'left'}}>{announcement.charAt(0).toUpperCase() + announcement.slice(1)}</Text>
                          <Text>{item.announcements[announcement]}</Text>
                        </ListItem>
                      );
                    })}
                  </List>
                </ViewMore>
              </ListItem>
            );
          }} />
    </Container>
    );
 }

}
