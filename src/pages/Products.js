/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DefaultNavigation from '../components/DefaultNavigation';
import {Image} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/default';
import {Colors, width, height} from '../styles/base';
import {Actions} from 'react-native-router-flux';
import HeaderBar from '../components/HeaderBar';
// import { ScrollView } from 'react-native-gesture-handler';

const products = [
  {
    id: 1,
    title: 'Cookie',
    description: 'Test Product data',
    image: 'https://source.unsplash.com/800x440/?cookie',
    price: 100,
  },
  {
    id: 2,
    title: 'Bike',
    description: 'Test Product data',
    image: 'https://source.unsplash.com/800x440/?bike',
    price: 120,
  },
  {
    id: 3,
    title: 'Car',
    description: 'Test Product data',
    image: 'https://source.unsplash.com/800x440/?car',
    price: 130,
  },
  {
    id: 4,
    title: 'Book',
    description: 'Test Product data',
    image: 'https://source.unsplash.com/800x440/?book',
    price: 40,
  },
  {
    id: 5,
    title: 'Pen',
    description: 'Test Product data',
    image: 'https://source.unsplash.com/800x440/?pen',
    price: 10,
  },
  {
    id: 6,
    title: 'Macbook',
    description: 'Test Product data',
    image: 'https://source.unsplash.com/800x440/?macbook',
    price: 500,
  },
];

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Text style={styles.titleText}>สินค้า</Text>
      </View>
    );
  };

  filtersOption = () => {};
  _handleLoadMore = () => {
    this.setState({loadingMore: true});
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => Actions.push('ProductDetails', {product: item})}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          margin: 5,
          borderRadius: 4,
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: width / 2 - 40, height: 160, borderRadius: 4}}
        />
        <Text style={{fontSize: 16, marginVertical: 5}}>{item.title}</Text>
        <Text style={{color: Colors.orange}}>10.00</Text>
      </TouchableOpacity>
    );
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
          height: 100,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={{...styles.mainContainer, backgroundColor: '#eee'}}>
        <SafeAreaView>
          <StatusBar barStyle="dark-content" />
          <HeaderBar
            rightComponent={() => this.rightRender()}
            centerComponent={() => this.centerRender()}
          />
          <ScrollView>
            <View style={{...styles.contentContainer, paddingHorizontal: 10}}>
              <FlatList
                numColumns={2}
                data={products}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                ListFooterComponent={this._renderFooter}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <DefaultNavigation active="Products" />
      </View>
    );
  }
}
