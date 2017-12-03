import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, LayoutAnimation, Vibration } from 'react-native';
import { Icon, Form, Container, Header, Content, Segment, Button, Badge, List, ListItem, Thumbnail, Text, Body, document, Item, Input, Card, CardItem } from 'native-base';
import interests from '../data/interests';
// import { element } from '../../../Library/Caches/typescript/2.6/node_modules/@types/prop-types';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            text: '',
            InterestsList: ['swimming', 'club', 'cooking', 'games', 'rock', 'yoga', 'frisbee',
                'golf', 'gym', 'skiing', 'singing', 'painting', 'piano', 'photography', 'biking', 'coding',
                'sport', 'study', 'art', 'life', 'entertainment'],
        };
        //bind the function to the class
        // this.getResult = this.getResult.bind(this);
    };

    static navigationOptions = ({ navigation }) => ({
        header: null,
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="search" style={{ fontSize: 30, color: tintColor }} />
        }
    });

    componentWillReceiveProps() {
        if (!this.props.navigation.state.params) {
            this.props.navigation.setParams({ header: this.renderHeader });
        }
    }

    contains(array, text) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == text) {
                return true;
            }
        }
        return false;
    }

    Noresult() {
        if (this.state.text == '') {
            var content1 = '';
            this.setState({ content: content1 });
        } else if (!this.contains(this.state.InterestsList, this.state.text)) {
            var constent1 = <View></View>;
            this.setState({ content: content1 });
        }
    }

    getResult(key, element) {
        console.log("haoba");
        var content1 =
            <Button rounded style={{ backgroundColor: element.color, marginLeft: 27, marginTop: 15 }}>
                <Text style={{ color: '#FFFFFF' }}>{element.text}</Text>
            </Button>;
        this.setState({content: content1});
       console.log("content1: " + content1);
    }

    render() {
        let hotTags = (
            <View style={{ marginTop: 100 }}>
                <View>
                    <Text style={{ color: '#D0021B', fontSize: 30, fontWeight: 'bold', marginLeft: 27 }}>Hot🔥</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View>
                        <Button rounded style={{ backgroundColor: '#4FADF9', marginLeft: 27, marginTop: 15 }}>
                            <Text style={{ color: '#FFFFFF' }}>Swimming</Text>
                        </Button>
                        <Button rounded style={{ backgroundColor: '#FBAD3D', marginLeft: 27, marginTop: 15 }}>
                            <Text style={{ color: '#FFFFFF' }}>Cooking</Text>
                        </Button>
                    </View>
                    <View>
                        <Button rounded style={{ backgroundColor: '#EC3D40', marginLeft: 27, marginTop: 15 }}>
                            <Text style={{ color: '#FFFFFF' }}>Club</Text>
                        </Button>
                        <Button rounded style={{ backgroundColor: '#D58C8C', marginLeft: 27, marginTop: 15 }}>
                            <Text style={{ color: '#FFFFFF' }}>Hiking</Text>
                        </Button>
                    </View>
                    <View>
                        <Button rounded style={{ backgroundColor: '#A3AFEF', marginLeft: 27, marginTop: 15 }}>
                            <Text style={{ color: '#FFFFFF' }}>Others</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );

        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search tag"
                            style={{ height: 40, flex: 1 }}
                            onChangeText={(text) => {
                                this.state.text = text;
                                this.props.tag.map((element, key) => {
                                    if (element.text == this.state.text || element.category == this.state.text) {
                                        this.getResult(key, element);
                                        console.log(this.state.content);
                                    }
                                    else {
                                        this.Noresult();
                                    }
                                })
                            }}
                            maxLength={30} />
                    </Item>
                </Header>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.content === '' ? hotTags : this.state.content}
                    </View>
            </Container>
        );
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    buttonactive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    textactive: {
        color: '#FFFFFF'
    },
    buttoninactive: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000'
    },
    textinactive: {
        color: '#000000'
    },
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

Search.defaultProps = {
    tag: interests
}