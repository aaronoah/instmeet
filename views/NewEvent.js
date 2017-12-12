import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Button, AsyncStorage } from 'react-native';
import { Icon, Form, Container, Header, Content, List, Input, ListItem, Thumbnail, Text, Body, Item, Toast, Left, Right, Title, Badge, Card, CardItem } from 'native-base';
// import DatePicker from 'react-native-datepicker';
import TagPicker from '../components/TagPicker';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import { DebounceInput } from '../components/DebounceInput';

export default class NewEvent extends Component {
  constructor(props){
    super(props);
    this._validateNumber = this._validateNumber.bind(this);
    this._saveEvent = this._saveEvent.bind(this);
    this._cancel = this._cancel.bind(this);
    this._selected = this._selected.bind(this);
    this._toggleSizeInfinity = this._toggleSizeInfinity.bind(this);
    this._saveToStorage = this._saveToStorage.bind(this);
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
      initiator: this.props.screenProps.token.user.username,
      sizeLimit: "No size limit",
      numberDisabled: false,
      registerDDL: ""
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
    if(typeof number !== "number"){
      this.setState({ message: 'you must type in valid number for group size' });
    }else{
      this.setState({ message: '' });
      this.setState({ groupSize: Number(number) })
    }
  }

  _toggleSizeInfinity(){
    let l = (this.state.sizeLimit === 'No size limit') ? "Set size limit" : "No size limit";

    this.setState(prev => ({
      sizeLimit: l,
      groupSize: (prev.groupSize === Infinity) ? 0 : Infinity,
      numberDisabled: !prev.numberDisabled
    }));

  }

  async _saveToStorage(){
    let newEvent = {
      title: this.state.title,
      time: {
        start: this.state.timeStart,
        end: this.state.timeEnd
      },
      registerDDL: this.state.registerDDL,
      location: {
        name: this.state.location
      },
      description: this.state.description,
      groupSize: this.state.groupSize,
      initiator: this.props.screenProps.token.user.username,
      participants: [],
      color: "white",
      tags: this.state.tags
    }

    try {
      let events;
      await AsyncStorage.getItem('events').then(val => {
        events = JSON.parse(val);
      });
      newEvent.id = events.length + 1;

      events.push(newEvent);
      AsyncStorage.setItem('events', JSON.stringify(events));

      let users;
      await AsyncStorage.getItem('users').then(val => {
        users = JSON.parse(val);
      });

      for(let i=0; i<users.length; ++i){
        if(users[i].username === this.props.screenProps.token.user.username){
          users[i].events.incoming.push(newEvent.id);
          AsyncStorage.setItem('users', JSON.stringify(users));
        }
      }

    } catch (error) {
      return error;
    }

    return "success";
  }

  _saveEvent(){
    if(this.state.title !== '' && this.state.timeStart !== ''
    && this.state.timeEnd !== '' && this.state.location !== ''
    && this.state.description !== '' && this.state.groupSize !== 0 && this.state.registerDDL !== ""){

      this._saveToStorage().then(output => {
        if(output !== 'success'){
          Toast.show({
            text: 'Sorry, new event is not created successfully, try again',
            position: 'bottom',
            buttonText: 'Okay'
          });
          throw new Error(output);
        }else{
          Toast.show({
            text: 'Create Event Successfully!',
            position: 'bottom',
            buttonText: 'Okay'
          });
          this.props.navigation.goBack(null);
        }
      });

    }else{
      Toast.show({
        text: 'Sorry, all information should be filled out',
        position: 'bottom',
        buttonText: 'Okay'
      });
    }
  }

  _selected(tag) {
    this.setState(prev => ({
      tags: prev.tags.push(tag)
    }));
  }

  _cancel(){
    this.props.navigation.goBack(null);
  }


  render(){
    return (
      <Container>
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
      <Content>
        <Form>
          <Card>
            <CardItem style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 0.2, fontSize: 18, margin: 8 }}>Title:</Text>
              <Item style={{ flex: 0.6 }}>
                <DebounceInput returnKeyType="next" placeholder="Your Group Name" onChangeText={(input) => this.setState({ title: input.toString() })} />
              </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ flex: 0.2, fontSize: 18, margin: 8 }}>From:</Text>
              <Item style={{ flex: 0.7 }}>
                <CustomDateTimePicker
                  number={1}
                  fontSize={Number(18)}
                  onDateSelected={(date, year, time) => {
                    this.setState({timeStart: date + ' ' + year + ' ' + time})
                  }}
                  maximumDate={this.state.timeEnd} />
              </Item>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 0.2, fontSize: 18, margin: 8 }}>To:</Text>
              <Item style={{ flex: 0.7 }}>
                <CustomDateTimePicker
                  number={2}
                  fontSize={Number(18)}
                  onDateSelected={(date, year, time) => {
                    this.setState({ timeEnd: date + ' ' + year + ' ' + time})
                  }}
                  minimumDate={this.state.timeStart} />
              </Item>
            </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, margin: 8 }}>Location:</Text>
            <Item style={{ flex: 0.7 }}>
              <DebounceInput placeholder="Event Location" onChangeText={(input) => this.setState({ location: input.toString() })} />
            </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
            <Text style={{ fontSize: 18, margin: 8 }}>Description:</Text>
            <Item>
              <DebounceInput multiline style={{width: 250}} placeholder="Event description here" onChangeText={(input) => this.setState({ description: input.toString() })} />
            </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 18, margin: 8 }}>Group Size:</Text>
            <Item style={{ flex: 0.5 }}>
              <Input disabled={this.state.numberDisabled} wait={Number(1)} keyboardType="number-pad" placeholder="Enter a number" value={this.state.groupSize.toString()} onChangeText={(input) => this.setState({groupSize: input})} />
            </Item>
            <TouchableOpacity style={{ flex: 0.3 }} onPress={this._toggleSizeInfinity}>
              <Text style={{ color: 'blue'}}>{this.state.sizeLimit}</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red', marginHorizontal: 10, marginVertical: 3 }}>{this.state.message}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{flexDirection: "row"}}>
              <Text style={{color: 'red', margin: 8}}>Deadline to register:</Text>
                <CustomDateTimePicker
                  number={3}
                  fontSize={Number(18)}
                  onDateSelected={(date, year, time) => {
                    this.setState({ registerDDL: date + ' ' + year + ' ' + time })
                  }}
                  maximumDate={this.state.timeStart}/>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{flexDirection: 'row'}}>
              <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 8 }}>Tags: </Text>
              <TagPicker navigation={this.props.navigation} permitEdit={true} onTagSelected={(newTag) => {this._selected(newTag)}}/>
            </CardItem>
          </Card>
        </Form>
      </Content>
      </Container>
    )
  }
}

