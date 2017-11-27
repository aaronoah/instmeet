import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Icon, Button, Header, Left, Right, Body, Title } from 'native-base';

export default class ResetPassword extends React.Component {
  static navigationOptions = {
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };   
  }

  reset() {
    if(this.state.email === ''){
      this.setState({message: 'email field must be provided'});
      return;
    }
    this.props.navigation.navigate('FillInfo');
  }

  render(){

    return(

<View>
<Header style = {{justifyContent: 'flex-start'}}>
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
          <Icon name='arrow-back' />
        </Button>
        </Left>
        <Body >
          <Title>Reset Passwor</Title>
        </Body>
        <Right></Right>
    </Header>
<Form style={{ backgroundColor: 'white', height: 667 }}>
 <View style={{ flexDirection: 'row' }}>
 <Text style={styles.bodyText}>
    To have your password reset, enter your email
    adress below. We will the send and email containing a link to reset your password.
 </Text>
 </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
  <Text style={{ flex: 0.2, fontSize: 18, marginLeft: 20}}>Email:</Text>
    <Item style={{ flex: 0.6 }}>
        <Input onChangeText={(input) => this.setState({ email: input })} />
    </Item>
    <Text style={{ flex: 0.4, fontSize: 18 }}>@umn.edu</Text>
  </View>
  <Button block info style={{ marginTop: 200, width: 355, marginLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>SEND EMAIL</Text>
    </Button>
  </Form>
  </View>

    ); 
  }
}

const styles = StyleSheet.create({
    bodyText: {
      margin: 60,
      fontSize: 16,
      width: 220
    }
  });