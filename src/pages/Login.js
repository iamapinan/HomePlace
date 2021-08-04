import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Linking
} from 'react-native';
import styles from '../styles/main';
import {Colors, width} from '../styles/base';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import slideItems from '../configs/slider';

const supportedURL = "https://google.com";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      sliderWidth: width,
      carouselItems: slideItems,
    };

    this._renderSlide = this._renderSlide.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    AsyncStorage.getItem('Token').then(token => {
      return token;
    });
  };

  _renderSlide = ({item, index}) => {
    // let thisImage = require(item.image);
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          style={styles.slideImage}
        />
        <Text style={styles.slideTitle}>{item.title}</Text>
      </View>
    );
  };

  render() {
    return (
      <LinearGradient colors={Colors.gradient} style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <View style={styles.headerSection}>
                  <View>
                    <Image
                      source={require('../images/icons/icon_white_1.png')}
                      style={styles.LoginTopIcon}
                    />
                  </View>
                  <View>
                    <Text style={styles.sectionDescription}>ยินดีต้อนรับ</Text>
                    <Text style={styles.sectionTitle}>Home Place</Text>
                  </View>
                </View>

                <View style={styles.slideContainer}>
                  <Carousel
                    layout={'default'}
                    ref={ref => (this.carousel = ref)}
                    data={this.state.carouselItems}
                    renderItem={this._renderSlide}
                    sliderWidth={this.state.sliderWidth}
                    itemWidth={this.state.sliderWidth - 50}
                  />
                </View>

                <View style={styles.LoginButton}>
                  <Button
                    title="Sign in with Facebook"
                    buttonStyle={styles.fbbutton}
                    titleStyle={styles.facbookText}
                    icon={
                      <Icon
                        name="facebook-square"
                        type="font-awesome"
                        color="#fff"
                      />
                    }
                    onPress={() => Actions.push('Firstime')}
                  />
                  <Button
                    title="Sign in with Google"
                    buttonStyle={styles.googlebt}
                    titleStyle={styles.googleText}
                    icon={<Icon name="google" type="antdesign" color="#888" />}
                    onPress={() => Actions.replace('Shop')}
                  />
                  <Button
                  buttonStyle={styles.transparentbt}
                  titleStyle={styles.facbookText}
                  title="ต้องการความช่วยเหลือ?"
                  onPress={() => Linking.openURL(supportedURL)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
