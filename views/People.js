import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document } from 'native-base';

export default class People extends Component {
  constructor(props){
    super(props);
    this.state ={
      toggle: false,
      contentUser1: this.Megha(),
      contentUser2: this.Yuqi(),

    };

    this.toggleState.bind(this);//bind the function to the class
  };

  static navigationOptions = {
    title: "People",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  toggleState(toggle){
    this.setState({contentUser1:toggle ? this.John() : this.Megha(), contentUser2:toggle? this.Jane() : this.Yuqi(), toggle:toggle}); // force a rerender
  }

  DeleteUser1(){
    this.setState({contentUser1: this.Empty()});
  }

  DeleteUser2(){
    this.setState({contentUser2: this.Empty()});
}

Megha(){
  return (<ListItem>
    <Thumbnail square size={80} source={require('../images/Megha.png')} />
    <Body>
      <Text style={{flex: 0.3}}>Megha</Text>
      <Text note style={{flex: 0.3}}>Its time to build a difference . .</Text>
    </Body>
    <TouchableOpacity onPress={()=> this.DeleteUser1()}>
    <Text style={{flex: 0.3, color: '#3F51B5'}}>Unfollow</Text>
    </TouchableOpacity>
    </ListItem>
    );
}

Yuqi() {
  return(
    <ListItem>
    <Thumbnail square size={80} source={require('../images/Yuqi.png')} />
    <Body>
      <Text style={{flex: 0.3}}>Yuqi Zhou</Text>
      <Text note style={{flex: 0.3}}>Carpe diem</Text>
    </Body>
    <TouchableOpacity onPress={()=>this.DeleteUser2()}>
      <Text style={{flex: 0.3, color: '#3F51B5'}}>Unfollow</Text>
    </TouchableOpacity>
    </ListItem>
  );
}

John() {
  return (
    <ListItem>
    <Thumbnail square size={80} source={require('../images/John.png')} />
    <Body>
      <Text style={{flex: 0.3}}>John Smith</Text>
      <Text note style={{flex: 0.3}}>Go fighting</Text>
    </Body>
    <TouchableOpacity>
    <Text style={{flex: 0.3, color: '#3F51B5'}}>Follow</Text>
    </TouchableOpacity>
    </ListItem>
  );
}

Jane() {
  return (
    <ListItem>
    <Thumbnail square size={80} source={require('../images/Jane.png')} />
    <Body>
      <Text style={{flex: 0.3}}>Jane Doe</Text>
      <Text note style={{flex: 0.3}}>Hello</Text>
    </Body>
    <TouchableOpacity>
    <Text style={{flex: 0.3, color: '#3F51B5'}}>Follow</Text>
    </TouchableOpacity>
    </ListItem>
  );
}

Empty() {
  return (
    <Text></Text>
  );
}

  render() {
    // let first = ...
    // let last = ...
    return (
      <Form style={{backgroundColor: 'white', height: 667}}>
        <Segment style= {{backgroundColor: 'white'}}>
          <Button first inactive style={[styles.buttoninactive, this.state.toggle && styles.buttonactive]} onPress={()=> this.toggleState(true)}>
            <Text style={[styles.textinactive, this.state.toggle && styles.textactive]}>Follower</Text>
          </Button>
          <Button last active style={[styles.buttonactive, this.state.toggle && styles.buttoninactive]} onPress={()=> this.toggleState(false)}>
            <Text style={[styles.textactive, this.state.toggle && styles.textinactive]} id='followingtext'>Following</Text>
          </Button>
        </Segment>
        <List>
            {this.state.contentUser1}
            {this.state.contentUser2}
        </List>
      </Form>
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

