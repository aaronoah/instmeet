import React, {Component} from 'react';
import {StyleSheet, View, Image, ViewPagerAndroid, ScrollView} from 'react-native';
import { Icon, Container, Header, List, Button, ListItem, Text, Body, Item, Title, Subtitle, Left, Right, Content, Form, Input, Badge, Thumbnail } from 'native-base';
import TagPicker from '../../components/TagPicker';
import interests from '../../data/interests.json';

export default class userProfile extends Component {
  constructor(props) {
    super(props);
    let { user } = this.props.screenProps.token;
    this.state = {
      toggle: false,
      usernameOld: user.username,
      genderOld: user.gender,
      majorOld: user.major,
      phoneOld: user.phone,
      birthdayOld: user.birthday,
      interestsOld: [],
      usernameNow: "",
      genderNow: "",
      majorNow: "",
      phoneNow: "",
      birthdayNow: "",
      interestsNow: "",
      credit: user.credit
    };
    this._fetchInterests = this._fetchInterests.bind(this);
    this._saveProfile = this._saveProfile.bind(this);
    this.toggleState.bind(this); //bind the function to the class
  }

  static navigationOptions = ({navigation}) => ({});

  _fetchInterests(){
    let res = [];
    const len = interests.length;
    const userInterests = this.props.screenProps.token.user.interests;
    for(let i=0; i<len; ++i){
      for(let j=0; j<userInterests.length; ++j){
        if (interests[i].text === userInterests[j]){
          res.push(interests[i]);
        }
      }
    }
    return res;
  }

  componentDidMount(){
    let { user } = this.props.screenProps.token;
    this.setState({
      usernameOld: user.username,
      genderOld: user.gender,
      majorOld: user.major,
      phoneOld: user.phone,
      birthdayOld: user.birthday,
      interestsOld: this._fetchInterests()
    });
  }

  toggleState(toggle) {
    this.setState({
      usernameNow: this.state.usernameOld,
      genderNow: this.state.usernameOld,
      majorNow: this.state.majorOld,
      phoneNow: this.state.phoneOld,
      birthdayNow: this.state.birthdayOld,
      interestsNow: this.state.interestsOld
    });
    this.setState({toggle: toggle}); // force a rerender
  }

  _saveProfile() {}

