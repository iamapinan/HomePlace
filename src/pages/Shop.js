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
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/default';
import {Image, Badge, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';
import DefaultNavigation from '../components/DefaultNavigation';
import {Colors, width, height} from '../styles/base';
import HeaderBar from '../components/HeaderBar';

const shops = [
  {
    id: 1,
    name: 'Pizza shop',
    image: 'https://source.unsplash.com/560x440/?pizza',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: false,
    deliveryCost: 10,
  },
  {
    id: 2,
    name: 'Steak House',
    image: 'https://source.unsplash.com/560x440/?steak',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: true,
    deliveryCost: 0,
  },
  {
    id: 3,
    name: 'น้ำปั่น',
    image: 'https://source.unsplash.com/560x440/?fruit',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: true,
    deliveryCost: 0,
  },
  {
    id: 4,
    name: 'ร้านเค้ก',
    image: 'https://source.unsplash.com/560x440/?cake',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: true,
    deliveryCost: 10,
  },
  {
    id: 5,
    name: 'อาหารไทย',
    image: 'https://source.unsplash.com/560x440/?thai-food',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: false,
    deliveryCost: 10,
  },
  {
    id: 1,
    name: 'Pizza shop',
    image: 'https://source.unsplash.com/560x440/?pizza',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: false,
    deliveryCost: 10,
  },
  {
    id: 2,
    name: 'Steak House',
    image: 'https://source.unsplash.com/560x440/?steak',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: true,
    deliveryCost: 10,
  },
  {
    id: 3,
    name: 'น้ำปั่น',
    image: 'https://source.unsplash.com/560x440/?fruit',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: true,
    deliveryCost: 15,
  },
  {
    id: 4,
    name: 'ร้านเค้ก',
    image: 'https://source.unsplash.com/560x440/?cake',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: true,
    deliveryCost: 0,
  },
  {
    id: 5,
    name: 'อาหารไทย',
    image: 'https://source.unsplash.com/560x440/?thai-food',
    subtitle:
      'Badges are small components typically used to communicate a numerical value or indicate the status of an item to the userBadges are small components typically used to communicate a numerical value or indicate the status of an item to the user',
    isOpen: false,
    deliveryCost: 10,
  },
];

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      loadingMore: false,
    };
  }

  rightRender = propsItem => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 60,
        }}>
        <TouchableOpacity
          onPress={() => Actions.push('Search', {searchType: 'shop'})}>
          <Ionicons name="ios-search" color={Colors.white} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.filtersOption}>
          <MaterialCommunityIcons
            name="filter-variant"
            color={Colors.white}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };
  centerRender = propsItem => {
    return (
      <View>
        <Text style={styles.titleText}>ร้านค้า</Text>
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
  filtersOption = () => {};

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

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if(item.isOpen)
          Actions.push('StoreDetails', {store: item})
      }}
      style={{
        padding: 5,
        borderRadius: 4,
        marginVertical: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
      <View style={{width: 100, marginRight: 15}}>
        {
          !item.isOpen &&
            <View style={{width: 100, height: 100, opacity: 0.6, backgroundColor: '#000', position: 'absolute', zIndex: 1}}>
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
            value="อาหาร"
            status="warning"
            badgeStyle={{paddingHorizontal: 3}}
          />
          {item.isOpen ? (
            <Text style={{color: Colors.green}}>เปิด</Text>
          ) : (
            <Text style={{color: Colors.gray}}>ปิด</Text>
          )}
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

  render() {
    return (
      <>
        <SafeAreaView
          style={{...styles.mainContainer, backgroundColor: '#eee'}}>
          <StatusBar barStyle="dark-content" />
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
                data={shops}
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
