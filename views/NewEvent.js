import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { Icon, Form, Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Item, Input, Toast, Left, Right, Title, Badge } from 'native-base';
import DatePicker from 'react-native-datepicker';
import TagPicker from '../components/TagPicker';

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
      timeStart: "",
      timeEnd: "",
      location: "",
      description: "",
      groupSize: 0,
      tags: []
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
              <DatePicker
                style={{ width: 200 }}
                date={this.state.timeStart}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ timeStart: date }) }}
              />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.3, fontSize: 18, margin: 22 }}>Time End:</Text>
            <Item style={{ flex: 0.6 }}>
              <DatePicker
                style={{ width: 200, borderWidth: 0}}
                date={this.state.timeEnd}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  },
                  btnTextConfirm: {
                    color: '#0e7afe'
                  },
                  btnTextCancel: {
                    color: '#0e7afe'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ timeEnd: date }) }}
              />
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
            <TagPicker />
          </View>
        </Form>
      </Content>
      </Container>
    )
  }
}
