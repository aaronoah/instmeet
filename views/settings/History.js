import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Container, Form, Item, Content, Card, CardItem, Input, List, ListItem, Picker, 
        Icon, Button, Header, Left, Right, Body, Title, Badge } from 'native-base';
import { passEvent } from '../../data/passEvent';
import { events } from '../../data/events';
import { users } from '../../data/users';
export default class History extends React.Component {

  constructor(props){
    super(props);
    // this.findPass = this.findPass.bind(this);
    this.state = {
      sort: "",
      selected3: "key3",
      // pass: []
    };
  }

  static navigationOptions = {
  };

  onValueChange3(value) {
    this.setState({
      selected3: value
    });
  }

  // findPass(){
  //   let p = users.array[0].events.past; 
  //   for(let id of p){
  //     for(let e of events.array){
  //       if (id === e.id) {
  //         this.setState(prev => {
  //           pass: [prev.pass, ...e.id]
  //         });
  //       }
  //     }
  //   }
  //   return;
  // }

  // componentDidMount(){
  //   this.findPass();
  // }

  render(){
    function findImg(name){
      switch(name){
        case 'swim': return require('../../images/swim.png');
        case 'cook': return require('../../images/cook.png');
        case 'club': return require('../../images/club.png');
        case 'rock': return require('../../images/music.png');
      }
    }
    
  return(
    <Container>
    <Header>
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
          <Icon name='arrow-back' />
        </Button>
        </Left>
        <Body>
          <Title>History</Title>
        </Body>
        <Right></Right>
    </Header>

    <List>
      <ListItem itemHeader first style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Button bordered style={{ height: 30 }} >
            <Text style={{ paddingHorizontal: 15}}>Total: {users.array[0].events.past.length}</Text>
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

History.defaultProps = {
  card: passEvent.array
}