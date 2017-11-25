import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';

export default class Home extends Component {
  static navigationOptions = {
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  render(){
    return (
      <Content>
        <View style={{flexDirection: 'row'}}>
          <Text>My Events: </Text>
          <Button bordered>
            <Text>16</Text>
          </Button>
        </View>
        <Card>
          <CardItem header>
            <Text>Swimming</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Time: 3:30pm - 4:50am</Text>
              <Text>Sat. 11/11</Text>
              <Text>Location: Coke 10</Text>
              <Text>Group Size: 3</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }
}