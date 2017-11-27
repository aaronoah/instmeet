import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document, Item, Input } from 'native-base';

export default class Searchpeople extends Component {

  constructor(props){
    super(props);
  };

  static navigationOptions = {
};

render(){
  return (
    <Header searchBar rounded>
    <Item>
      <Icon name="ios-search" />
      <Input  
      placeholder="Search"
      style={{height: 40, flex: 1}}
      onChangeText={(text) => {
        this.state.text = text;
        this.getResult();
      }} 
      maxLength={30} />
    </Item>
  <View style={{backgroundColor: 'white', height: 667}}>
    <Segment style= {{backgroundColor: 'white'}}>
       <Button first inactive style={[styles.buttoninactive, 
        this.state.toggle && styles.buttonactive]} 
        onPress={()=> this.toggleState(true)}>
          <Text style={[styles.textinactive, 
            this.state.toggle && styles.textactive]}>User</Text>
       </Button>
       <Button last active style={[styles.buttonactive, 
        this.state.toggle && styles.buttoninactive]} 
        onPress={()=> this.toggleState(false)}>
           <Text style={[styles.textactive, 
            this.state.toggle && styles.textinactive]}>Event</Text>
       </Button>
    </Segment>
       {this.state.content}
  </View>
  </Header>
    )
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
