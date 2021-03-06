import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document, Item, Input } from 'native-base';
import users from '../../data/users.json';
// import Autocompletion from '../../components/Autocompletion';

export default class Searchpeople extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    let content;
    if (this.state.text == '') {
      content = '';
      this.setState({content: content});
    } else if (!this.contains(this.state.text)){
      content= <View></View>;
      this.setState({content: content});
    }
  }

  findImg(name) {
    switch (name) {
      case 'Kumat Pratik': return require('../../images/face2.png');
      case 'Kumat Din': return require('../../images/face3.png');
      case 'Megha Smith': return require('../../images/Megha.png');
      case 'Jackie Jones': return require('../../images/Jackie.png');
      case 'John Smith': return require('../../images/John.png');
      case 'Jane Doe': return require('../../images/Jane.png');
      case 'Yuqi Zhou': return require('../../images/Yuqi.png');
    }
  }

  getResult(key, element) {
    var content1 = (
      <List>
        <ListItem onPress={() => this.props.navigation.navigate('Profile', { user: element })}>
          <Thumbnail size={80} source={this.findImg(element.username)} />
          <Body>
            <Text >{element.username}</Text>
            <Text note >{element.notes}</Text>
          </Body>
          <TouchableOpacity>
            <Text style={{ flex: 0.3, color: '#3F51B5' }}>Follow</Text>
          </TouchableOpacity>
        </ListItem>
      </List>
    );
     this.setState({content: content1});
   }

  render() {

    return (
      <View style={{ backgroundColor: 'white', height: 667 }}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search user"
              style={{ height: 40, flex: 1 }}
              onChangeText={(text) => {
                this.setState({
                  text: text.toLowerCase()
                });
                this.props.Searchitem.map((element, key) => {
                  if (this.state.text !== "" && element.username.toLowerCase().indexOf(this.state.text) !== -1) {
                    this.getResult(key, element);
                  }
                  else {
                    this.Noresult();
                  }
                })
              }}
              maxLength={30} />
            {/* <Autocompletion /> */}
          </Item>
        </Header>
        <Content>
        {this.state.content === '' ? null : this.state.content}
        </Content>
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
  Searchitem: users
}