import React, {Component} from 'react';
import {StyleSheet, View, Image, ViewPagerAndroid, ScrollView} from 'react-native';
import { Icon, Container, Header, List, Button, ListItem, Text, Body, Item, Title, Subtitle, Left, Right, Content, Form, Input, Badge, Thumbnail } from 'native-base';
import TagPicker from '../../components/TagPicker';
import interests from '../../data/interests.json';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    let { user } = this.props.navigation.state.params;
    this.state = {
      editOn: false,
      username: user.username,
      gender: user.gender,
      major: user.major,
      phone: user.phone,
      birthday: user.birthday,
      interests: this._fetchInterests(),
      credit: user.credit,
      followText: "Follow"
    };
    this._fetchInterests = this._fetchInterests.bind(this);
    this._saveProfile = this._saveProfile.bind(this);
    this._toggleFollow = this._toggleFollow.bind(this);
    this.toggleEdit =  this.toggleEdit.bind(this); //bind the function to the class
  }

  static navigationOptions = ({navigation}) => ({});

  _fetchInterests(){
    let res = [];
    const len = interests.length;
    let userInterests = (this.props.navigation.state.params.user.interests !== undefined) ? this.props.navigation.state.params.user.interests : [];
    for(let i=0; i<len; ++i){
      for(let j=0; j<userInterests.length; ++j){
        if (interests[i].text === userInterests[j]){
          res.push(interests[i]);
        }
      }
    }
    return res;
  }

  toggleEdit() {
    if(this.state.editOn){
      this._saveProfile();
    }
    this.setState(prev => ({
      editOn: !prev.editOn
    }));
  }

  _saveProfile() {

  }

  _toggleFollow(){
    this.setState(prev => ({
      followText: (prev.followText === 'Follow') ? 'Unfollow' : 'Follow'
    }));
  }

  render() {

    let logonUser = this.props.screenProps.token.user;

    function status(toggle) {
      if (toggle) {
        return "Follow";
      } else {
        return "Unfollow";
      }
    }

    return (
      <View
        style={{
        backgroundColor: 'white',
        height: 604,
        flex: 1,
        flexDirection: 'column'
      }}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              {(this.state.username === logonUser.username) ? <Title>You</Title>: null}
            </Body>
            <Right>
              {(this.state.username === logonUser.username) ? (
                <Button transparent edit onPress={() => this.toggleEdit()}>
                  <Text>{(!this.state.editOn) ? 'Edit' : 'Done'}</Text>
                </Button>
              ) : null}
            </Right>
          </Header>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 140, height: 140, borderRadius: 70}}
                source={{ uri: `https://ui-avatars.com/api/?name=${this.state.username}&font-size=0.5&size=128` }}
              />
            </View>
            <View style={{ marginVertical: 20, justifyContent: 'center'}}>
              <Input style={{fontSize: 30, textAlign: 'center'}} defaultValue={this.state.username} editable={this.state.editOn} onChangeText={(input) => this.setState({ major: input })} />
            </View>
            <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
              <Icon name="ios-school" style={{ marginLeft: 5 }} />
              <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                <Text>Major:</Text>
                <Item last style={{ flex: 0.8, marginLeft: 40 }}>
                  <Input defaultValue={this.state.major} editable={this.state.editOn} onChangeText={(input) => this.setState({ major: input })} />
                </Item>
              </View>
            </ListItem>
            <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
              <Icon name="ios-call" style={{ marginLeft: 5 }} />
              <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                <Text>Phone: </Text>
                <Item last style={{ flex: 0.8, marginLeft: 40 }}>
                  <Input defaultValue={this.state.phone} editable={this.state.editOn} onChangeText={(input) => this.setState({ phone: input })} />
                </Item>
              </View>
            </ListItem>
            <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
              <Icon name="md-calendar" style={{ marginLeft: 5 }} />
              <View style={{ marginLeft: 15, flexDirection: 'row' }}>
                <Text>Birthday:</Text>
                <Item last style={{ flex: 0.8, marginLeft: 40 }}>
                  <Input defaultValue={this.state.birthday} editable={this.state.editOn} onChangeText={(input) => this.setState({ birthday: input })} />
                </Item>
              </View>
            </ListItem>
            <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
              <Icon name="logo-dribbble" style={{ marginLeft: 5 }} />
              <Text style={{ marginHorizontal: 15 }}>Interests:</Text>
              <TagPicker navigation={this.props.navigation} badges={this.state.interests} permitEdit={this.state.editOn} />
            </ListItem>
            <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
              <Icon name="md-clipboard"
                style={{marginLeft: 5}} />
              <Text style={{
                marginLeft: 15
              }}>Credit Score: {this.state.credit}</Text>
            </ListItem>
          </ScrollView>
          {(this.props.navigation.state.params.user.username !== logonUser.username) ? (
            <Button
              block
              style={{width: 353, height: 41, marginLeft: 11, marginBottom: 20}}
              onPress={() => this._toggleFollow()}>
              <Text style={{ fontSize: 18 }}>{this.state.followText}</Text>
            </Button>
          ) : null}
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});