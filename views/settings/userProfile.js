import React, { Component } from 'react';
import { StyleSheet, View, Image, ViewPagerAndroid, ScrollView } from 'react-native';
import { Icon, Container, Header, List, Button, ListItem, Text, Body, Item, 
       Title, Subtitle, Left, Right, Content, Form, Input } from 'native-base';

export default class userProfile extends Component {

  constructor(props){
    super(props);
    this.state ={
      toggle: false
    };
    this.toggleState.bind(this);//bind the function to the class
  };

  static navigationOptions = ({navigation}) => ({
  });


  toggleState(toggle) {
    this.setState({toggle:toggle}); // force a rerender
  }


  render(){
    
    function viewSwitch(){
      const a = "";
      if(!this.state.toggle){
       let a = (
        <View>
        <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon name='arrow-back' />
          </Button>
          </Left>
          <Body></Body>
          <Right>
          <Button transparent edit onPress={()=> this.toggleState(true)}>
            <Text>Edit</Text>
          </Button>
          </Right>
      </Header>
          <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image square size={80} source={require('../../images/Yuqi.png')} style={{ width: 92, height: 92, marginLeft: 142 }} />
        <Text style={{ fontSize: 24, marginTop: 10, marginLeft: 160 }}>test ♀</Text>
        <ListItem style={{ backgroundColor: '#E9E9E9', marginTop: 45, marginLeft: 0, width: 375, height: 45 }}>
          <Icon name="ios-school" style={{ marginLeft: 5 }} />
          <Text style={{ marginLeft: 15 }}>Major: Computer Science</Text>
        </ListItem>
        <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
          <Icon name="ios-call" style={{ marginLeft: 5 }} />
          <Text style={{ marginLeft: 15 }}>Phone: (612)123-0000</Text>
        </ListItem>
        <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
          <Icon name="md-calendar" style={{ marginLeft: 5 }} />
          <Text style={{ marginLeft: 15 }}>Birthday: 1994-05-10 </Text>
        </ListItem>
        <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
          <Icon name="logo-dribbble" style={{ marginLeft: 5 }} />
          <Text style={{ marginLeft: 15 }}>Interests: </Text>
          <Button rounded style={{ backgroundColor: '#D58C8C', width: 80, height: 23, marginLeft: 5 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Hiking</Text>
          </Button>
        </ListItem>
        <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
          <Icon name="md-clipboard" style={{ marginLeft: 5 }} />
          <Text style={{ marginLeft: 15 }}>Credit Score: 100 </Text>
        </ListItem>
      </ScrollView>
      </View>
       );
       return a;
      }else{
       let a = (
        <View>
          <Header>
           <Left>
           <Button transparent edit onPress={() => this.props.navigation.goBack(null)}>
             <Text>Cancle</Text>
           </Button>
           </Left>
          <Body></Body>
          <Right>
          <Button transparent edit onPress={() => this.props.navigation.goBack(null)}>
            <Text>Done</Text>
          </Button>
          </Right>
         </Header>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image square size={80} source={require('../../images/Yuqi.png')} style={{ width: 92, height: 92, marginLeft: 142 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 35 }}>
            <Item last style={{ flex: 0.6, marginLeft: 100 }}>
              <Input placeholder="test" />
            </Item>
        </View>
        <View>
           <ListItem style={{ backgroundColor: '#E9E9E9', marginTop: 45, marginLeft: 0, width: 375, height: 45 }}>
             <Icon name="ios-school" style={{ marginLeft: 5 }} />
             <Text style={{ marginLeft: 15 }}>Major:</Text>
             <Item last style={{ flex: 0.8, marginLeft: 40 }}>
              <Input placeholder="Computer Science" />
            </Item>
           </ListItem>
        </View>
        <View>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="ios-call" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Phone: </Text>
            <Item last style={{ flex: 0.8, marginLeft: 40 }}>
              <Input placeholder="(612)123-0000" />
            </Item>
          </ListItem>
        </View>
        <View>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="md-calendar" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Birthday: </Text>
            <Item last style={{ flex: 0.8, marginLeft: 40 }}>
              <Input placeholder="1994-05-10" />
            </Item>
          </ListItem>
        </View>
        <View>
          <ListItem style={{ backgroundColor: '#FFFFFF', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="logo-dribbble" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Interests: </Text>
              <Button rounded style={{ backgroundColor: '#D58C8C', width: 80, height: 23, marginLeft: 5 }}>
                <Item last style={{ flex: 0.2, marginLeft: 18 }}>
                 <Input placeholder="Hiking" />
               </Item>
              </Button>
          </ListItem>
        </View>
        <View>
          <ListItem style={{ backgroundColor: '#E9E9E9', marginLeft: 0, width: 375, height: 45 }}>
            <Icon name="md-clipboard" style={{ marginLeft: 5 }} />
            <Text style={{ marginLeft: 15 }}>Credit Score: 100 </Text>
          </ListItem> 
        </View>
      </ScrollView>
        </View>

       );

       return a;
      }

      
    }

    return (
      <View style={{
        backgroundColor: 'white',
        height: 604,
        flex: 1,
        flexDirection: 'column'
      }}>
      {viewSwitch.bind(this)()}
     </View> 
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});