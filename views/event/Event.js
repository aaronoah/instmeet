import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Button, Text, Body, Left, Right, Title, Card, CardItem } from 'native-base';

export default class Event extends Component {
  constructor(props){
    super(props);

  }

  render() {
    const { state } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
              <Text>Home</Text>
            </Button>
          </Left>
          <Body>
            <Title>Event Details</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Icon name='clock' />
                <Text>
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Icon name='navigate' />
                <Text>
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Description</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Group swimming and auatic exercise programme
for college students: Freestyle, front/back craw,
breast stroke, butterfly… </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Icon name='people' />
              <Text>(23)</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text></Text>
              </Body>
            </CardItem>
          </Card>
          <Button block success>
            <Text>Join</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}