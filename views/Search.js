import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation, Vibration } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, Badge, List, ListItem, Thumbnail, Text, Body, document, Item, Input, Card, CardItem } from 'native-base';
import events from '../data/events';
import { EventCard } from '../components/EventCard';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      text: '',
      InterestsList: ['swimming', 'club', 'cooking', 'games']
    };
    //bind the function to the class
    // this.getResult = this.getResult.bind(this);
  };

  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="search" style={{ fontSize: 30, color: tintColor }} />
    }
  });

  // componentWillMount(){
  //   const {setParams} = this.props.navigation;
  //   setParams({header: this.props.header});
  // }

  componentWillReceiveProps() {
    if (!this.props.navigation.state.params) {
      this.props.navigation.setParams({ header: this.renderHeader });
    }
  }

  contains(array, text) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == text) {
        return true;
      }
    }
    return false;
  }

  // getResult (){
  //   var content1 =
  //   this.setState({content:content1});
  // }

// findImg(name){
//     switch(name){
//       case 'swim': return require('../images/swim.png');
//       case 'cook': return require('../images/cook.png');
//       case 'club': return require('../images/club.png');
//       case 'rock': return require('../images/music.png');
//       case 'games': return require("../images/xbox.png");
//     }
//   }

  Noresult() {
    if (this.state.text == '') {
      var content1 = '';
      this.setState({content: content1});
    } else if (!this.contains(this.state.InterestsList, this.state.text)){
      var constent1= <View></View>;
      this.setState({content: content1});
    }
  }


  getResult(key, element) {
    var content1 = (
      <EventCard item={element} onPress={() => this.props.navigation.navigate('Event', { event: element })} />
    );
     this.setState({content: content1});
   }

  render() {
    let hotTags = (
      <View style={{ marginTop: 100 }}>
        <View>
          <Text style={{ color: '#D0021B', fontSize: 30, fontWeight: 'bold', marginLeft: 27 }}>Hot🔥</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View>
            <Button rounded style={{ backgroundColor: '#4FADF9', marginLeft: 27, marginTop: 15 }} onPress={()=>{this.props.card.map((element, key) => {
                  if (this.contains(element.tags, "swimming")){
                this.getResult(key, element);
              }
              this.setState({text: "swimming"});
              })}}>
              <Text style={{ color: '#FFFFFF' }}>Swimming</Text>
            </Button>
            <Button rounded style={{ backgroundColor: '#FBAD3D', marginLeft: 27, marginTop: 15 }} onPress={()=>{this.props.card.map((element, key) => {
                  if (this.contains(element.tags, "cooking")){
                this.getResult(key, element);
              }
            this.setState({text: "cooking"});
              })}}>
              <Text style={{ color: '#FFFFFF' }}>Cooking</Text>
            </Button>
          </View>
          <View>
            <Button rounded style={{ backgroundColor: '#EC3D40', marginLeft: 27, marginTop: 15 }} onPress={()=>{this.props.card.map((element, key) => {
                  if (this.contains(element.tags, "club")){
                this.getResult(key, element);
              }
            this.setState({text: "club"});
              })}}>
              <Text style={{ color: '#FFFFFF' }}>Club</Text>
            </Button>
            <Button rounded style={{ backgroundColor: '#D58C8C', marginLeft: 27, marginTop: 15 }} onPress={()=>{this.props.card.map((element, key) => {
                  if (this.contains(element.tags, "hiking")){
                this.getResult(key, element);
              } else {this.setState({content:<View></View>})}
              this.setState({text: "hiking"});
              })}}>
              <Text style={{ color: '#FFFFFF' }}>Hiking</Text>
            </Button>
          </View>
          <View>
            <Button rounded style={{ backgroundColor: '#A3AFEF', marginLeft: 27, marginTop: 15 }} onPress={()=>{this.props.card.map((element, key) => {
                  if (this.contains(element.tags, "others")){
                this.getResult(key, element);
              }
              else {this.setState({content:<View></View>})
            }
              this.setState({text: "others"});
              })}}>
              <Text style={{ color: '#FFFFFF' }}>Others</Text>
            </Button>
          </View>
        </View>
      </View>
    );

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search user/event"
              style={{ height: 40, flex: 1 }}
              onChangeText={(text) => {
                this.state.text = text;
                this.props.card.map((element, key) => {
                  if (this.contains(element.tags, this.state.text)){
                this.getResult(key, element);
              }
              else {
                this.Noresult();
              }
              })
              }}
              value={this.state.text}
              maxLength={30} />
          </Item>
        </Header>
        <Content>
          {this.state.content == '' ? hotTags : this.state.content}
        </Content>
      </Container>
    );
  }
}
//   getResult() {
//     var text = this.state.text;
//     if (text == 'swimming' || text == 'Swimming') {
//       var Swim =
//       this.setState({content: Swim});
//     }
//     else if (text == 'club' || text == 'Club') {
//       var Club = <Text>Club</Text>;
//       this.setState({content: Club});
//     }
//     else if (text == 'cooking' || text == 'Cooking') {
//       var Cook = <Text>Cook</Text>;
//       this.setState({content: Cook});
//     }
//     else {
//       var Empty = <Text></Text>;
//       this.setState({content: Empty});
//     }
//   }
// }


var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  buttonactive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  textactive: {
    color: '#FFFFFF'
  },
  buttoninactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000'
  },
  textinactive: {
    color: '#000000'
  },
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

Search.defaultProps = {
  card: events
}