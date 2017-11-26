import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, List, ListItem, Thumbnail, Text, Body, document, Item, Input } from 'native-base';


export default class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
      toggle: false,
      content: this.Event()
    };
    //bind the function to the class
    this.toggleState = this.toggleState.bind(this);
    this.getResult = this.getResult.bind(this);
    // this.renderHeader = this.renderHeader.bind(this);
  };

  static navigationOptions = ({navigation}) => ({
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="search" style={{fontSize: 30, color: tintColor}} />
    }
  });

  // componentWillMount(){
  //   const {setParams} = this.props.navigation;
  //   setParams({header: this.props.header});
  // }

  componentWillReceiveProps() {
    if (!this.props.navigation.state.params) {
      this.props.navigation.setParams({header: this.renderHeader});
    }
  }

  toggleState(toggle){
    this._textInput.setNativeProps({text: ""});
    if (toggle) {
      var ContentUser = 
      <Text></Text>
      this.setState({content: ContentUser, toggle: toggle});
    } else {
      // force a rerender
      this.setState({content: this.Event(), toggle: toggle});
    }
  }

  // renderHeader(){
  //   return (
  //     <Header searchBar rounded>
  //     <Item>
  //       <Icon name="ios-search" />
  //       <Input  
  //       placeholder="Search"
  //       style={{height: 40, flex: 1}}
  //       onChangeText={(text) => {
  //         this.state.text = text;
  //         this.getResult();
  //       }} 
  //       maxLength={30} />
  //     </Item>
  //   </Header>
  //   );
  // }

  Event() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View>
          <Text style={{ color: '#D0021B', fontSize: 30, fontWeight: 'bold', marginLeft: 27 }}>Hot🔥</Text>
        </View>
        <View>
          <Button rounded style={{ backgroundColor: '#4FADF9', marginLeft: 27, marginTop: 15 }}>
            <Text style={{ color: '#FFFFFF' }}>Swimming</Text>
          </Button>
          <Button rounded style={{ backgroundColor: '#FBAD3D', marginLeft: 27, marginTop: 15 }}>
            <Text style={{ color: '#FFFFFF' }}>Cooking</Text>
          </Button>
        </View>
        <View>
          <Button rounded style={{ backgroundColor: '#EC3D40', marginLeft: 27, marginTop: 15 }}>
            <Text style={{ color: '#FFFFFF' }}>Club</Text>
          </Button>
          <Button rounded style={{ backgroundColor: '#D58C8C', marginLeft: 27, marginTop: 15 }}>
            <Text style={{ color: '#FFFFFF' }}>Hiking</Text>
          </Button>
        </View>
        <View>
          <Button rounded style={{ backgroundColor: '#A3AFEF', marginLeft: 27, marginTop: 15 }}>
            <Text style={{ color: '#FFFFFF' }}>Others</Text>
          </Button>
        </View>
      </View>
    );
  }

  getResult() {
    this.state.text
    if (!this.state.toggle) {
      if (text == 'swimming' || text == 'Swimming') {
        var Swim = <Text>Swimming</Text>;
        this.setState({content: Swim});
      }
      else if (text == 'club' || text == 'Club') {
        var Club = <Text>Club</Text>;
        this.setState({content: Club});
      }
      else if (text == 'cooking' || text == 'Cooking') {
        var Cook = <Text>Cook</Text>;
        this.setState({content: Cook});
      }
      else {
        var Empty = <Text></Text>;
        this.setState({content: Empty});
      }
    }
    else {
      if (text == 'Kumat Pratik') {
        var Kumat = 
        <List>
          <ListItem>
            <Thumbnail square size={80} source={require('../images/Kumat.png')} />
            <Body>
               <Text style={{flex: 0.3}}>Kumat Pratik</Text>
               <Text note style={{flex: 0.3}}>Follow my nose</Text>
            </Body>
            <TouchableOpacity>
               <Text style={{flex: 0.3, color: '#3F51B5'}}>Follow</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem>
            <Thumbnail square size={80} source={require('../images/Kumat_1.png')} />
            <Body>
               <Text style={{flex: 0.3}}>Kumat Pratik</Text>
               <Text note style={{flex: 0.3}}>Nice to meet you</Text>
            </Body>
            <TouchableOpacity>
               <Text style={{flex: 0.3, color: '#3F51B5'}}>Follow</Text>
            </TouchableOpacity>
          </ListItem>
        </List>;
        this.setState({content: Kumat});
      } else {
        var Empty = <Text></Text>;
        this.setState({content: Empty});
      }
    }
  }

render(){
  return (
    <Header searchBar rounded>
    <Item>
      <Icon name="ios-search" />
      <Input  
      placeholder="Search"
      style={{height: 40, flex: 1}}
      onChangeText={(text) => {
        this.state.text = text;
        this.getResult();
      }} 
      maxLength={30} />
    </Item>
  <View style={{backgroundColor: 'white', height: 667}}>
    {/* <View searchBar> */}
    {/* </View> */}
    <Segment style= {{backgroundColor: 'white'}}>
       <Button first inactive style={[styles.buttoninactive, 
        this.state.toggle && styles.buttonactive]} 
        onPress={()=> this.toggleState(true)}>
          <Text style={[styles.textinactive, 
            this.state.toggle && styles.textactive]}>User</Text>
       </Button>
       <Button last active style={[styles.buttonactive, 
        this.state.toggle && styles.buttoninactive]} 
        onPress={()=> this.toggleState(false)}>
           <Text style={[styles.textactive, 
            this.state.toggle && styles.textinactive]}>Event</Text>
       </Button>
    </Segment>
       {this.state.content}
  </View>
  </Header>
    )
  }
}

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
  textactive:{
    color:'#FFFFFF'
  },
  buttoninactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000'
  },
  textinactive: {
    color: '#000000'
  }
});