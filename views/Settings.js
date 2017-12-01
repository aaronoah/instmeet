import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Left, Right, Title, Badge } from 'native-base';
import IconBadge from '../components/IconBadge';

export default class Settings extends React.Component {
  constructor(props){
    super(props);
    this._logout = this._logout.bind(this);
    this.state = {
      isModalVisible: false
    }
  };

  static navigationOptions = ({screenProps}) => ({
    title: "Settings",
    tabBarIcon: ({ tintColor }) => {
      const { user } = screenProps.token;
      let count = (user.notifications !== undefined) ? user.notifications.length : 0;
      return <IconBadge name="ios-person" fontSize={30} tintColor={tintColor} notificationsCount={count} />;
    }
  });

  _logout(){
    Alert.alert(
      'Log out',
      'Are you sure to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this._onConfirmLogout() },
      ],
      { cancelable: false }
    )
  }

  _onConfirmLogout(){
    this.props.screenProps.token.user = null;
    this.props.screenProps.token.location = null;
    this.props.screenProps.authNavigator.navigate('Landing');
    this.props.screenProps.authNavigator = null;
  }

  render(){

    // function findImg(name){
    //   switch(name){
    //     case 'Yuqi': return require('../images/Yuqi.png');
    //     // case 'Megha': return require('../images/Megha.png');
    //     // case 'Kumat': return require('../images/Kumat.png');
    //     // case 'John': return require('../images/John.png');
    //     // case 'Jane': return require('../images/Jane.png');
    //   }
    // }

    const { username, major, notifications } = this.props.screenProps.token.user;

    return (
      <View style={{backgroundColor: 'white'}}>
        <List>
          <ListItem onPress={() => this.props.navigation.navigate('userProfile')}>
            <Thumbnail size={80} source={{ uri: `https://ui-avatars.com/api/?name=${username[0]}`}} />
             <Body>
              <Text style={{ flex: 0.3 }}>{username}</Text>
              <Text note style={{ flex: 0.3 }}>{major}</Text>
             </Body>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigation.navigate('Notifications', {notifications: notifications})}>
            <Left>
              <Icon name="notifications" />
            </Left>
            <Body>
              <Text style={{lineHeight: 30}}>Notifications</Text>
            </Body>
            <Right>
              <Badge>
                <Text>{notifications.length}</Text>
              </Badge>
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigation.navigate('History')}>
            <Left>
              <Icon name="clock" />
            </Left>
            <Body>
              <Text>History</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigation.navigate('resetPassword')}>
            <Left>
              <Icon name="lock" />
            </Left>
            <Body>
              <Text>Reset Password</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this._logout()}>
            <Left>
              <Icon name="exit" />
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
            <Right></Right>
          </ListItem>
        </List>
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