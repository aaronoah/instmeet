import React, { Component } from 'react';
import { StyleSheet, View, Image, ViewPagerAndroid, ScrollView } from 'react-native';
import { Icon, Container, Header, Button, List, ListItem, Text, Body, Item, Title, Subtitle, Left, Right } from 'native-base';

export default class ProfileDetail extends Component {

  constructor(props) {
    super(props);
  };

  static navigationOptions = {
  };

  render() {
    const { state } = this.props.navigation;
    function findImg(name) {
      switch (name) {
        case 'Megha Smith': return require('../images/Megha.png');
        case 'Jackie Jones': return require('../images/Jackie.png');
        case 'John Smith': return require('../images/John.png');
        case 'Jane Doe': return require('../images/Jane.png');
        case 'Kumat Pratik': return require('../images/face2.png');
        case 'Kumat Din': return require('../images/face3.png');
        case 'Yuqi Zhou': return require('../images/Yuqi.png');
      }
    }

    function status(toggle) {
      if (toggle) {
        return "Follow";
      } else {
        return "Unfollow";
      }
    }
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
          <Right></Right>
        </Header>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image square size={80} source={findImg(state.params.profile.username)} style={{ width: 92, height: 92, marginLeft: 142 }} />
          <Text style={{ fontSize: 24, marginTop: 10, marginLeft: 125 }}>{state.params.profile.username} {state.params.profile.gender}</Text>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginTop: 45, marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="ios-school" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Major: {state.params.profile.major}</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="ios-call" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Phone: {state.params.profile.phone}</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="md-calendar" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Birthday: {state.params.profile.DOB}</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="logo-dribbble" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Interests: </Text>
            <Button rounded style={{ backgroundColor: [state.params.profile.color1], width: 93, height: 23, marginLeft: 5 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{state.params.profile.interest1}</Text>
            </Button>
          </ListItem>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="md-clipboard" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Credit Score: {state.params.profile.credit}</Text>
          </ListItem>
        </ScrollView>
        <Button block dark style={{ width: 353, height: 41, marginLeft: 11, marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>{status(state.params.toggle)}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});