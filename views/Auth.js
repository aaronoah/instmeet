import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Left, Right, Body, Title } from 'native-base';

export default class Auth extends React.Component{
  render() {
    return (
        <Header>
          <Left />
          <Body>
            <Title>InstMeet</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}