import React, { Component } from 'react';
import { StyleSheet, View, Image, ViewPagerAndroid, ScrollView } from 'react-native';
import { Icon, Container, Header, Button, List, ListItem, Text, Body, Item, Title, Subtitle, Left, Right } from 'native-base';

export default class Megha_profile extends Component {

  constructor(props){
    super(props);
  };

  static navigationOptions = {
  };

  render(){
    return (
      <View style={{
        backgroundColor: 'white',
        height: 604,
        flex: 1,
        flexDirection: 'column'
      }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image square size={80} source={require('../images/Megha_profile.png')} style={{ width: 92, height: 92, marginLeft: 142 }} />
          <Text style={{ fontSize: 24, marginTop: 10, marginLeft: 145 }}>Megha ♀</Text>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginTop: 45, marginLeft: 0, width: 375, height: 45 }}>
            <Text>Major: Computer Science</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Text>Phone: 651 —123—4567</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Text>Birthday: 1990-01-01 </Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Text>Interests</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Text>Credit Status: Perfect </Text>
          </ListItem>
        </ScrollView>
        <Button block dark style={{ width: 353, height: 41, marginLeft: 11, marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Following</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});