import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Content, H2, Container, Header, Left, Body, Right, Title, Button } from 'native-base';
import interests from '../../data/interests.json';

class FillInfo extends React.Component{
  constructor(props){
    super(props);
    this.toggleChoice = this.toggleChoice.bind(this);
    this.saveInterests = this.saveInterests.bind(this);
    this.state = {
      choice: []
    };
  }

  toggleChoice(choice){
    let c = this.state.choice;
    let index = this.state.choice.indexOf(choice);
    if(index === -1){
      c.push(choice);
    }else{
      c.splice(index, 1);
    }

    this.setState({
      choice: c
    });
  }

  saveInterests(){
    let u = this.props.navigation.state.params.user;
    u.interests = this.state.choice;
    this.props.navigation.navigate('Main', {user: u});
  }

  render(){
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
              <Text style={{color: '#4fadf9'}}>Sign Up</Text>
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('Main', { user: this.props.navigation.state.params.user}) }>
              <Text style={{ color: '#4fadf9' }}>Skip</Text>
              <Icon name='arrow-forward' />
            </Button>
          </Right>
        </Header>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <Content contentContainerStyle={{}}>
          <H2 style={{ marginLeft: 67, marginTop: 40, marginBottom: 40 }}>Choose your Interests</H2>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {Object.keys(this.props.picker).map((val, key) => {
              return (
                <TouchableOpacity key={key} style={(this.state.choice.indexOf(val) !== -1) ? styles.selected : styles.unselected} onPress={() => this.toggleChoice(val)}>
                  <Text style={(this.state.choice.indexOf(val) !== -1) ? styles.selectedText : styles.unselectedText}>{val}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <Button bordered style={styles.nextBtn} onPress={() => this.saveInterests() }>
              <Text>Next</Text>
            </Button>
          </View>
        </Content>
        </ScrollView>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  nextBtn: {
    marginTop: 30,
    marginLeft: 250,
    marginBottom: 80,
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unselected: {
    flex: -1,
    marginLeft: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 90
  },
  unselectedText: {
    color: 'red',
    fontSize: 15
  },
  selected: {
    flex: -1,
    marginLeft: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    backgroundColor: 'red',
    borderRadius: 90
  },
  selectedText: {
    color: 'white',
    fontSize: 15
  }
});

let picker = {};
interests.forEach(ele => {
  picker[ele.text] = false
});

FillInfo.defaultProps = {
  picker: picker
};

export default FillInfo;