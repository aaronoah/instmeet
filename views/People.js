import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation, FlatList } from 'react-native';
import {
  Icon, Form, Container, Header, Content, Button, List, ListItem, Left, Right, Title,
  Thumbnail, Text, Body, Tab, Tabs
} from 'native-base';
import Others_profiles from '../data/Others_profiles.json';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      followingList: this.props.screenProps.user.following,
      followerList: this.props.screenProps.user.follower
    };
    this.toggleState.bind(this);//bind the function to the class
  };

  static navigationOptions =  ({navigation}) => ({
    header: (
      <Header hasTabs>
        <Left></Left>
        <Body style ={{alignItems: 'center'}}>
          <Title>People</Title>
        </Body>
        <Right>
          <TouchableOpacity style={{marginRight: 5}} onPress={() => navigation.navigate('Searchpeople')}>
            <Icon style={{fontSize: 35, lineHeight: 35 }} name="add" />
          </TouchableOpacity>
        </Right>
      </Header>
      ),
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ fontSize: 30, color: tintColor }} />
    )
  });


  componentDidMount(){
  }

  toggleState(toggle) {
    this.setState({ toggle: toggle }); // force a rerender
  }

  unfollow(name) {
    var array = this.state.followingList;
    var index = array.indexOf(name)
    array.splice(index, 1);
    this.setState({ followingList: array });
  }

  follow(name) {
    var array1 = this.state.followingList
    array1.push(name)
    // var array2 = this.state.followerList
    // var index = array2.indexOf(name)
    // array2.splice(index, 1);
    this.setState({ followingList: array1 })
  }

  contains_following(name) {
    var array = this.state.followingList;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == name) {
        return true;
      }
    }
    return false;
  }

  contains_follower(name) {
    var array = this.state.followerList;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == name) {
        return true;
      }
    }
    return false;
  }

  switchTab(){

  }

  render() {
    function findImg(name) {
      switch (name) {
        case 'Megha Smith': return require('../images/Megha.png');
        case 'Jackie Jones': return require('../images/Jackie.png');
        case 'John Smith': return require('../images/John.png');
        case 'Jane Doe': return require('../images/Jane.png');
      }
    }

    return (
      <View style={{ backgroundColor: 'white', height: 667 }}>
        <Tabs initialPage={0}>
          <Tab heading="Follower">
            <FlatList
              data={this.state.followerList}
              keyExtractor={item => item}
              renderItem={({ item }) => {
                let u;
                this.props.Others.forEach(user => {
                  if (user.username == item) {
                    u = user;
                  }
                });

                return (
                  <ListItem onPress={() => this.props.navigation.navigate('ProfileDetail', { profile: u, toggle: true })}>
                    <Thumbnail size={80} source={findImg(u.username)} />
                    <Body>
                      <Text>{u.username}</Text>
                      <Text note>{u.notes}</Text>
                    </Body>
                    <TouchableOpacity onPress={() => this.follow(u.username)}>
                      <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
                    </TouchableOpacity>
                  </ListItem>
                );
              }} />
          </Tab>
          <Tab heading="Following">
            <FlatList
              data={this.state.followingList}
              keyExtractor={item => item}
              renderItem={({item}) => {
                let u2 = this.props.Others[0];
                for(let i=0; i<this.props.Others.length; ++i){
                  if(this.props.Others[i].username === item){
                    u2 = this.props.Others[i];
                  }
                }
                return (
                  <ListItem onPress={() => this.props.navigation.navigate('ProfileDetail', { profile: u2, toggle: false })}>
                    <Thumbnail size={80} source={findImg(u2.username)} />
                    <Body>
                      <Text >{u2.username}</Text>
                      <Text note >{u2.notes}</Text>
                    </Body>
                    <TouchableOpacity onPress={() => this.unfollow(u2.username)}>
                      <Text style={{ flex: 0.3, color: '#3F51B5' }}>Unfollow</Text>
                    </TouchableOpacity>
                  </ListItem>
                );
              }}
              />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  buttonactive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  textactive: {
    color: '#FFFFFF'
  },
  buttoninactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000'
  },
  textinactive: {
    color: '#000000'
  }
});

People.defaultProps = {
  Others: Others_profiles,
}
