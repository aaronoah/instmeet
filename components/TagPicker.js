import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Badge, Icon } from 'native-base';

export default class TagPicker extends React.Component{
  constructor(props){
    super(props);
    this._addTags = this._addTags.bind(this);
    this._removeTags = this._removeTags.bind(this);
    this._onConfirmRemoveTags = this._onConfirmRemoveTags.bind(this);
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
    Alert.alert(
      'Remove tags',
      `Are you sure to remove tag ${text}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this._onConfirmRemoveTags(text) },
      ],
      { cancelable: false }
    )
  }

  _onConfirmRemoveTags(text){
    let index = this.state.badges.indexOf(text);
    this.setState(prev => {
      badges: prev.badges.splice(index, 1)
    });
    this.setState({
      modalVisible: true
    });
  }

  render(){
    const navigator = this.props;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {(this.state.badges !== undefined && this.state.badges.length > 0) ? this.state.badges.map((badge, key) => {
          return (
            <Badge key={key} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: badge.color }}>
              <Text style={{ color: 'white', lineHeight: 15, fontSize: 15 }}>{badge.text}</Text>
              {(this.props.permitEdit) ? (
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => this._removeTags(badge.text)}>
                  <Icon style={{ fontSize: 20 }} name="backspace" />
                </TouchableOpacity>
              ): null}
            </Badge>
          )
        }) : undefined}
        {(this.props.permitEdit) ? (
          <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => this.props.navigation.navigate('SearchTag')} >
            <Icon style={{ fontSize: 30 }} name="add" />
          </TouchableOpacity>
        ) : null}
      </View >
    );
  }
};