import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document } from 'native-base';
import { users } from '../data/users';

export default class Settings extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state ={
  //     userList: ["Megha", "Kumat", "Yuqi", "John", "Jane"]
  //   };
  // };

  static navigationOptions = {
    title: "Settings",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-person" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  Yuqi() {
    return(
      <ListItem>
      <Thumbnail square source={require('../images/Yuqi.png')} />
      <Body>
        <Text style={{flex: 0.3}}>Yuqi Zhou</Text>
        <Text note style={{flex: 0.3}}>Carpe diem</Text>
      </Body>
      </ListItem>
    );
  }

  // contains(name) {
  //   var array = this.state.userList;
  //   for(var i = 0; i < array.length; i++) {
  //     if (array[i] == name) {
  //         return true;
  //     }
  //   }
  //   return false;
  // }


  render(){
    // return (
    //   <View></View>
    // )


    // function findImg(name){
    //   switch(name){
    //     case 'Yuqi': return require('../images/Yuqi.png');
    //     // case 'Megha': return require('../images/Megha.png');
    //     // case 'Kumat': return require('../images/Kumat.png');
    //     // case 'John': return require('../images/John.png');
    //     // case 'Jane': return require('../images/Jane.png');
    //   }
    // }
   
    return (
      <View style={{backgroundColor: 'white', height: 667}}>
        <List>
          <ListItem onPress={() => this.props.navigation.navigate('userProfile')}>
             <Thumbnail square size={80} source={require('../images/Yuqi.png')} />
             <Body>
                     <Text style={{ flex: 0.3 }}>{users.array[0].username}</Text>
                     <Text note style={{ flex: 0.3 }}>{users.array[0].notes}</Text>
             </Body>
          </ListItem> 
        </List>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40}}>
          <Icon name="ios-notifications" style={{fontSize: 40, marginLeft: 44}}></Icon>
          <TouchableOpacity style={{ marginLeft: 90, marginTop: 4}} onPress={() => this.props.navigation.navigate('Notifications')}>
            <Text style={{ flex: 0.7, textAlign: 'center' }}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="ios-clock" style={{fontSize: 40, marginLeft: 44}}></Icon>
          <TouchableOpacity style={{ marginLeft: 90, marginTop: 4}} onPress={() => this.props.navigation.navigate('History')}>
          <Text style={{ flex: 0.7, textAlign: 'center' }}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 60}}>
          <Icon name="ios-lock" style={{fontSize: 40, marginLeft: 44}}></Icon>
          <TouchableOpacity style={{ marginLeft: 90, marginTop: 6}}  onPress={() => this.props.navigation.navigate('resetPassword')}>
          <Text style={{ flex: 0.7, textAlign: 'center' }}>Reset Password</Text>
          </TouchableOpacity>
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