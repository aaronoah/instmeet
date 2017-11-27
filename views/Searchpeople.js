import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document, Item, Input } from 'native-base';
import { Others_profiles } from '../data/Others_profiles';

export default class Searchpeople extends Component {

  constructor(props){
    super(props);
    this.state ={
      text: '',
      // content: this.recommedpeople()
      searchList:["Kumat Pratik", "Kumat Din"]
    };
  };

  static navigationOptions = {

  };

  contains(name) {
    var array = this.state.searchList;
    for(var i = 0; i < array.length; i++) {
      if (array[i] == name) {
          return true;
      }
    }
    return false;
  }

render(){

  function findImg(name){
    switch(name){
      case 'Kumat Pratik': return require('../images/face2.png');
      case 'Kumat Din': return require('../images/face3.png');
    }
  }

  return (
    <View style={{ backgroundColor: 'white', height: 667 }}>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Kumat"
            style={{ height: 40, flex: 1 }}
            onChangeText={(text) => {
              this.state.text = text;
              this.getResult();
            }}
            maxLength={30} />
        </Item>
      </Header>
      <View>
      <List>
      {this.props.Searchitem.map((element, key) => {
       if(this.contains(element.name)) {
          return (
      <ListItem key={key} onPress={() => this.props.navigation.navigate('ProfileDetail', {profile: element, toggle: true})}>
        <Thumbnail square size={80} source={findImg(element.name)} />
        <Body>
          <Text>{element.name}</Text>
          <Text note>{element.notes}</Text>
        </Body>
        <TouchableOpacity>
          <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
        </TouchableOpacity>
      </ListItem>
    );
        }})}
            </List>
    </View>
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

Searchpeople.defaultProps = {
  Searchitem: Others_profiles.array,
}
