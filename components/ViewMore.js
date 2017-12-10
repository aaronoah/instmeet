import React, { Component } from 'react';
import { Animated, TouchableHighlight, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon, Thumbnail, Text } from 'native-base';

//api: thumbnail, title, note, icon, unread {boolean}

export default class ViewMore extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.markRead = this.markRead.bind(this);
    this.state = {
      expanded: false,
      animation: new Animated.Value(59),
      unread: this.props.unread ? this.props.unread : false
    }
  }

  markRead(){
    this.setState({
      unread: false
    });
  }

  toggle() {
    if(this.state.unread){
      this.markRead();
    }
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState(prev => ({
      expanded: !prev.expanded
    }));

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  render(){

    function findImg(name) {
      switch (name) {
        case 'swim': return require('../images/swim.png');
        case 'cook': return require('../images/cook.png');
        case 'club': return require('../images/club.png');
        case 'rock': return require('../images/music.png');
        case 'games': return require("../images/xbox.png");
      }
    }

    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <TouchableWithoutFeedback style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)} onPress={() => this.toggle()}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Thumbnail source={findImg(this.props.thumbnail)} />
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[styles.title, {fontWeight: (this.state.unread) ? 'bold' : 'normal'}]}>{this.props.title}</Text>
              <Text note style={[styles.title, {fontWeight: (this.state.unread) ? 'bold' : 'normal'}]}>{this.props.note}</Text>
            </View>
            {this.props.icon !== undefined ? (
              <TouchableHighlight
                onPress={() => this.toggle()}
                underlayColor="#f1f1f1">
                <Icon
                  style={styles.buttonImage}
                  name={this.props.icon}
                />
              </TouchableHighlight>
            ): null}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>

      </Animated.View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});