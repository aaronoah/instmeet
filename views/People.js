import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document } from 'native-base';

export default class People extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  displayResult() {
    console.log('wayayay');
    this.setState({backgroundColor: 'black'})
  }
  render() {
    return (
      <Form style={{backgroundColor: 'white', height: 667}}>
        <Segment style= {{backgroundColor: 'white'}}>
          {/* <Button first style={{borderColor:'#000000'}} id='follower' onpress='displayResult()'>
            <Text style={{color:'#000000'}} id='followertext'>Follower</Text>
          </Button> */}
          <Button first style={{backgroundColor:'#FFFFFF', borderColor: '#000000'}} onpress={()=>this.displayResult}>
          <Text style={{color: 'black'}}>Follower</Text>
        </Button>
          <Button last active style={{backgroundColor:'#000000', borderColor: '#000000'}} id = 'following'>
            <Text style={{color:'#FFFFFF'}} id='followingtext'>Following</Text>
          </Button>
        </Segment>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={require('../images/Megha.png')} />
              <Body>
                <Text style={{flex: 0.3}}>Megha</Text>
                <Text note style={{flex: 0.3}}>Its time to build a difference . .</Text>
              </Body>
              <Text style={{flex: 0.3, color: '#3F51B5'}}>Follow</Text>
            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={require('../images/Yuqi.png')} />
              <Body>
                <Text style={{flex: 0.3}}>Yuqi Zhou</Text>
                <Text note style={{flex: 0.3}}>Carpe diem</Text>
              </Body>
              <Text style={{flex: 0.3, color: '#3F51B5'}}>Follow</Text>
            </ListItem>
          </List>
      </Form>
    )
  }
}
