import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { Icon, Form, Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Item, Input, Toast, Left, Right, Title, Badge } from 'native-base';
// import DatePicker from 'react-native-datepicker';
import TagPicker from '../components/TagPicker';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
// import moment from 'moment';

export default class NewEvent extends Component {
  constructor(props){
    super(props);
    this._validateNumber = this._validateNumber.bind(this);
    this._saveEvent = this._saveEvent.bind(this);
    this._cancel = this._cancel.bind(this);
    this.state = {
      showToast: false,
      message: "",
      title: "",
      timeStart: new Date(),
      timeEnd: new Date(),
      location: "",
      description: "",
      groupSize: 0,
      tags: [],
      initiator: this.screenProps.user.username
    };
  }

  static navigationOptions = ({navigation}) => {
    const { state } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
      ),
      header: null
    };
  };

  _validateNumber(number){
    if(typeof number !== 1){
      this.setState({ message: 'you must type in valid number for group size' });
    }else{
      this.setState({ message: '' });
      this.setState({ groupSize: number })
    }
  }

  _saveEvent(){
    if(this.state.title !== '' && this.state.timeStart !== ''
    && this.state.timeEnd !== '' && this.state.location !== ''
    && this.state.description !== '' && this.state.groupSize !== 0){
      Toast.show({
        text: 'Create Event Successfully!',
        position: 'bottom',
        buttonText: 'Okay'
      });
      this.props.navigation.goBack(null);
    }else{
      Toast.show({
        text: 'Sorry, all information should be filled out',
        position: 'bottom',
        buttonText: 'Okay'
      });
    }
  }

  _cancel(){
    this.props.navigation.goBack(null);
  }

  render(){
    return (
      <Container>
      <Content>
        <Header>
          <Left>
            <Button title="Cancel" onPress={this._cancel} />
          </Left>
          <Body>
            <Title>Create Event</Title>
          </Body>
          <Right>
            <Button title="Done" onPress={this._saveEvent} />
          </Right>
        </Header>
        <Form style={{ backgroundColor: 'white', height: 667 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 18, margin: 22 }}>Title:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input placeholder="Your Group Name" onChangeText={(input) => this.setState({ title: input })} />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, margin: 22 }}>Time Start:</Text>
            <Item style={{ flex: 0.6 }}>
              <CustomDateTimePicker
                number={1}
                fontSize={Number(18)}
                onDateSelected={(date, time) => {
                  this.setState({timeStart: date + ' ' + time})
                }}
                maximumDate={this.state.timeEnd} />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, margin: 22 }}>Time End:</Text>
            <Item style={{ flex: 0.6 }}>
              <CustomDateTimePicker
                number={2}
                fontSize={Number(18)}
                onDateSelected={(date, time) => {
                  this.setState({ timeEnd: date + ' ' + time})
                }}
                minimumDate={this.state.timeStart} />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, margin: 22 }}>Location:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input placeholder="Event Location" onChangeText={(input) => this.setState({ location: input })} />
            </Item>
          </View>
          <View style={{ justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 18, margin: 22 }}>Description:</Text>
            <Item>
              <Input multiline placeholder="Event description here" onChangeText={(input) => this.setState({ description: input })} />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 18, margin: 22 }}>Group Size:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input placeholder="Enter a number here" onChangeText={(input) => this._validateNumber(input)} />
            </Item>
          </View>
          <Text style={{ color: 'red', marginHorizontal: 10, marginVertical: 3 }}>{this.state.message}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 22 }}>Tags: </Text>
            <TagPicker onTagSelected={(newTag) => {}} />
          </View>
        </Form>
      </Content>
      </Container>
    )
  }
}
