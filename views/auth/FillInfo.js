import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Content, H2, Button } from 'native-base';
import { interests } from '../../data/interests';

class FillInfo extends React.Component{
  constructor(props){
    super(props);
    this.toggleChoice = this.toggleChoice.bind(this);
    this.state = {
      choice: []
    };
  }

  static navigationOptions = {
  };

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

  render(){
    return (
      <Content contentContainerStyle={{}}>
        <H2 style={{marginLeft: 67, marginTop: 40, marginBottom: 40}}>Choose your Interests</H2>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {Object.keys(this.props.picker).map((val, key) => {
            return (
              <TouchableOpacity key={key} style={(this.state.choice.indexOf(val) !== -1) ? styles.selected : styles.unselected} onPress={() => this.toggleChoice(val)}>
                <Text style={(this.state.choice.indexOf(val) !== -1) ? styles.selectedText : styles.unselectedText}>{val}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <Button bordered style={styles.nextBtn} onPress={() => this.props.navigation.navigate('Main')}>
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
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
interests.array.forEach(ele => {
  picker[ele] = false
});

FillInfo.defaultProps = {
  picker: picker
};

export default FillInfo;