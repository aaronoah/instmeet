import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class CustomModal extends Component {
  constructor(props){
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      modalVisible: this.props.visible,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>{this.props.content}</Text>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Okay</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>
        {/* <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}