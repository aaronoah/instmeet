import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { Icon, Form, Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Item, Input, Toast, Left, Right, Title, Badge, Card, CardItem } from 'native-base';
// import DatePicker from 'react-native-datepicker';
import TagPicker from '../components/TagPicker';
import CustomDateTimePicker from '../components/CustomDateTimePicker';

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
      initiator: this.props.screenProps.user.username
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
    if(typeof number !== Number){
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
        <Form style={{ height: 667 }}>
          <Card>
            <CardItem style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 0.2, fontSize: 18, margin: 8 }}>Title:</Text>
              <Item style={{ flex: 0.6 }}>
                <Input value={this.state.title.toString()} placeholder="Your Group Name" onChangeText={(input) => this.setState({ title: input.toString() })} />
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
                  onDateSelected={(date, time) => {
                    this.setState({timeStart: date + ' ' + time})
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
                  onDateSelected={(date, time) => {
                    this.setState({ timeEnd: date + ' ' + time})
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
              <Input value={this.state.location.toString()} placeholder="Event Location" onChangeText={(input) => this.setState({ location: input.toString() })} />
            </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{ justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 18, margin: 8 }}>Description:</Text>
            <Item>
              <Input value={this.state.description.toString()} multiline style={{width: 250}} placeholder="Event description here" onChangeText={(input) => this.setState({ description: input.toString() })} />
            </Item>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 18, margin: 8 }}>Group Size:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input value={new String(this.state.groupSize)} placeholder="Enter a number here" onChangeText={(input) => this._validateNumber(input)} />
            </Item>
                <Text style={{ color: 'red', marginHorizontal: 10, marginVertical: 3 }}>{this.state.message}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{flexDirection: 'row'}}>
              <Text style={{ flex: 0.3, fontSize: 18, marginLeft: 8 }}>Tags: </Text>
              <TagPicker onTagSelected={(newTag) => {}} />
            </CardItem>
          </Card>
        </Form>
      </Content>
      </Container>
    )
  }
}

