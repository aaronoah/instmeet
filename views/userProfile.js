import React, { Component } from 'react';
import { StyleSheet, View, Image, ViewPagerAndroid, ScrollView } from 'react-native';
import { Icon, Container, Header, Button, List, ListItem, Text, Body, Item, Title, Subtitle, Left, Right } from 'native-base';

export default class userProfile extends Component {

  constructor(props){
    super(props);
  };

  static navigationOptions = ({navigation}) => ({
  });
  render(){
    return (
      <View style={{
        backgroundColor: 'white',
        height: 604,
        flex: 1,
        flexDirection: 'column'
      }}>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon name='arrow-back' />
          </Button>
          </Left>
          <Body></Body>
          <Right>
          <Button transparent title = "Edit" onPress={() => this.props.navigation.goBack(null)}>
          </Button>
          </Right>
      </Header>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image square size={80} source={require('../images/Megha_profile.png')} style={{ width: 92, height: 92, marginLeft: 142 }} />
          <Text style={{ fontSize: 24, marginTop: 10, marginLeft: 160 }}>test ♀</Text>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginTop: 45, marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="ios-school" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Major: Computer Science</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="ios-call" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Phone: 651 —123—4567</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="md-calendar" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Birthday: 1990-01-01 </Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="logo-dribbble" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Interests: </Text>
            <Button rounded style={{ backgroundColor: '#FBAD3D', width: 80, height: 23, marginLeft: 5 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Coding</Text>
            </Button>
          </ListItem>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="md-clipboard" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Credit Score: 100 </Text>
          </ListItem>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});