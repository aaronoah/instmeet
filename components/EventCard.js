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
        case 'swim': return require('../images/swimmer-landing.jpg');
        case 'cook': return require('../images/cooking.jpg');
        case 'club': return require('../images/club.jpg');
        case 'rock': return require('../images/music-4.jpg');
        case 'games': return require("../images/video-games.jpg");
        case 'hiking': return require('../images/hiking.jpg');
        case 'football': return require('../images/football.jpg');
        case 'yoga': return require('../images/yoga.jpg');
        case 'frisbee': return require('../images/frisbee.jpg');
        case 'golf': return require('../images/golf.jpg');
        case 'gym': return require('../images/gym.png');
        case 'skiing': return require('../images/skiing.jpg');
        case 'singing': return require('../images/singing.jpg');
        case 'painting': return require('../images/painting.jpg');
        case 'piano': return require('../images/piano.jpg');
        case 'photography': return require('../images/photography.jpg');
        case 'biking': return require('../images/biking.jpg');
        case 'coding': return require('../images/coding.jpeg')
        default: return require('../images/events.png');
      }
    }

    /**
     * hex value to decimal value
     * @param hex string - hex string
    */
    function hexToDec(hex) {
      var result = 0, digitValue;
      hex = hex.toLowerCase();
      for (var i = 0; i < hex.length; i++) {
        digitValue = '0123456789abcdef'.indexOf(hex[i]);
        result = result * 16 + digitValue;
      }
      return result;
    }

    const { item } = props;
    let txtColor;
    if(item.color.startsWith('#')){
      let sum = hexToDec(item.color.substring(1,3)) + hexToDec(item.color.substring(3,5)) + hexToDec(item.color.substring(5,7));
      if(sum /3 > 128){
        txtColor = 'black';
      }
    }

    return (
      <Card style={{ backgroundColor: 'transparent' }}>
        <CardItem header onPress={() => props.onPress()} style={{ backgroundColor: item.color, marginVertical: 0 }}>
          <Text style={{ fontSize: 16, color: txtColor }}>{item.title}</Text>
        </CardItem>
        <CardItem cardBody button onPress={() => props.onPress()} style={{ backgroundColor: 'transparent'}}>
          <Body style={{ flexDirection: 'row' }}>
            <Image style={{ resizeMode: 'cover', width: '100%', height: '100%', backgroundColor: 'transparent' }} source={findImg(item.thumbnail)}>
              <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                  <Icon name="time" style={styles.icon} />
                  <Text style={styles.bodyText}>{item.time.start} - {item.time.end}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                  <Icon name="pin" style={styles.icon} />
                  <Text style={styles.bodyText}>{item.location.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                  <Icon name="people" style={styles.icon} />
                  <Text style={styles.bodyText}>{item.groupSize}</Text>
                </View>
              </View>
            </Image>
          </Body>
        </CardItem>
        <CardItem footer style={{ backgroundColor: 'white' }}>
          <Text>Tags: </Text>
          {item.tags.map((tag, k) => {
            return (
              <Badge key={k} style={{ backgroundColor: item.color }}>
                <Text style={{ color: txtColor }}>{tag}</Text>
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
    margin: 3,
    color: 'white'
  },
  bodyText: {
    margin: 3,
    fontSize: 14,
    width: 190,
    color: 'white'
  }
});