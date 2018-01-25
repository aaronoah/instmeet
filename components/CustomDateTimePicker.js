import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class CustomDateTimePicker extends React.Component{
  constructor(props){
    super(props);
    this._showDateTimePicker = this._showDateTimePicker.bind(this);
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
    const vis = 'isDateTimePickerVisible' + this.props.number;
    this.state ={
      year: new Date().getFullYear(),
      date: this.props.date !== undefined ? this.props.date : "pick date",
      time: this.props.time !== undefined ? this.props.time : "pick time",
      vis: false
    }
  }

  _showDateTimePicker(){
    this.setState({ vis: true });
  }

  _hideDateTimePicker(){
    this.setState({ vis: false });
  }

  _handleDatePicked(date){
    if (this.state.mode === 'date') {
      this.setState({
        date: moment(date).format("ddd, DD MMM")
      });
    } else if (this.state.mode === 'time') {
      this.setState({
        time: moment(date).format("HH:mm")
      });
    }

    if(this.props.onDateSelected !== undefined){
      this.props.onDateSelected(this.state.date, this.state.year, this.state.time);
    }
    this._hideDateTimePicker();
  }

  _onFocus(mode){
    if(!this.state.vis){
      this.setState({ mode: mode });
      this._showDateTimePicker();
    }
  }

  render(){
    return (
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => this._onFocus("date")}>
          <Text style={{ color: 'gray', fontSize: this.props.fontSize}}>{this.state.date}</Text>
        </TouchableOpacity>
        <Text style={{color: 'gray', marginHorizontal: 10}}>/</Text>
        <TouchableOpacity onPress={() => this._onFocus("time")}>
          <Text style={{ color: 'gray', fontSize: this.props.fontSize}}>{this.state.time}</Text>
        </TouchableOpacity>
        <DateTimePicker   //the caller must provide onDateChange method
          mode={this.state.mode}
          isVisible={this.state.vis}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          minimumDate={(this.props.minimumDate !== undefined) ? new Date(moment.utc(this.props.minimumDate).format()) : undefined}
          maximumDate={(this.props.maximumDate !== undefined) ? new Date(moment.utc(this.props.maximumDate).format()) : undefined}
        />
      </View>
    );
  }

}