import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, List, ListItem, Thumbnail, Text, Body } from 'native-base';

export default class NewEvent extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Create Event",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
    ),
    headerLeft: <Button title="Cancel" onPress={() => navigation.goBack(null)} />,
    headerRight: <Button title="Done" onPress={() => navigation.goBack(null)} />
  });

  render(){
    return (
      <View>
      </View>
    )
  }
}
