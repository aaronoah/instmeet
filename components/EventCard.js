import React, {Component} from 'react';
import { Card, CardItem, Body, Icon, Badge } from 'native-base';
import { View, Image, Text, StyleSheet } from 'react-native';

export const EventCard = (props) => ({
  render(){

    /**
     * find image path according to its name
     * @param name string - image name
     * @return object
    */
    function findImg(name) {
      switch (name) {
        case 'swim': return require('../images/swim.png');
        case 'cook': return require('../images/cook.png');
        case 'club': return require('../images/club.png');
        case 'rock': return require('../images/music.png');
        case 'games': return require("../images/xbox.png");

      }
    }

    const { item } = props;
    return (
      <Card style={{ backgroundColor: item.color }}>
        <CardItem header style={{ backgroundColor: item.color, marginVertical: 0 }}>
          <Text style={{ fontSize: 16, color: 'black' }}>{item.title}</Text>
        </CardItem>
        <CardItem button onPress={() => props.onPress()} style={{ backgroundColor: item.color }}>
          <Body style={{ flexDirection: 'row' }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="time" style={styles.icon} />
                <Text style={styles.bodyText}>{item.time.start} - {item.time.end}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="pin" style={styles.icon} />
                <Text style={styles.bodyText}>{item.location.name}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="people" style={styles.icon} />
                <Text style={styles.bodyText}>{item.groupSize}</Text>
              </View>
            </View>
            <View>
              <Image style={{ width: 100, height: 100 }} source={findImg(item.thumbnail)} />
            </View>
          </Body>
        </CardItem>
        <CardItem footer style={{ backgroundColor: item.color }}>
          <Text>Tags: </Text>
          {item.tags.map((tag, k) => {
            return (
              <Badge key={k} style={{ backgroundColor: 'white' }}>
                <Text style={{ color: 'gray' }}>{tag}</Text>
              </Badge>
            );
          })}
        </CardItem>
      </Card>
    );
  }
});

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    margin: 3
  },
  bodyText: {
    margin: 3,
    fontSize: 14,
    width: 190
  }
});