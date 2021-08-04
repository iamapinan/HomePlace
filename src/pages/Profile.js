/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StatusBar, ScrollView, Text} from 'react-native';
import DefaultNavigation from '../components/DefaultNavigation';
import styles from '../styles/default';
import {Colors, width, height} from '../styles/base';
import {Avatar, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {profileMenu} from '../configs/menu';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        name: 'หมูหวาน บานเช้า',
        email: '',
        address_id: '22/999',
        location: 'เลค วัลเลย์',
        avatar: '../images/avatar.jpg',
      },
    };
  }

  handleAction = async item => {
    // handle logout
    if(item.slug === 'logout') {
      await AsyncStorage.removeItem("myCart");
      await AsyncStorage.removeItem("Token");
      await AsyncStorage.removeItem("user");
      Actions.push('Login');
    } else {
      Actions.push(item.slug);
    }
  };

  renderSettings = ({item}) => (
    <ListItem
      title={item.title}
      leftIcon={{name: item.icon, type: 'font-awesome'}}
      onPress={() => this.handleAction(item)}
      chevron
      bottomDivider={item.bottomDivider}
      titleStyle={item.style}
    />
  );

  render() {
    return (
      <LinearGradient colors={Colors.gradient} style={styles.mainContainer}>
        <SafeAreaView>
          <StatusBar barStyle="light-content" />
          <ScrollView>
            <View style={styles.profileHeader}>
              <Avatar
                rounded
                size={120}
                showEditButton={true}
                editButton={{
                  name: 'mode-edit',
                  type: 'material',
                  color: '#000',
                  size: 26,
                  containerStyle: {
                    height: 33,
                    paddingTop: 3,
                    borderRadius: 25,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    width: 32,
                  },
                }}
                containerStyle={{
                  alignSelf: 'center',
                  marginBottom: 10,
                  borderWidth: 3,
                  borderColor: Colors.yellow,
                  borderstyle: 'solid',
                }}
                source={require('../images/avatar.jpg')}
                activeOpacity={0.7}
                onEditPress={() => console.log('Works!')}
              />
              <Text style={styles.profileName}>{this.state.profile.name}</Text>
              <Text style={styles.profileDescription}>
                หมู่บ้าน {this.state.profile.location}
                เลขที่ {this.state.profile.address_id}
              </Text>
            </View>
            <View style={styles.settingMenuContainer}>
              {profileMenu.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{name: item.icon, type: 'font-awesome'}}
                  onPress={() => this.handleAction(item)}
                  chevron
                  bottomDivider={item.bottomDivider}
                  titleStyle={item.style}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        <DefaultNavigation active="Profile" />
      </LinearGradient>
    );
  }
}
