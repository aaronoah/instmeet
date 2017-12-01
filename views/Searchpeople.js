import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document, Item, Input } from 'native-base';
import Others_profiles from '../data/Others_profiles';

export default class Searchpeople extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      // content: this.recommedpeople()
      searchList: ["Kumat Pratik", "Kumat Din", "Yuqi Zhou", "Megha Smith", "Jackie Jones", "John Smith", "Jane Doe"],
      content:''
    };
  };

  static navigationOptions = {

  };

  contains(name) {
    var array = this.state.searchList;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == name) {
        return true;
      }
    }
    return false;
  }

  Noresult() {
    if (this.state.text == '') {
      var content1 = '';
      this.setState({content: content1});
    } else if (!this.contains(this.state.text)){
      var constent1= <View></View>;
      this.setState({content: content1});
    }
  }

  getResult(key, element) {
    var content1 =
    <List>
      <ListItem onPress={() => this.props.navigation.navigate('ProfileDetail', { profile: element, toggle: false })}>
        <Thumbnail size={80} source={findImg(element.username)} />
        <Body>
          <Text >{element.username}</Text>
          <Text note >{element.notes}</Text>
        </Body>
        <TouchableOpacity onPress={() => this.unfollow(element.username)}>
          <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
        </TouchableOpacity>
      </ListItem>;
    </List>
     this.setState({content: content1});
   }

  render() {

    function findImg(name) {
      switch (name) {
        case 'Kumat Pratik': return require('../images/face2.png');
        case 'Kumat Din': return require('../images/face3.png');
        case 'Megha Smith': return require('../images/Megha.png');
        case 'Jackie Jones': return require('../images/Jackie.png');
        case 'John Smith': return require('../images/John.png');
        case 'Jane Doe': return require('../images/Jane.png');
        case 'Yuqi Zhou': return require('../images/Yuqi.png');
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
                this.props.Searchitem.map((element, key) => {
                  if (element.username == this.state.text) {
                    this.getResult(key, element);
                  }
                  else {
                    this.Noresult();
                  }
                })
              }}
              maxLength={30} />
          </Item>
        </Header>
        <View>
          {this.state.content}
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

Searchpeople.defaultProps = {
  Searchitem: Others_profiles,
}