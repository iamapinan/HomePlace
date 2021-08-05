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
  KeyboardAvoidingView,
  FlatList,
  Keyboard
} from 'react-native';
import {Icon, Button, Input, CheckBox} from 'react-native-elements';
import styles from '../styles/default';
import {Colors, width, height, util, baseStyle} from '../styles/base';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '../components/HeaderBar';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cart: [],
        price: 0,
        selfPickup: false,
        buttonDisabled: false,
        orderMsg: ''
    };
  }

  async componentDidMount() {
    await this.getTheCart();
    await this.calculatePrice();
  }

  async getTheCart() {
    let products = [];
    products = await AsyncStorage.getItem('myCart');
    products = await JSON.parse(products)
    this.setState({ cart: products });
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
          {this.props.shopName}
        </Text>
      </View>
    );
  };

  async _handleSubmit() {
    this.setState({buttonDisabled: true})
    Toast.show('🙏 คุณได้สั่งซื้อสินค้าเรียบร้อยแล้ว โปรดตรวจสอบที่หน้าประวัติ', {
        duration: 1000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        onHidden: async () => {
            await AsyncStorage.removeItem("myCart")
            Actions.replace('OrderDetail', {order: this.state});
        }
    });
  
  }

  calculatePrice() {
      let products = this.state.cart;
      let summary = 0;
      let price = products.forEach(i => {
          summary = (i.price*i.count)+summary;
      })

      summary = summary+this.props.delivery
      this.setState({price: summary});
  }

  formatPrice(n) {
    n = n.toFixed(2)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  summaryRender(list) {
      let item = list.item
      let itemPrice = item.price*item.count
      itemPrice = itemPrice.toFixed(2)
      itemPrice = itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return(
          <View style={summaryStyle.list}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Image source={{uri: item.image}} 
                style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    borderRadius: 4,
                  }} />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color: Colors.black, fontSize: 16}}>{item.title}</Text>
                    <Text style={{color: Colors.black50, fontSize: 14}}>จำนวน {item.count}</Text>
                  </View>
                </View>
                <Text style={{color: Colors.black, fontSize: 16}}>{itemPrice}</Text>
              </View>
          </View>
      )

  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView style={{...styles.mainContainer, backgroundColor: '#eee'}}>
        <KeyboardAvoidingView  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          <HeaderBar
            leftComponent={() => this.leftRender()}
            centerComponent={() => this.centerRender()}
          />
          <ScrollView>
            <View style={{...styles.contentContainer, paddingHorizontal: 10}}>
                <Text style={summaryStyle.title}>สรุปรายการสั่งซื้อ</Text>
                <View style={summaryStyle.Card}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.cart}
                        renderItem={this.summaryRender}
                     />
                     {
                     (this.props.delivery > 0 && !this.state.selfPickup) &&
                     <View style={summaryStyle.list}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Text style={{color: Colors.orange, fontSize: 16}}>ค่าจัดส่ง</Text>
                          <Text style={{color: Colors.orange, fontSize: 16}}>{this.formatPrice( this.props.delivery)}</Text>
                        </View>
                    </View>
                     }
                     <Input
                     disabled={this.state.buttonDisabled}
                     multiline={true}
                     numberOfLines={3}
                     inputContainerStyle={{
                        borderBottomWidth: 0
                      }}
                     returnKeyType="done"
                     onSubmitEditing={() => Keyboard.dismiss()}
                     onChangeText={(text) => this.setState({orderMsg: text})}
                     placeholder="ฝากข้อความถึงร้านค้า?"
                     inputStyle={summaryStyle.msgInput}
                     />
                     <CheckBox
                     disabled={this.state.buttonDisabled}
                    title='ฉันจะไปรับสินค้าด้วยตัวเอง'
                    checked={this.state.selfPickup}
                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                    textStyle={{fontWeight: '400', fontSize: 16}}
                    onPress={async () => {
                        await this.setState({selfPickup: !this.state.selfPickup})
                        if(this.state.selfPickup) {
                          this.setState({
                            price: this.state.price-this.props.delivery
                          })
                        } else {
                          this.setState({
                            price: this.state.price+this.props.delivery
                          })
                        }
                      }
                    }
                    />
                     <View style={summaryStyle.cardBottom}>
                         <Text style={{fontSize: 20}}>รวมทั้งหมด</Text>
                         <Text style={{fontSize: 20}}>{ this.formatPrice( this.state.price ) }</Text>
                     </View>
                </View>
                <View style={{marginBottom: 20, paddingHorizontal: 10, flexDirection: 'row'}}>
                    <Icon name="info" type="material" size={16}/>
                    <Text style={{color: Colors.black, marginLeft: 5}}>
                        ไม่มีการชำระเงินใดๆ ผ่านแอปพลิเคชั่น ผู้ใช้จะต้องชำระเงินด้วยตนเอง โดยร้านค้าจะมีข้อมูลการชำระเงินให้ท่านหลังกดกยืนยันการสั่งซื้อสินค้าแล้วเท่านั้น
                    </Text>
                </View>
              <Button
                onPress={() => this._handleSubmit()}
                title="ยืนยันคำสั่งซื้อ"
                buttonStyle={{
                  backgroundColor: Colors.yellow,
                  borderRadius: util.radiusSize,
                  height: 50
                }}
                disabled={this.state.buttonDisabled}
                titleStyle={{color: Colors.black}}
              />
            </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}

const summaryStyle = StyleSheet.create({
  cardBottom: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: util.radiusSize,
    borderBottomRightRadius: util.radiusSize,
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 5,
    justifyContent: 'space-between'
  },
  Card: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    paddingTop: 5,
    borderRadius: util.radiusSize,
    ...baseStyle.shadowDefault,
    marginVertical: 15
  },
  list: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: 10
  },
  title: {
      fontSize: 20,
      color: Colors.black,
      textAlign: 'center',
      fontWeight: '700'
  },
  msgInput: {
    borderWidth: 1, 
    padding: 5, 
    fontSize: 16, 
    textAlignVertical: 'top',
    borderColor: '#ccc',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 6
  }
});