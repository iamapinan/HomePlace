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
  Image,
} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, defaultFont, width, height, util} from '../styles/base';
import styles from '../styles/default';
import HeaderBar from '../components/HeaderBar';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSelected: '',
    };
  }

  leftRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name="ios-arrow-back" type="ionicon" color="white" size={30} />
      </TouchableOpacity>
    );
  };

  centerRender = propsItem => {
    return (
      <TouchableOpacity>
        <Text style={styles.titleText}>About</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <LinearGradient colors={Colors.gradient} style={{height: height}}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <HeaderBar
            style={{backgroundColor: 'transparent'}}
            leftComponent={() => this.leftRender()}
            centerComponent={() => this.centerRender()}
          />
          <View>
            <Image
              source={require('../images/icons/icon_white_2.png')}
              style={{width: 75, height: 75, alignSelf: 'center'}}
            />

            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 20,
                marginTop: 15,
                fontWeight: 'bold',
                fontFamily: defaultFont,
              }}>
              Home Place
            </Text>
          </View>
          <ScrollView
            style={{paddingHorizontal: util.screenPadding, marginTop: 20}}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: defaultFont,
                marginVertical: 5,
              }}>
              furniture largest cotton operation ask wheel gather try equal
              measure flew canal wool twelve weight railroad shade dirty coat
              leader wind information planning molecular
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontFamily: defaultFont,
                marginVertical: 5,
              }}>
              furniture largest cotton operation ask wheel gather try equal
              measure flew canal wool twelve weight railroad shade dirty coat
              leader wind information planning molecular
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontFamily: defaultFont,
                marginVertical: 5,
              }}>
              furniture largest cotton operation ask wheel gather try equal
              measure flew canal wool twelve weight railroad shade dirty coat
              leader wind information planning molecular wherever swept sudden
              rice tell aid written spell slow accident tropical taught wool
              hall draw balloon shop fish satellites size open accept radio
              apart
            </Text>
            <Divider style={{backgroundColor: 'white', marginVertical: 10}} />
            <Text
              style={{
                color: Colors.white,
                fontFamily: defaultFont,
                marginVertical: 5,
              }}>
              furniture largest cotton operation ask wheel gather try equal
              measure flew canal wool twelve weight railroad shade dirty coat
              leader wind information planning molecular
            </Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
