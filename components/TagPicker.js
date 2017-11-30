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
      modalVisible: false
    };
  }

  _addTags() {

    if(this.props.onTagSelected !== undefined){
      this.props.onTagSelected(newTag);
    }
  }

  _removeTags(){
    this.setState({
      modalVisible: true
    });
  }

  render(){
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Badge style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'yellow' }}>
          <Text style={{ color: 'gray', lineHeight: 15, fontSize: 15 }}>cooking</Text>
          <TouchableOpacity style={{marginLeft: 5}} onPress={() => this._removeTags}>
            <Icon style={{ fontSize: 20 }} name="backspace" />
          </TouchableOpacity>
        </Badge>
        <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => this._addTags} >
          <Icon style={{ fontSize: 30 }} name="add" />
        </TouchableOpacity>
        <CustomModal content="Are you sure you want to remove the tag?" visible={this.state.modalVisible} />
      </View >
    );
  }
};