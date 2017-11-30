import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Badge, Icon } from 'native-base';
import CustomModal from './CustomModal';

export default class TagPicker extends React.Component{
  constructor(props){
    super(props);
    this._addTags = this._addTags.bind(this);
    this._removeTags = this._removeTags.bind(this);
    this.state = {
      modalVisible: false,
      badges: (this.props.badges !== undefined) ? this.props.badges : []
    };
  }

  _addTags() {

    if(this.props.onTagSelected !== undefined){
      this.props.onTagSelected(newTag);
    }
  }

  _removeTags(text){
    let index = this.state.badges.indexOf(text);
    this.setState(prev => {
      badges: prev.badges.splice(index, 1)
    });
    this.setState({
      modalVisible: true
    });
  }

  render(){
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {(this.state.badges !== undefined) ? this.state.badges.map((badge, key) => {
          return (
            <Badge key={key} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: badge.color }}>
              <Text style={{ color: 'white', lineHeight: 15, fontSize: 15 }}>{badge.text}</Text>
              <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => this._removeTags(badge.text)}>
                <Icon style={{ fontSize: 20 }} name="backspace" />
              </TouchableOpacity>
            </Badge>
          )
        }) : undefined}
        <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => this._addTags} >
          <Icon style={{ fontSize: 30 }} name="add" />
        </TouchableOpacity>
        <CustomModal content="Are you sure you want to remove the tag?" visible={this.state.modalVisible} />
      </View >
    );
  }
};