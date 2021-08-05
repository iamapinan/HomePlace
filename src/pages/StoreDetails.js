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
import category from '../configs/category'
import AsyncStorage from '@react-native-community/async-storage';
export default class StoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      itemCount: 0,
      shop: {
        id: this.props.shop.id,
        name: this.props.shop.name,
        subtitle: this.props.shop.subtitle,
        image: this.props.shop.image,
        avatar: '../images/avatar.jpg',
        type: this._getCategory(this.props.shop.type),
        isOpen: this.props.shop.isOpen,
        deliveryCost: this.props.shop.deliveryCost,
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

  async componentDidMount () {
    await this._getMyCart();
    console.log(this.state.cart)
  }

  async UNSAFE_componentWillReceiveProps(props){
    await this._getMyCart();
  }

  async _getMyCart() {
    let product = [], allProduct = 0;
    product = await AsyncStorage.getItem('myCart');
    product = JSON.parse(product);
    product = (product.length === 0) ? [] : product;
    product.forEach(p => {
      allProduct = p.count+allProduct;
    })
    this.setState({ cart: product, itemCount: allProduct });
  }

  _getCategory (t) {
    return category.filter(i => i.type==t)[0]
  }

  leftRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name="chevron-left" type="material" color="white" size={30} />
      </TouchableOpacity>
    );
  };
  RightRender = propsItem => {
    return (
      <TouchableOpacity onPress={() => AsyncStorage.removeItem("myCart")}>
          <View> 
            <Icon name="shopping-cart" type="Feather" color={Colors.white} size={24} />
          </View>
      </TouchableOpacity>
    );
  };
  centerRender = propsItem => {
    return (
      <View>
        <Text style={styles.titleText} numberOfLines={1}>
          {this.props.shop.name}
        </Text>
      </View>
    );
  };

  productRender = ({item}) => {
    let counting = this.state.cart.filter(i => i.id === item.id), itemTitle;
    if(counting.length === 0) {
      itemTitle = (<View>
        <Text style={{fontSize: 16, width: width - 145, color: Colors.black}} numberOfLines={1}>{item.title}</Text>
      </View>);
    } else {
      itemTitle = (<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Text style={{fontSize: 16, color: Colors.black}} numberOfLines={1}>{item.title}</Text>
        <Text style={{fontSize: 16, color: Colors.green}}> × {counting[0].count}</Text>
      </View>);
    }
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          marginVertical: 3,
          padding: 10,
          borderRadius: util.borderRadius,
          ...baseStyle.shadowDefault,
        }}
        onPress={ () => Actions.push('ShopProductDetail', {'product': item}) }>
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
          {itemTitle}
          <Text style={{color: Colors.black50, marginTop: 5}}>
            {item.price} บาท
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const shop = this.state.shop
    return (
      <View style={{...styles.mainContainer, backgroundColor: '#eee'}}>
        <SafeAreaView>
          <StatusBar barStyle="light-content" />
          <HeaderBar
            centerComponent={() => this.centerRender()}
            rightComponent={() => this.RightRender()}
            leftComponent={() => this.leftRender()}
          />
          <ScrollView style={{height: height-60}}>
            <View style={{...styles.contentContainer, paddingHorizontal: 10, paddingBottom: 10}}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: util.borderRadius,
                  ...baseStyle.shadowDefault,
                }}>
                <ImageBackground
                  source={{uri: shop.image}}
                  style={{
                    width: width - 40,
                    height: height / 4,
                    borderRadius: util.radiusSize,
                    overflow: 'hidden',
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    opacity: shop.isOpen ? 1 : 0.3,
                  }}>
                  <View style={{
                      height: 24,
                      minWidth: 65,
                      maxWidth: 140,
                      opacity: 0.8,
                      borderRadius: 4,
                      paddingVertical: 1,
                      paddingHorizontal: 7,
                      backgroundColor: Colors.black,
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                  }}>
                    <Icon name={shop.type.icon} type="material-community" size={20} color={Colors.white}/>
                    <Text
                      style={{ marginLeft: 5, color: Colors.white,}}>
                      {
                        shop.type.label
                      }
                    </Text>
                  </View>
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
                    {shop.name}
                  </Text>
                  {shop.isOpen ? (
                    <Text style={{color: Colors.green}}>ร้านเปิด</Text>
                  ) : (
                    <Text style={{color: Colors.red}}>ร้านปิด</Text>
                  )}
                </View>
                <Text style={{color: Colors.black50}}>
                  {shop.subtitle}
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
                    <Text style={{marginLeft: 5, marginTop: -2, color: Colors.primary}}>
                      ค่าจัดส่ง{' '}
                      {shop.deliveryCost == 0
                        ? 'ฟรี'
                        : shop.deliveryCost + ' บาท'}
                    </Text>
                  </View>
                </View>
              </View>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={shop.products}
                renderItem={this.productRender}
              />
              
            </View>
          </ScrollView>
          {
            (shop.isOpen && this.state.cart.length > 0) && 
              <View style={{
                position: 'absolute',
                bottom: 0,
                width: width,
                height: 65,
                paddingHorizontal: 10,
                backgroundColor: Colors.white,
                zIndex: 999
              }}>
                <Button
                  onPress={() => Actions.push("Summary", {shopName: shop.name, delivery: this.state.shop.deliveryCost})}
                  title={"สรุปรายการสั่งซื้อ × "+this.state.itemCount}
                  buttonStyle={{
                    backgroundColor: Colors.yellow,
                    marginVertical: 10,
                    borderRadius: util.radiusSize,
                  }}
                  titleStyle={{color: Colors.black, fontFamily: defaultFont}}
                />
              </View>
          }
        </SafeAreaView>
      </View>
    );
  }
}