  render() {

    function viewSwitch() {
      const a = "";
      if (!this.state.toggle) {
        let a = (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                  <Icon name='arrow-back'/>
                </Button>
              </Left>
              <Body></Body>
              <Right>
                <Button transparent edit onPress={() => this.toggleState(true)}>
                  <Text>Edit</Text>
                </Button>
              </Right>
            </Header>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Thumbnail
                size={80}
                source={{ uri: `https://ui-avatars.com/api/?name=${this.state.usernameOld}` }}
                style={{
                marginLeft: 142
              }}/>
              <Text
                style={{
                fontSize: 24,
                marginTop: 10,
                marginLeft: 160
              }}>{this.state.usernameOld}</Text>
              <ListItem
                style={{
                backgroundColor: '#E9E9E9',
                marginTop: 45,
                marginLeft: 0,
                width: 375,
                height: 45
              }}>
                <Icon
                  name="ios-school"
                  style={{
                  marginLeft: 5
                }}/>
                <Text style={{
                  marginLeft: 15
                }}>Major: {this.state.majorOld}</Text>
              </ListItem>
              <ListItem
                style={{
                backgroundColor: '#FFFFFF',
                marginLeft: 0,
                width: 375,
                height: 45
              }}>
                <Icon
                  name="ios-call"
                  style={{
                  marginLeft: 5
                }}/>
                <Text style={{
                  marginLeft: 15
                }}>Phone: {this.state.phoneOld}</Text>
              </ListItem>
              <ListItem
                style={{
                backgroundColor: '#E9E9E9',
                marginLeft: 0,
                width: 375,
                height: 45
              }}>
                <Icon
                  name="md-calendar"
                  style={{
                  marginLeft: 5
                }}/>
                <Text style={{
                  marginLeft: 15
                }}>Birthday: {this.state.birthdayOld}</Text>
              </ListItem>
              <ListItem
                style={{
                backgroundColor: '#FFFFFF',
                marginLeft: 0,
                width: 375,
                height: 45
              }}>
                <Icon
                  name="logo-dribbble"
                  style={{
                  marginLeft: 5
                }}/>
                <Text style={{
                  marginLeft: 15
                }}>Interests:
                </Text>
                {this.state.interestsOld.map((interest, key) => {
                    return (
                      <Badge
                        key={key}
                        style={{
                        backgroundColor: interest.color,
                        marginLeft: 5
                      }}>
                        <Text
                          style={{
                          color: '#FFFFFF',
                          fontSize: 12
                        }}>{interest.text}</Text>
                      </Badge>
                    );
                  })}
              </ListItem>
              <ListItem
                style={{
                backgroundColor: '#E9E9E9',
                marginLeft: 0,
                width: 375,
                height: 45
              }}>
                <Icon
                  name="md-clipboard"
                  style={{
                  marginLeft: 5
                }}/>
                <Text style={{
                  marginLeft: 15
                }}>Credit Score: {this.state.credit}</Text>
              </ListItem>
            </ScrollView>
          </Container>
        );
        return a;
      } else {
        let a = (
          <Container>
            <Header>
              <Left>
                <Button transparent edit onPress={() => this.toggleState(false)}>
                  <Text>Cancel</Text>
                </Button>
              </Left>
              <Body></Body>
              <Right>
                <Button transparent edit onPress={() => this._saveProfile()}>
                  <Text>Done</Text>
                </Button>
              </Right>
            </Header>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Thumbnail
                size={80}
                source={{ uri: `https://ui-avatars.com/api/?name=${this.state.usernameNow}` }}
                style={{
                marginLeft: 150
              }}/>
              <View
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 35
              }}>
                <Item
                  last
                  style={{
                  flex: 0.6,
                  marginLeft: 100
                }}>
                  <Input onChangeText={(input) => this.setState({ usernameNow: input})}/>
                </Item>
              </View>
              <View>
                <ListItem
                  style={{
                  backgroundColor: '#E9E9E9',
                  marginTop: 45,
                  marginLeft: 0,
                  width: 375,
                  height: 45
                }}>
                  <Icon
                    name="ios-school"
                    style={{
                    marginLeft: 5
                  }}/>
                  <Text style={{ marginLeft: 15 }}>Major: </Text>
                  <Item
                    last
                    style={{
                    flex: 0.8,
                    marginLeft: 40
                  }}>
                    <Input onChangeText={(input) => this.setState({ majorNow: input})} />
                  </Item>
                </ListItem>
              </View>
              <View>
                <ListItem
                  style={{
                  backgroundColor: '#FFFFFF',
                  marginLeft: 0,
                  width: 375,
                  height: 45
                }}>
                  <Icon
                    name="ios-call"
                    style={{
                    marginLeft: 5
                  }}/>
                  <Text style={{
                    marginLeft: 15
                  }}>Phone:
                  </Text>
                  <Item
                    last
                    style={{
                    flex: 0.8,
                    marginLeft: 40
                  }}>
                    <Input onChangeText={(input) => this.setState({ phoneNow: input})} />
                  </Item>
                </ListItem>
              </View>
              <View>
                <ListItem
                  style={{
                  backgroundColor: '#E9E9E9',
                  marginLeft: 0,
                  width: 375,
                  height: 45
                }}>
                  <Icon
                    name="md-calendar"
                    style={{
                    marginLeft: 5
                  }}/>
                  <Text style={{
                    marginLeft: 15
                  }}>Birthday:
                  </Text>
                  <Item
                    last
                    style={{
                    flex: 0.8,
                    marginLeft: 40
                  }}>
                    <Input onChangeText={(input) => this.setState({birthdayNow: input})} />
                  </Item>
                </ListItem>
              </View>
              <View>
                <ListItem
                  style={{
                  backgroundColor: '#FFFFFF',
                  marginLeft: 0,
                  width: 375,
                  height: 45
                }}>
                  <Icon
                    name="logo-dribbble"
                    style={{
                    marginLeft: 5
                  }}/>
                  <Text style={{
                    marginLeft: 15
                  }}>Interests:
                  </Text>
                  <TagPicker badges={this.state.interestsOld} />
                </ListItem>
              </View>
              <View>
                <ListItem
                  style={{
                  backgroundColor: '#E9E9E9',
                  marginLeft: 0,
                  width: 375,
                  height: 45
                }}>
                  <Icon
                    name="md-clipboard"
                    style={{
                    marginLeft: 5
                  }}/>
                  <Text style={{
                    marginLeft: 15
                  }}>Credit Score: 100
                  </Text>
                </ListItem>
              </View>
            </ScrollView>
          </Container>
        );

        return a;
      }
    }

    return (
      <View
        style={{
        backgroundColor: 'white',
        height: 604,
        flex: 1,
        flexDirection: 'column'
      }}>
        {viewSwitch.bind(this)()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});