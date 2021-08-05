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
  StyleSheet,
  Image,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import styles from '../styles/default';
import {Colors, width, height, util, baseStyle} from '../styles/base';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '../components/HeaderBar';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default class ShopProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfProduct: 0,
      disableEdit: false
    };
  }

  componentDidMount() {
    this.checkTheCart()
  }

  async checkTheCart() {
    let cart = [];
    cart = await AsyncStorage.getItem('myCart');
    cart = await JSON.parse(cart)
    let product = cart.filter(pd => pd.id === this.props.product.id);
    this.setState({ numberOfProduct: product[0].count });
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

  _handleDecrease() {
    if(this.state.numberOfProduct > 0) {
      this.setState({numberOfProduct: this.state.numberOfProduct-1})
    }
  }
  _handleIncrease() {
    this.setState({numberOfProduct: this.state.numberOfProduct+1})
  }

  async _handleAddtoCart() {
    await this.setState({disableEdit: true})
    let productObject = {
      ...this.props.product,
      count: this.state.numberOfProduct
    };

    let previosProduct = await AsyncStorage.getItem("myCart");
    let currentProduct = []

    previosProduct = await JSON.parse(previosProduct);
    
    if(previosProduct !== null) {
      previosProduct = previosProduct.map(product => {
        if(product.id === this.props.product.id) {
          product.count = this.state.numberOfProduct
        }
        return product
      })
      currentProduct = previosProduct
    }
    await currentProduct.push(productObject);
    await AsyncStorage.removeItem("myCart");
    await AsyncStorage.setItem("myCart", JSON.stringify(currentProduct));
    
    Toast.show('👌 เพิ่มสินค้าใส่รถเข็นแล้วจำนวน '+this.state.numberOfProduct, {
        duration: 1000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        onHidden: () => {
          Actions.pop({ refresh: {} });
        }
    });
  
  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView style={{...styles.mainContainer, backgroundColor: '#eee'}}>
          <StatusBar barStyle="light-content" />
          <HeaderBar
            leftComponent={() => this.leftRender()}
            centerComponent={() => this.centerRender()}
          />
          <ScrollView>
            <View style={{...styles.contentContainer, paddingHorizontal: 10}}>
              <View
                style={productStyle.productCard}>
                <Image
                  source={{uri: this.props.product.image}}
                  style={{width: width - 40, height: 260, borderRadius: 4,}}
                />
                <Text
                  style={{fontSize: 18, color: Colors.black, marginTop: 20}}>
                  {this.props.product.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black50,
                    marginTop: 5,
                    marginBottom: 10
                  }}>
                  ราคา {this.props.product.price} บาท
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black50,
                    marginVertical: 5,
                  }}>
                  {this.props.product.description}
                </Text>
              </View>

              <View
                  style={productStyle.productFooterZone}>
                  <Text style={productStyle.productCountText}>จำนวนสินค้า</Text>
                  <Button
                    onPress={() => this._handleDecrease()}
                    title="-"
                    buttonStyle={productStyle.valueButton}
                    titleStyle={productStyle.valueButtonLabel}
                  />
                    <Text style={{color: Colors.black, fontSize: 18}}>{this.state.numberOfProduct}</Text>
                  <Button
                    onPress={() => this._handleIncrease()}
                    title="+"
                    buttonStyle={productStyle.valueButton}
                    titleStyle={productStyle.valueButtonLabel}
                  />
                </View>
              {
              this.state.numberOfProduct > 0 &&
                <Button
                  onPress={() => this._handleAddtoCart()}
                  title="ใส่รถเข็น"
                  disabled={this.state.disableEdit}
                  buttonStyle={{
                    backgroundColor: Colors.yellow,
                    borderRadius: util.radiusSize,
                  }}
                  titleStyle={{color: Colors.black}}
                />
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}

const productStyle = StyleSheet.create({
  productCountText: {
    color: Colors.black, 
    marginRight: 10,
    fontSize: 18
  },
  valueButton: {
    backgroundColor: Colors.primary,
    borderRadius: util.radiusSize,
    paddingHorizontal: 20,
  },
  valueButtonLabel: {
    fontSize: 18,
    color: Colors.white
  },
  productFooterZone: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  productCard: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: util.radiusSize,
    ...baseStyle.shadowDefault,
  }
});