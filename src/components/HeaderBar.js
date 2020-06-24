import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Header} from 'react-native-elements';
import {Colors, util, width} from '../styles/base';

export default class HeaderBar extends Component {
  appLogo() {
    return (
      <Image
        source={require('../images/icons/icon_white_2.png')}
        style={styles.header_icon}
      />
    );
  }
  render() {
    const {
      leftComponent,
      rightComponent,
      centerComponent,
      style,
      placement,
    } = this.props;
    return (
      <>
        <Header
          containerStyle={{...styles.headerContainer, ...style}}
          leftComponent={leftComponent ? leftComponent : this.appLogo}
          rightComponent={rightComponent}
          centerComponent={centerComponent}
          placement={placement ? placement : 'left'}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
    width: width,
    height: 60,
    paddingHorizontal: util.screenPadding,
    paddingTop: 0,
    borderBottomWidth: 0,
  },
  header_icon: {
    width: 30,
    height: 30,
  },
});
