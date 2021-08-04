/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import styles from '../styles/default';
import {Colors, width, height, util, baseStyle} from '../styles/base';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '../components/HeaderBar';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {
        name: 'Kim jong un',
        avatar: '../images/avatar.jpg',
      },
    };
  }

  componentDidMount() {
  }

  leftRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name="chevron-left" type="material" color="white" size={30} />
      </TouchableOpacity>
    );
  };
  centerRender = propsItem => {
    return (
      <View>
        <Text style={styles.titleText} numberOfLines={1}>
          {this.props.product.title}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{...styles.mainContainer, backgroundColor: '#eee'}}>
        <SafeAreaView>
          <StatusBar barStyle="light-content" />
          <HeaderBar
            leftComponent={() => this.leftRender()}
            centerComponent={() => this.centerRender()}
          />
          <ScrollView>
            <View style={{...styles.contentContainer, paddingHorizontal: 10}}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  backgroundColor: Colors.white,
                  padding: 10,
                  borderRadius: util.radiusSize,
                  ...baseStyle.shadowDefault,
                }}>
                <Image
                  source={{uri: this.props.product.image}}
                  style={{width: width - 40, height: 260, borderRadius: 4,}}
                />
                <Text
                  style={{fontSize: 22, color: Colors.black, marginTop: 10}}>
                  {this.props.product.title}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.orange,
                    marginVertical: 10,
                  }}>
                  ราคา {this.props.product.price} บาท
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black50,
                    marginVertical: 5,
                  }}>
                  {this.props.product.description}. Drop-in replacement for the
                  standard React Native Image component that displays images
                  with a placeholder and smooth image load transitioning.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                    marginTop: 20,
                    borderRadius: 4,
                  }}>
                  <Image
                    source={require('../images/avatar.jpg')}
                    style={{
                      borderRadius: 50,
                      width: 45,
                      height: 45,
                      margin: 10,
                    }}
                  />
                  <Text style={{paddingTop: 15}}>{this.state.seller.name}</Text>
                </View>
              </View>
              <Button
                title="ซื้อเลย"
                buttonStyle={{
                  backgroundColor: Colors.yellow,
                  marginVertical: 15,
                  borderRadius: util.radiusSize,
                }}
                titleStyle={{color: Colors.black}}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
