import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Container, Icon, Content, Card, CardItem, Body, Text, Button, Badge, List, ListItem, Picker, Item, Form } from 'native-base';
import { events } from '../data/events';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sort: "",
      selected3: "key3"
    };
  }

  static navigationOptions = {
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ fontSize: 30, color: tintColor }} />
    )
  };

  onValueChange3(value) {
    this.setState({
      selected3: value
    });
  }

  render(){
    /**
     * find image path according to its name
     * @param name string - image name
     * @return object
    */
    function findImg(name){
      switch(name){
        case 'swim': return require('../images/swim.png');
        case 'cook': return require('../images/cook.png');
        case 'club': return require('../images/club.png');
      }
    }

    navigator.geolocation.getCurrentPosition((success, error, options) => {

    });
    return (
      <Container>
        <List>
          <ListItem itemHeader first style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text>My Events: </Text>
              <Button bordered style={{ height: 30 }} onPress={() => this.props.navigation.navigate('MyEvents')}>
                <Text>16</Text>
              </Button>
            </View>
            <Form>
              <Button bordered style={{height: 30}}>
                <Picker
                  mode="dropdown"
                  iosHeader="Your Header"
                  selectedValue={this.state.selected3}
                  onValueChange={this.onValueChange3.bind(this)}
                >
                  <Item label="Sort by time" value="key0" />
                  <Item label="Sort by location" value="key1" />
                  <Item label="Sort by distance" value="key2" />
                  <Item label="Sort by group size" value="key3" />
                </Picker>
              </Button>
            </Form>
          </ListItem>
        </List>
        <Content>
          {this.props.card.map((element, key) => {
            return (
              <Card key={key} style={{ backgroundColor: element.color }}>
                <CardItem bordered header style={{ backgroundColor: element.color, marginVertical: 0 }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>{element.title}</Text>
                </CardItem>
                <CardItem button onPress={() => this.props.navigation.navigate('Event', {event: element})} style={{ backgroundColor: element.color }}>
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    margin: 3
  },
  bodyText: {
    margin: 3,
    fontSize: 14,
    width: 190
  }
});

Home.defaultProps = {
  card: events.array
}

export default Home;