import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem,
  Thumbnail, Text, Body, document } from 'native-base';
import { Others_profiles } from '../data/Others_profiles';

export default class People extends Component {
  constructor(props){
    super(props);
    this.state ={
      toggle: false,
      followingList: ["Megha", "Kumat"],
      followerList: ["John", "Jane"]
    };
    this.toggleState.bind(this);//bind the function to the class
  };

  static navigationOptions = {
    title: "People",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  toggleState(toggle) {
    this.setState({toggle:toggle}); // force a rerender
  }

  unfollow(name) {
    var array = this.state.followingList;
    var index = array.indexOf(name)
    array.splice(index, 1);
    this.setState({followingList: array });
  }

  follow(name) {
    var array1 = this.state.followingList
    array.push(name)
    var array2 = this.state.followerList
    var index = array2.indexOf(name)
    array2.splice(index, 1);
    this.setState({ followingList: array1, followerList: array2 })
  }

  contains_following(name) {
    var array = this.state.followingList;
    for(var i = 0; i < array.length; i++) {
      if (array[i] == name) {
          return true;
      }
    }
    return false;
  }

  contains_follower(name) {
    var array = this.state.followerList;
    for(var i = 0; i < array.length; i++) {
      if (array[i] == name) {
          return true;
      }
    }
    return false;
  }

  render() {
    function findImg(name){
      switch(name){
        case 'Megha': return require('../images/Megha.png');
        case 'Kumat': return require('../images/Kumat.png');
        case 'John': return require('../images/John.png');
        case 'Jane': return require('../images/Jane.png');
      }
    }

    return (
      <View style={{backgroundColor: 'white', height: 667}}>
        <Segment style= {{backgroundColor: 'white'}}>
          <Button first inactive style={[styles.buttoninactive, this.state.toggle && styles.buttonactive]} onPress={()=> this.toggleState(true)}>
            <Text style={[styles.textinactive, this.state.toggle && styles.textactive]}>Follower</Text>
          </Button>
          <Button last active style={[styles.buttonactive, this.state.toggle && styles.buttoninactive]} onPress={()=> this.toggleState(false)}>
            <Text style={[styles.textactive, this.state.toggle && styles.textinactive]} id='followingtext'>Following</Text>
          </Button>
        </Segment>
        <List>
        {this.props.Othersitem.map((element, key) => {
          if(this.contains_following(element.name) && !this.state.toggle) {
            return (
              <ListItem key={key} onPress={() => this.props.navigation.navigate('ProfileDetail', {profile: element, toggle: false})}>
                  <Thumbnail square size={80} source={findImg(element.name)} />
                  <Body>
                    <Text style={{ flex: 0.3 }}>{element.name}</Text>
                    <Text note style={{ flex: 0.3 }}>{element.notes}</Text>
                  </Body>
                  <TouchableOpacity onPress={()=>this.unfollow(element.name)}>
                    <Text style={{ flex: 0.3, color: '#3F51B5' }}>Unfollow</Text>
                  </TouchableOpacity>
              </ListItem>
              );
          }
          if(this.contains_follower(element.name) && this.state.toggle) {
            return (
              <ListItem key={key} onPress={() => this.props.navigation.navigate('ProfileDetail', {profile: element, toggle: true})}>
                  <Thumbnail square size={80} source={findImg(element.name)} />
                  <Body>
                    <Text style={{ flex: 0.3 }}>{element.name}</Text>
                    <Text note style={{ flex: 0.3 }}>{element.notes}</Text>
                  </Body>
                  <TouchableOpacity onPress={()=>this.follow(element.name)}>
                    <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
                  </TouchableOpacity>
              </ListItem>
              );
            }
          })}
        </List>
        <Button>
          <Text>  ➕ </Text>
          </Button>
      </View>
    );
  }
}

// var Megha =

// var Yuqi =
// ;

// var John =
// ;

//  var Jane =
// ;

// var Empty =
// ;

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
  textactive:{
    color:'#FFFFFF'
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
  Othersitem: Others_profiles.array,
}
