import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation, Vibration } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, Badge, List, ListItem, Thumbnail, Text, Body, document, Item, Input, Card, CardItem } from 'native-base';

export default class Searchtag extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            text: '',
            InterestsList: ['swimming', 'club', 'cooking', 'games', 'rock']
          };
    }

    static navigationOptions = ({navigation}) => ({});

    render () {
        return (
            <View></View>
        );
    }
}