import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, Tab, Tabs, Left, Right, Title } from 'native-base';

const TabContent = () => {
  return (
    <Content>
      {this.props.card.filter(card => {this.props.filter === card.type}).map((element, key) => {
        return (
          <Card key={key} style={{ backgroundColor: element.color }}>
            <CardItem bordered header style={{ backgroundColor: element.color, marginVertical: 0 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>{element.title}</Text>
            </CardItem>
            <CardItem button onPress={() => this.props.navigation.navigate('Event', { event: element })} style={{ backgroundColor: element.color }}>
              <Body style={{ flexDirection: 'row' }}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="time" style={styles.icon} />
                    <Text style={styles.bodyText}>{element.time.start} - {element.time.end}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="pin" style={styles.icon} />
                    <Text style={styles.bodyText}>{element.location}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="people" style={styles.icon} />
                    <Text style={styles.bodyText}>{element.groupSize}</Text>
                  </View>
                </View>
                <View>
                  <Image style={{ width: 100, height: 100 }} source={findImg(element.thumbnail)} />
                </View>
              </Body>
            </CardItem>
            <CardItem footer style={{ backgroundColor: element.color }}>
              <Text>Tags: </Text>
              {element.tags.map((tag, k) => {
                return (
                  <Badge key={k} style={{ backgroundColor: 'white' }}>
                    <Text style={{ color: 'gray' }}>{tag}</Text>
                  </Badge>
                );
              })}
            </CardItem>
          </Card>
        );
      })}
    </Content>
  );
}

export default class MyEvents extends Component {

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
              <Text>Home</Text>
            </Button>
          </Left>
          <Body>
            <Title>My Events</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Tabs initialPage={1}>
          <Tab heading="All">
            <TabContent filter="all" />
          </Tab>
          <Tab heading="Initiated">
            <TabContent filter="initiated" />
          </Tab>
          <Tab heading="Joined">
            <TabContent filter="joined" />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}