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
  Modal,
  Linking,
  Clipboard
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import styles from '../styles/default';
import {Colors, height, util, baseStyle} from '../styles/base';
import {Actions} from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
        order_detail: this.props.order,
        payment: {
            name: 'โอนเงินธนาคาร',
            accountName: 'ร้านหมูหวาน',
            accountRef: '0833645699',
            bankName: 'กสิกรไทย'
        },
        shopPhone: '091234132'
    };
  }

  formatPrice(n) {
    n = n.toFixed(2)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  async _handleCopy(str) {
    await Clipboard.setString(str)
    Toast.show('คัดลอกข้อความแล้ว', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true
    });
  }

  render() {
    const order = this.state.order_detail;
    const payment = this.state.payment;
    const qrcode = `https://promptpay.io/${payment.accountRef}/${order.price}.png`;

    return (
      <RootSiblingParent>
        <SafeAreaView style={{...styles.mainContainer, backgroundColor: '#eee'}}>
        <KeyboardAvoidingView  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          <ScrollView>
            <View style={{...styles.contentContainer, paddingHorizontal: 10}}>
                <Text style={orderStyle.title}>👍 การสั้งซ์้อเสร็จสมบูรณ์</Text>
                <View style={orderStyle.Card}>
                    <View style={orderStyle.cartBody}>
                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10, marginBottom: 10}}>
                            <TouchableOpacity
                            onPress={() => this.setState({modalShow: true})}
                            style={{
                                backgroundColor: '#013e65',
                                padding: 4,
                                borderRadius: 4
                            }}>
                            <Image source={require('../images/PromptPay-logo.jpg')} style={{
                                width: 130,
                                height: 43
                            }}/>
                            <Image source={{uri: qrcode}} 
                            style={{
                                width: 130,
                                height: 130,
                                alignSelf: 'center',
                            }}/>
                            <Modal visible={this.state.modalShow} transparent={true}>
                                <ImageViewer imageUrls={[{url: qrcode}]} onClick={() => this.setState({modalShow: false})}/>
                            </Modal>
                            <Text style={{color: Colors.white, textAlign: 'center'}}>🔍 ขยาย</Text>
                            </TouchableOpacity>

                            <View style={{paddingTop: 10}}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={orderStyle.paymentTextTitle}>วิธีชำระเงิน</Text>
                                    <Text style={orderStyle.paymentText}>{payment.name}</Text>
                                </View>
                                <View style={{flexDirection: 'column', paddingTop: 5}}>
                                    <Text style={orderStyle.paymentTextTitle}>ธนาคาร</Text>
                                    <Text style={orderStyle.paymentText}>{payment.bankName}</Text>
                                </View>
                                <View style={{flexDirection: 'column', paddingTop: 5}}>
                                    <Text style={orderStyle.paymentTextTitle}>ชื่อบัญชี</Text>
                                    <Text style={orderStyle.paymentText}>{payment.accountName}</Text>
                                </View>
                                <TouchableOpacity
                                onPress={() => this._handleCopy(payment.accountRef)}
                                 style={{flexDirection: 'column', paddingTop: 5}}>
                                    <Text style={orderStyle.paymentTextTitle}>เลขที่บัญชี</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={orderStyle.paymentText}>{payment.accountRef}</Text>
                                        <Icon name="content-copy" type="material-community" size={16} color={Colors.gray}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            order.orderMsg !== '' &&
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="chat" type="material" size={18}/>
                                <Text style={{color: Colors.black, marginLeft: 10}}>{order.orderMsg}</Text>
                            </View>
                        }
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="directions-bike" type="material" size={18}/>
                        {
                            order.selfPickup ?
                            <Text style={{color: Colors.black, marginLeft: 10}}>จะไปรับสินค้าเอง</Text>
                            :
                            <Text style={{color: Colors.black, marginLeft: 10}}>ต้องการให้มาส่ง</Text>
                        }
                        </View>
                    </View>
                    <View style={orderStyle.cardBottom}>
                        <Text style={{fontSize: 20}}>ยอดชำระ</Text>
                        <Text style={{fontSize: 20}}>{ this.formatPrice( order.price ) }</Text>
                    </View>
                </View>
              <Button
                onPress={() => Actions.replace("Shop")}
                title="กลับหน้าหลัก"
                buttonStyle={{
                  backgroundColor: Colors.yellow,
                  borderRadius: util.radiusSize,
                  height: 50,
                  marginTop: 20
                }}
                titleStyle={{color: Colors.black}}
              />
              <Button
                onPress={() => Linking.openURL(`tel:${this.state.shopPhone}`)}
                title="📞 โทรหาร้านค้า"
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderColor: Colors.black,
                  borderWidth: 1,
                  borderRadius: util.radiusSize,
                  height: 50,
                  marginTop: 20
                }}
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

const orderStyle = StyleSheet.create({
  cardBottom: {
    backgroundColor: Colors.black,
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
  cartBody: {
      paddingHorizontal: 15,
      marginVertical: 10,
  },
  title: {
      fontSize: 20,
      color: Colors.black,
      textAlign: 'center',
      fontWeight: '700',
      marginTop: height*0.1
  },
  paymentText: {
    color: Colors.black, fontSize: 16,
    paddingLeft: 10
  },
  paymentTextTitle: {
    color: Colors.black50, fontSize: 16,
    fontWeight: '700',
    paddingLeft: 10
  },
});