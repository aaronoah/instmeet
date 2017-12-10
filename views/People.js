import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation, FlatList } from 'react-native';
import {
  Icon, Form, Container, Header, Content, Button, List, ListItem, Left, Right, Title,
  Thumbnail, Text, Body, Tab, Tabs
} from 'native-base';
import users from '../data/users.json';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      toggle: false,
      followingList: this.props.screenProps.token.user.following,
      followerList: this.props.screenProps.token.user.follower,

    };
    this.toggleState.bind(this);//bind the function to the class
    this._follow = this._follow.bind(this);
    this._unfollow = this._unfollow.bind(this);
    this._toggleFollow = this._toggleFollow.bind(this);
  };

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header hasTabs>
        <Left></Left>
        <Body style={{ alignItems: 'center' }}>
          <Title>People</Title>
        </Body>
        <Right>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={() => navigation.navigate('Searchpeople')}>
            <Icon style={{ fontSize: 35, lineHeight: 35 }} name="add" />
          </TouchableOpacity>
        </Right>
      </Header>
    ),
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-list" style={{ fontSize: 30, color: tintColor }} />
    )
  });

  toggleState(toggle) {
    this.setState({ toggle: toggle }); // force a rerender
  }

  _unfollow(name) {
    var array = this.state.followingList;
    var index = array.indexOf(name);
    array.splice(index, 1);
    this.setState({ followingList: array });
    this.forceUpdate();
  }

  _follow(name) {
    var array1 = this.state.followingList;
    array1.push(name);
    this.setState({ followingList: array1 });
    this.forceUpdate();
  }

  _toggleFollow(username){
    if(this.state.followingList.includes(username)){
      this._unfollow(username);
    }else{
      this._follow(username);
    }
  }

  findImg(name) {
    switch (name) {
      case 'Megha Smith': return require('../images/Megha.png');
      case 'Jackie Jones': return require('../images/Jackie.png');
      case 'John Smith': return require('../images/John.png');
      case 'Jane Doe': return require('../images/Jane.png');
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', height: 667 }}>
        <Tabs initialPage={0}>
          <Tab heading="Follower">
            <FlatList
              data={this.state.followerList}
              keyExtractor={item => item}
              extraData={this.state}
              renderItem={({ item }) => {
                let u;
                this.props.Others.forEach(user => {
                  if (user.username == item) {
                    u = user;
                  }
                });
                return (
                  <ListItem onPress={() => this.props.navigation.navigate('Profile', { user: u, toggle: true })}>
                    <Thumbnail size={80} source={this.findImg(u.username)} />
                    <Body>
                      <Text>{u.username}</Text>
                      <Text note>{u.notes}</Text>
                    </Body>
                    <TouchableOpacity onPress={() => this._toggleFollow(u.username)}>
                      {this.state.followingList.includes(u.username) ? (
                        <Text style={{ flex: 0.3, color: '#3F51B5' }}>Unfollow</Text>
                      ) : (
                          <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
                      )}
                    </TouchableOpacity>
                  </ListItem>
                );
              }} />
          </Tab>
          <Tab heading="Following">
            <FlatList
              data={this.state.followingList}
              keyExtractor={item => item}
              extraData={this.state}
              renderItem={({ item }) => {
                  let u2;
                this.props.Others.forEach(user => {
                  if (user.username == item) {
                    u2 = user;
                  }
                });
                  return (
                  <List>
                    <ListItem onPress={() => this.props.navigation.navigate('Profile', { user: u2, toggle: false })}>
                      <Thumbnail size={80} source={this.findImg(u2.username)} />
                      <Body>
                        <Text >{u2.username}</Text>
                        <Text note >{u2.notes}</Text>
                      </Body>
                      <TouchableOpacity onPress={() => this._toggleFollow(u2.username)}>
                          {this.state.followingList.indexOf(u2.username) !== -1 ? (
                            <Text style={{ flex: 0.3, color: '#3F51B5' }}>Unfollow</Text>
                          ): (
                            <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
                          )}
                      </TouchableOpacity>
                    </ListItem>
                  </List>
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
  Others: users,
}