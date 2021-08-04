/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
// import { Icon } from 'react-native-elements'
import {Platform} from 'react-native';
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Colors, defaultFont} from '../styles/base';
import {BlurView, VibrancyView} from '@react-native-community/blur';

export default class DefaultNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          key: 'Shop',
          icon: 'store',
          label: 'ร้านค้า',
        },
        // {
        //   key: 'Products',
        //   icon: 'cube',
        //   label: 'สินค้า',
        // },
        {
          key: 'OrdersHistory',
          icon: 'history',
          label: 'ประวัติ',
        },
        {
          key: 'Profile',
          icon: 'user',
          label: 'โปรไฟล์',
        },
      ],
      activeTab: this.props.active,
    };
  }

  renderIcon = icon => () => (
    <Icon size={24} color={Colors.black} name={icon} type="fontawesome" />
  );

  renderTab = ({tab, isActive}) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={{color: Colors.black, marginTop: 3, fontFamily: defaultFont}}
      renderIcon={this.renderIcon(tab.icon)}
      labelAnimation={progress => ({
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [1, 1],
              outputRange: [0, -2],
            }),
          },
        ],
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      })}
      iconAnimation={progress => ({
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [1, 1],
              outputRange: [0, -2],
            }),
          },
        ],
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      })}
    />
  );
  handlePress = tab => {
    Actions.replace(tab.key);
  };

  render() {
    return (
      <>
        {Platform.OS === 'ios' ? (
          <VibrancyView
            blurType="light"
            intensity={80}
            blurAmount={80}
            reducedTransparencyFallbackColor="white"
            // overlayColor="transparent"
            style={{
              paddingTop: 6,
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'rgba(255,255,255,0.4)',
              ...this.props.style,
            }}>
            <BottomNavigation
              activeTab={this.state.activeTab}
              onTabPress={newTab => this.handlePress(newTab)}
              renderTab={this.renderTab}
              tabs={this.state.tabs}
              style={{backgroundColor: 'transparent'}}
            />
          </VibrancyView>
        ) : (
          <BlurView
            blurType="xlight"
            intensity={80}
            blurAmount={32}
            // reducedTransparencyFallbackColor="white"
            overlayColor="transparent"
            style={{
              paddingTop: 6,
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'rgba(255,255,255,0.4)',
              elevation: 2,
              ...this.props.style,
            }}>
            <BottomNavigation
              activeTab={this.state.activeTab}
              onTabPress={newTab => this.handlePress(newTab)}
              renderTab={this.renderTab}
              tabs={this.state.tabs}
              style={{backgroundColor: 'transparent'}}
            />
          </BlurView>
        )}
      </>
    );
  }
}
