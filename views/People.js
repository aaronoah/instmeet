import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation, FlatList, AsyncStorage } from 'react-native';
import {
  Icon, Form, Container, Header, Content, Button, List, ListItem, Left, Right, Title,
  Thumbnail, Text, Body, Tab, Tabs
} from 'native-base';
// import users from '../data/users.json';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      toggle: false,
      followingList: [],
      followerList: [],
    };
    this._retrieveUsers = this._retrieveUsers.bind(this);
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

  async _retrieveUsers(){
    const { user } = this.props.screenProps.token;
    try {
      const u = await AsyncStorage.getItem('users');
      const users = JSON.parse(u);
      let follower = [];
      let following = [];
      for(let i=0; i<users.length; ++i){
        if(user.follower.includes(users[i].username)){
          follower.push(users[i]);
        }else if(user.following.includes(users[i].username)){
          following.push(users[i]);
        }
      }

      this.setState({
        followerList: follower,
        followingList: following
      });

      return 'success';
    }catch(error){
      return error;
    }
  }

  componentWillMount(){
    this._retrieveUsers().then(val => {
      if(val !== 'success'){
        throw new Error(val);
      }
    });
  }

  toggleState(toggle) {
    this.setState({ toggle: toggle }); // force a rerender
  }

  _unfollow(user) {
    var array = this.state.followingList;
    let index = array.indexOf(user);
    array.splice(index, 1);
    this.setState({ followingList: array });
  }

  _follow(user) {
    var array1 = this.state.followingList;
    array1.push(user);
    this.setState({ followingList: array1 });
  }

  _toggleFollow(user){
    if(this.state.followingList.includes(user)){
      this._unfollow(user);
    }else{
      this._follow(user);
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
    if(this.state.followerList.length == 0 || this.state.followingList.length == 0){
      return false;
    }
    return (
      <View style={{ backgroundColor: 'white', height: 667 }}>
        <Tabs initialPage={0}>
          <Tab heading="Follower">
            <FlatList
              data={this.state.followerList}
              keyExtractor={item => item.username}
              extraData={this.state}
              renderItem={({ item }) => {
                return (
                  <ListItem onPress={() => this.props.navigation.navigate('Profile', { user: item, toggle: true })}>
                    <Thumbnail size={80} source={this.findImg(item.username)} />
                    <Body>
                      <Text>{item.username}</Text>
                      <Text note>{item.notes}</Text>
                    </Body>
                    <TouchableOpacity onPress={() => this._toggleFollow(item)}>
                      {this.state.followingList.includes(item) ? (
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
              keyExtractor={item => item.username}
              extraData={this.state}
              renderItem={({ item }) => {
                  return (
                  <List>
                    <ListItem onPress={() => this.props.navigation.navigate('Profile', { user: item, toggle: false })}>
                      <Thumbnail size={80} source={this.findImg(item.username)} />
                      <Body>
                        <Text >{item.username}</Text>
                        <Text note >{item.notes}</Text>
                      </Body>
                      <TouchableOpacity onPress={() => this._toggleFollow(item)}>
                          {this.state.followingList.indexOf(item) !== -1 ? (
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
