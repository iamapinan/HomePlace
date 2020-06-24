/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/default';
import {Colors} from '../styles/base';
import {Icon, ListItem, Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  leftRender = () => {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name="ios-arrow-back" type="ionicon" color="white" size={24} />
      </TouchableOpacity>
    );
  };

  rightRender = propsItem => {
    return (
      <TouchableOpacity>
        <Icon name="ios-search" type="ionicon" color={Colors.white} size={24} />
      </TouchableOpacity>
    );
  };

  centerRender = propsItem => {
    return (
      <>
        <Input
          placeholder="Search"
          onChangeText={text => this.setState({searchText: text})}
          containerStyle={{
            marginVertical: 8,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          inputStyle={{
            color: '#fff',
          }}
          placeholderTextColor="#ccc"
        />
      </>
    );
  };

  render() {
    const {searchType} = this.props;
    return (
      <LinearGradient colors={Colors.gradientGray} style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" />
          <ScrollView>
            <HeaderBar
              leftComponent={() => this.leftRender()}
              rightComponent={() => this.rightRender()}
              centerComponent={() => this.centerRender()}
              placement="left"
            />
            <View style={styles.contentContainer}>
              <Text> Search {searchType} </Text>
              <Text> Keyword {this.state.searchText} </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
