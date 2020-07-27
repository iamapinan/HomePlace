/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import styles from '../styles/default';
import {Colors, width, height, util, baseStyle, defaultFont} from '../styles/base';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '../components/HeaderBar';

export default class StoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      store: {
        id: this.props.store.id,
        name: this.props.store.name,
        subtitle: this.props.store.subtitle,
        image: this.props.store.image,
        avatar: '../images/avatar.jpg',
        type: this.props.store.type,
        isOpen: this.props.store.isOpen,
        deliveryCost: this.props.store.deliveryCost,
        products: [
          {
            id: 1,
            title: 'น้ำปั่น',
            price: 100,
            image: 'https://source.unsplash.com/560x440/?juice',
          },
          {
            id: 2,
            title: 'สเต็กเนื้อ',
            price: 190,
            image: 'https://source.unsplash.com/560x440/?steak',
          },
          {
            id: 3,
            title: 'เค้ก',
            price: 90,
            image: 'https://source.unsplash.com/560x440/?cake',
          },
        ],
      },
    };
  }
  leftRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name="ios-arrow-back" type="ionicon" color="white" size={30} />
      </TouchableOpacity>
    );
  };
  RightRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
          <View> 
            <Icon name="shopping-cart" type="Feather" color={Colors.white} size={24} />
            {
              this.state.cart.length == 0 &&
                  <View style={styles.reddot}></View>
            }
            </View>


      </TouchableOpacity>
    );
  };
  centerRender = propsItem => {
    return (
      <View>
        <Text style={styles.titleText} numberOfLines={1}>
          {this.props.store.name}
        </Text>
      </View>
    );
  };

  productRender = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          marginVertical: 1,
          padding: 10,
          borderRadius: util.borderRadius,
          ...baseStyle.shadowDefault,
        }}
        onPress={() => this.setState({cart: [...this.state.cart, item]})}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 80,
            height: 65,
            marginRight: 10,
            borderRadius: 4,
          }}
        />
        <View>
          <Text style={{fontSize: 16, width: width - 145}} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{color: Colors.orange, marginTop: 5}}>
            {item.price} บาท
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{...styles.mainContainer, backgroundColor: '#eee'}}>
        <SafeAreaView>
          <StatusBar barStyle="dark-content" />
          <HeaderBar
            centerComponent={() => this.centerRender()}
            rightComponent={() => this.RightRender()}
            leftComponent={() => this.leftRender()}
          />
          <ScrollView>
            <View style={{...styles.contentContainer, paddingHorizontal: 10}}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.white,
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: util.borderRadius,
                  ...baseStyle.shadowDefault,
                }}>
                <ImageBackground
                  source={{uri: this.state.store.image}}
                  style={{
                    width: width - 40,
                    height: height / 4,
                    borderRadius: util.radiusSize,
                    overflow: 'hidden',
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    opacity: this.state.store.isOpen ? 1 : 0.3,
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      height: 24,
                      maxWidth: 80,
                      opacity: 0.8,
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      backgroundColor: Colors.black,
                    }}>
                    อาหาร
                  </Text>
                </ImageBackground>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                    }}>
                    {this.state.store.name}
                  </Text>
                  {this.state.store.isOpen ? (
                    <Text style={{color: Colors.green}}>ร้านเปิด</Text>
                  ) : (
                    <Text style={{color: Colors.red}}>ร้านปิด</Text>
                  )}
                </View>
                <Text style={{color: Colors.black50}}>
                  {this.state.store.subtitle}
                </Text>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                    marginVertical: 10,
                    paddingTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="directions-bike"
                      type="MaterialIcons"
                      color={Colors.primary}
                      size={16}
                    />
                    <Text style={{marginLeft: 5, marginTop: -2}}>
                      ค่าจัดส่ง{' '}
                      {this.state.store.deliveryCost == 0
                        ? 'ฟรี'
                        : this.state.store.deliveryCost + ' บาท'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={this.state.store.products}
                renderItem={this.productRender}
              />
              {this.state.store.isOpen && (
                <View>
                  <Button
                    title="สรุปรายการสั่งซื้อ"
                    buttonStyle={{
                      backgroundColor: Colors.yellow,
                      marginVertical: 10,
                      borderRadius: util.radiusSize,
                    }}
                    titleStyle={{color: Colors.black, fontFamily: defaultFont}}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
