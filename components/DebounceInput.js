import React, {Component} from 'react';
import { Input } from 'native-base';
import debounce from 'lodash/debounce';

export const DebounceInput = (props) => ({
  render(){
    const wait = (props.wait !== undefined) ? props.wait : 250;
    return (
      <Input {...props} onChangeText={debounce(props.onChangeText, wait)} />
    );
  }
});