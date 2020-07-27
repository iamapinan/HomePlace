/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Platform,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import registerStyles from '../styles/register';
import {Actions} from 'react-native-router-flux';
import {Colors, baseStyle, util} from '../styles/base';
import LinearGradient from 'react-native-linear-gradient';
import {Header, Icon, Button, Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';

export default class NextStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDay: '',
      name: '',
      email: '',
      gender: 'male',
      phone: '',
    };
  }

  leftRender = () => {
    return (
      <TouchableOpacity onPress={() => Actions.push('Firstime')}>
        <Icon name="ios-arrow-back" type="ionicon" color="white" size={30} />
      </TouchableOpacity>
    );
  };

  centerRender = () => {
    return (
      <TouchableOpacity>
        <Text style={registerStyles.titleText}>ข้อมูลส่วนตัว</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const genderOptions = [
      {
        value: 'male',
        label: 'ชาย',
      },
      {
        value: 'female',
        label: 'หญิง',
      },
    ];

    return (
      <LinearGradient colors={Colors.gradient}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={registerStyles.contentContainer}>
            <Header
              containerStyle={registerStyles.headerContainer}
              leftComponent={() => this.leftRender()}
              centerComponent={() => this.centerRender()}
              placement="right"
            />
            <View style={registerStyles.topContainer}>
              <Text style={{color: '#fff', textAlign: 'right', fontSize: 18}}>
                ขั้นสุดท้ายแล้ว
              </Text>
              <Text
                style={{
                  color: Colors.yellow,
                  textAlign: 'right',
                  fontSize: 16,
                  marginTop: 10,
                }}>
                ขั้นตอนนี้ทำเพียงครั้งเดียว
              </Text>
            </View>
            <View style={registerStyles.contentView}>
              <ScrollView style={{flex: 4, marginBottom: 10, marginTop: 10}}>
                <Input
                  placeholder="E-Mail"
                  keyboardType="email-address"
                  editable={false}
                  onChangeText={text => this.setState({email: text})}
                  containerStyle={baseStyle.inputContainer}
                  inputContainerStyle={baseStyle.input}
                />
                <Input
                  placeholder="ชื่อ-นามสกุล"
                  containerStyle={baseStyle.inputContainer}
                  inputContainerStyle={baseStyle.input}
                  onChangeText={text => this.setState({name: text})}
                />
                <Input
                  containerStyle={baseStyle.inputContainer}
                  inputContainerStyle={baseStyle.input}
                  keyboardType="phone-pad"
                  placeholder="เบอร์โทรศัพท์"
                  onChangeText={text => this.setState({phone: text})}
                  value={this.state.phone}
                  maxLength={10} //setting limit of input
                />
                <DatePicker
                  style={{
                    ...baseStyle.inputContainer,
                    width: util.objectWidth,
                    height: 45,
                  }}
                  date={this.state.birthDay}
                  mode="date"
                  placeholder="วัน/เดือน/ปี เกิด"
                  format="DD/MM/YYYY"
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    placeholderText: {
                      textAlign: 'left',
                      color: '#aaa',
                      fontSize: 16,
                    },
                    dateInput: {
                      borderWidth: 0,
                      height: 43,
                      paddingTop: 3,
                      alignItems: 'flex-start',
                    },
                  }}
                  onDateChange={date => {
                    this.setState({birthDay: date});
                  }}
                />
                <View style={{borderRadius: util.radiusSize, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ccc'}}>
                  <RNPickerSelect
                    onValueChange={value => this.setState({gender: value})}
                    items={genderOptions}
                    placeholder={{
                      label: 'ไม่ระบุเพศ',
                      value: null,
                    }}
                    style={{...baseStyle.inputContainer}}
                  />
                </View>

                <Input
                  placeholder="เลขที่บ้าน"
                  containerStyle={baseStyle.inputContainer}
                  inputContainerStyle={baseStyle.input}
                />
                <Input
                  placeholder="ซอย"
                  containerStyle={baseStyle.inputContainer}
                  inputContainerStyle={baseStyle.input}
                  keyboardType="numeric"
                />
              </ScrollView>
              <Button
                title="เสร็จสิ้น"
                onPress={() => Actions.push('Shop')}
                buttonStyle={{...baseStyle.primaryButton}}
                titleStyle={{...baseStyle.buttonTitle}}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
