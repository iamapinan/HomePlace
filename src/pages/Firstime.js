/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Header, Icon, Input, ListItem, Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import registerStyles from '../styles/register';
import {Colors, baseStyle} from '../styles/base';
const list = [
  {
    name: 'Lake Valley - บ่อวิน',
    avatar_url: 'https://source.unsplash.com/560x440/?building',
    subtitle: 'ตำบลบึง อำเภอศรีราชา ชลบุรี',
  },
];

export default class Firstime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSelected: '',
    };
  }

  leftRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => Actions.push('Login')}>
        <Icon name="chevron-left" type="material" color="white" size={30} />
      </TouchableOpacity>
    );
  };
  centerRender = propsItem => {
    return (
      <TouchableOpacity>
        <Text style={registerStyles.titleText}>สมาชิกใหม่</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <LinearGradient colors={Colors.gradient}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <KeyboardAvoidingView
            // eslint-disable-next-line no-undef
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
                ยินดีต้อนรับสู่การใช้งานครั้งแรก
              </Text>
              <Text
                style={{
                  color: Colors.yellow,
                  textAlign: 'right',
                  fontSize: 16,
                  marginTop: 10,
                }}>
                โปรดเลือกว่าคุณอยู่ที่ไหน?
              </Text>
            </View>
            <View style={registerStyles.contentView}>
              <Input
                placeholder="หมู่บ้าน/คอนโด ที่คุณอยู่"
                containerStyle={baseStyle.inputContainer}
                inputContainerStyle={baseStyle.input}
                rightIcon={
                  <Icon
                    name="home"
                    size={24}
                    type="font-awesome"
                    color="#ccc"
                  />
                }
              />
              <ScrollView style={{flex: 4, marginBottom: 10, marginTop: 10}}>
                {list.map((l, i) => (
                  <ListItem
                    key={i}
                    leftAvatar={{
                      source: {uri: l.avatar_url},
                      rounded: false,
                    }}
                    title={l.name}
                    subtitle={l.subtitle}
                    subtitleStyle={{color: Colors.black50}}
                    titleStyle={{color: Colors.black}}
                    bottomDivider
                    onPress={item => this.setState({locationSelected: item})}
                  />
                ))}
              </ScrollView>
              <Button
                title="ถัดไป"
                iconRight={true}
                onPress={() => Actions.push('NextStep')}
                buttonStyle={{...baseStyle.primaryButton}}
                icon={{name: 'chevron-right', color: '#fff'}}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
