import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, List, ListItem, Thumbnail, Text, Body, Item, Input } from 'native-base';
import DatePicker from 'react-native-datepicker';

export default class NewEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      timeStart: "",
      timeEnd: "",
      location: "",
      description: "",
      groupSize: 0,
      tags: []
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: "Create Event",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" style={{ fontSize: 30, color: tintColor }} />
    ),
    headerLeft: <Button title="Cancel" onPress={() => navigation.goBack(null)} />,
    headerRight: <Button title="Done" onPress={() => navigation.goBack(null)} />
  });

  render(){
    return (
      <View>
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
                maxDate="2016-06-01"
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
                style={{ width: 200 }}
                date={this.state.timeEnd}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
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
              <Input placeholder="Event description here" onChangeText={(input) => this.setState({ description: input })} />
            </Item>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 0.2, fontSize: 18, margin: 22 }}>Group Size:</Text>
            <Item style={{ flex: 0.6 }}>
              <Input placeholder="Enter a number here" onChangeText={(input) => this.setState({ groupSize: input })} />
            </Item>
          </View>
        </Form>
      </View>
    )
  }
}
