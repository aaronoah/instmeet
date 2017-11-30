import React, { Component } from 'react';
import { View } from 'react-native';
import { Badge, Icon, Text } from 'native-base';

class IconBadge extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let badge = (this.props.notificationsCount > 0) ? (
      <Badge style={{ position: 'absolute', left: 15, top: -15, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 12 }}>{this.props.notificationsCount}</Text>
      </Badge>
    ) : null;
    const name = this.props.name;
    return (
      <View style={{marginTop: 10}}>
        <Icon name={name} style={{ fontSize: this.props.fontSize, lineHeight: this.props.fontSize, color: this.props.tintColor }} />
        {badge}
      </View>
    );
  }
};

export default IconBadge;