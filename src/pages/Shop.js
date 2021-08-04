/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/default';
import {Image, Badge, Icon, Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import DefaultNavigation from '../components/DefaultNavigation';
import {Colors, width, height} from '../styles/base';
import HeaderBar from '../components/HeaderBar';
import ShopItems from '../configs/ShopItems';
import category from '../configs/category'
export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      loadingMore: false,
      searchString: '',
      shopList: ShopItems.sort( a => a.isOpen === false )
    };
  }

  _getCategory (type) {
    return category.filter(i => i.type==type)[0]
  }

  _searchHandle () {
    Keyboard.dismiss();
    console.log(this.state.searchString)
  }

  rightRender = propsItem => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 30,
        }}>
        <TouchableOpacity
          onPress={ () => this._searchHandle() }>
          <Icon name="search" type="material" color={Colors.white} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  centerRender = propsItem => {
    return (
      <View style={{marginLeft: -15}}>
        <Input
          placeholder="ค้นหาร้านค้า"
          onChangeText={text => this.setState({searchString: text})}
          containerStyle={{
            marginVertical: 8,
            paddingHorizontal: 20,
            fontSize: 16,
            width: width-120
          }}
          onSubmitEditing={ () => this._searchHandle() }
          returnKeyType="search"
          inputContainerStyle={{
            borderBottomWidth: 0
          }}
          inputStyle={{
            color: '#fff',
          }}
          placeholderTextColor="rgba(230, 131, 197,0.8)"
        />
      </View>
    );
  };

  leftRender = () => {
    return (
      <TouchableOpacity>
        <Icon name="store" type="fontawesome" color="white" size={30} />
      </TouchableOpacity>
    );
  };

  _handleLoadMore = () => {
    this.setState({loadingMore: true});
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: 40,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = ({item, index}) => {
    const shop_type = this._getCategory(item.type);
    return (
      <TouchableOpacity
        onPress={() => {
          if(item.isOpen)
            Actions.push('StoreDetails', {shop: item})
        }}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 1,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <View style={{width: 100, marginRight: 15}}>
          {
            !item.isOpen &&
              <View style={{
                  width: 100, 
                  height: 100,
                  backgroundColor: 'rgba(0,0,0,0.5)', 
                  position: 'absolute', 
                  zIndex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={{color: Colors.white}}>ร้านปิด</Text>
              </View>
          }
          <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
              width: width - 170,
            }}>
            <Badge
              value={shop_type.label}
              status="warning"
              badgeStyle={{paddingHorizontal: 3}}
            />
          </View>
          <Text style={{color: Colors.black}}>{item.name}</Text>
          <Text
            style={{...styles.textGray, width: width - 170}}
            numberOfLines={2}>
            {item.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <>
        <SafeAreaView
          style={{...styles.mainContainer, backgroundColor: '#eee'}}>
          <StatusBar barStyle="light-content" />
          <HeaderBar
            leftComponent={() => this.leftRender()}
            rightComponent={() => this.rightRender()}
            centerComponent={() => this.centerRender()}
            placement="left"
          />
          <ScrollView>
            <View
              style={{
                ...styles.contentContainer,
                paddingHorizontal: 20,
                backgroundColor: '#eee',
              }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={this.state.shopList}
                renderItem={this.renderItem}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                ListFooterComponent={this._renderFooter}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <DefaultNavigation active="Shop" />
      </>
    );
  }
}
