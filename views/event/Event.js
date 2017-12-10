import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Button, Text, Body, Left, Right, Title, Card, CardItem, Thumbnail, Item } from 'native-base';
import moment from 'moment';
import CustomDateTimePicker from '../../components/CustomDateTimePicker';
import { DebounceInput } from '../../components/DebounceInput';

export default class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      editOn: false,
      registerDDL: new Date(),
      title: "",
      timeStart: new Date(),
      timeEnd: new Date(),
      location: "",
      description: "",
      sizeLimit: Infinity
    }
    this._toggleEdit = this._toggleEdit.bind(this);
    this._save = this._save.bind(this);
    this._cancel = this._cancel.bind(this);
  }

  _toggleEdit(){
    if(this.state.editOn){ //in edit mode, needs to save
      this._save();
    }
    this.setState(prev => ({
      editOn: !prev.editOn
    }));
  }

  _save(){

  }

  _cancel(){
    this.setState({
      editOn: false
    });
  }

  render() {
    const { state } = this.props.navigation;
    let { user } = this.props.screenProps.token;
    const event = state.params.event;
    let txt = 'Join';
    for(let i=0; i<event.participants.length; ++i){
      if(event.participants[i] === this.props.screenProps.token.user.username){
        txt = 'Quit';
        break;
      }
    }
    if (moment(event.time.end).isBefore(moment())){
      txt = 'Event is Ended';
    }else if(moment(event.registerDDL).isBefore(moment())){
      txt = 'Registration Closed';
    }

    let btn = (
      <Button block dark={(txt === 'Registration Closed') ? true: false} light={(txt === 'Event is Ended') ? true : false} success={(txt === 'Join') ? true : false} danger={(txt === 'Quit') ? true : false}>
        <Text>{txt}</Text>
      </Button>
    );

    let editBtn = (event.initiator === user.username) ? (
      !this.state.editOn ? (
        <Button transparent onPress={() => this._toggleEdit()}>
          <Text>Edit</Text>
        </Button>
      ) : (
          <Button transparent onPress={() => this._toggleEdit()}>
            <Text>Done</Text>
          </Button>
      )
    ) : null;

    let leftBtn = (this.state.editOn ? (
      <Button transparent onPress={() => this._cancel()}>
        <Text>Cancel</Text>
      </Button>
    ) : (
      <Button transparent onPress={() => this.props.navigation.goBack(null)}>
        <Icon name='arrow-back' style={{ marginRight: 0 }} />
        <Text>Home</Text>
      </Button>
    ));

    return (
      <Container>
        <Header>
          <Left>
            {leftBtn}
          </Left>
          <Body>
            <Title>Event Details</Title>
          </Body>
          <Right>
            {editBtn}
          </Right>
        </Header>
        <Content>
          {txt !== 'Event is Ended' ? (
            !this.state.editOn ? (
              <View style={{ backgroundColor: 'red', paddingVertical: 10 }}>
                <Body>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    Deadline to register: {event.registerDDL}
                  </Text>
                </Body>
              </View>
            ): (
                <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                  <Body>
                    <Text style={{ fontWeight: 'bold', color: 'red' }}>
                      Deadline to register:
                    </Text>
                    <Item>
                      <CustomDateTimePicker
                        number={1}
                        fontSize={Number(18)}
                        date={moment(event.registerDDL).format("ddd, DD MMM")}
                        time={moment(event.registerDDL).format("HH:mm")}
                        onDateSelected={(date, year, time) => {
                          this.setState({ timeStart: date + ' ' + year + ' ' + time })
                        }}
                        maximumDate={event.time.start}
                      />
                    </Item>
                  </Body>
                </View>
            )
          ) : null}
          <Card>
            <CardItem>
              <Body style={{ flexDirection: "row" }}>
                {!this.state.editOn ? (
                  <Text style={{ alignItems: 'center', justifyContent: "center", textAlign: 'center', fontSize: 20 }}>
                    {event.title}
                  </Text>
                ) : (
                  <Item>
                    <DebounceInput defaultValue={event.title} onChangeText={(input) => this.setState({ title: input})} />
                  </Item>
                )}
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body style={{flexDirection: "row", alignItems: 'center'}}>
                <Icon style={{ fontSize: 60 }}name='clock' />
                <View style={{justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginHorizontal: 18}}>
                      From:
                    </Text>
                    {!this.state.editOn ? (
                      <Text>{event.time.start.replace(/\d{4}/, "")}</Text>
                    ) : (
                        <Item>
                          <CustomDateTimePicker
                            number={2}
                            fontSize={Number(18)}
                            date={moment(event.time.start).format("ddd, DD MMM")}
                            time={moment(event.time.start).format("HH:mm")}
                            onDateSelected={(date, year, time) => {
                              this.setState({ timeStart: date + ' ' + year + ' ' + time })
                            }}
                            minimumDate={event.time.start}
                          />
                        </Item>
                    )}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginLeft:38, marginRight: 18}}>
                      To:
                    </Text>
                    {!this.state.editOn ? (
                      <Text>{event.time.end.replace(/\d{4}/, "")}</Text>
                    ) : (
                        <Item>
                          <CustomDateTimePicker
                            number={2}
                            fontSize={Number(18)}
                            date={moment(event.time.end).format("ddd, DD MMM")}
                            time={moment(event.time.end).format("HH:mm")}
                            onDateSelected={(date, year, time) => {
                              this.setState({ timeEnd: date + ' ' + year + ' ' + time })
                            }}
                            minimumDate={event.time.start}
                          />
                        </Item>
                      )}
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body style={{flexDirection: "row", alignItems: 'center'}}>
                <Icon name='navigate' style={{ fontSize: 60}}/>
                {!this.state.editOn ? (
                  <Text style={{ marginLeft: 15, width: 280 }}>
                    {event.location.name}
                  </Text>
                ) : (
                  <Item>
                    <DebounceInput defaultValue={event.location.name} onChangeText={(input) => this.setState({ location: input })} />
                  </Item>
                )}
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text style={{color: 'black'}}>Description</Text>
            </CardItem>
            <CardItem>
              <Body>
                {!this.state.editOn ? (
                  <Text>{event.description}</Text>
                ) : (
                    <Item>
                      <DebounceInput multiline defaultValue={event.description} onChangeText={(input) => this.setState({ description: input })} />
                    </Item>
                )}
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Icon name='people' style={{ fontSize: 35 }}/>
              <Text style={{marginLeft: 3}}>({event.participants.length} / {event.sizeLimit})</Text>
            </CardItem>
            <CardItem>
              <Body style={{flexDirection: 'row'}}>
                {event.participants.map((participant, key) => {
                  return (
                    <Thumbnail key={key} source={{ uri: `https://ui-avatars.com/api/?name=${participant}`}}/>
                  );
                })}
              </Body>
            </CardItem>
          </Card>
          {btn}
        </Content>
      </Container>
    )
  }
}