import {StyleSheet} from 'react-native';
import {defaultFont, util, Colors, width, height, baseStyle} from './base';
const homeStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: height,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    backgroundColor: Colors.primary,
    width: width,
    height: 60,
    paddingHorizontal: util.screenPadding,
    paddingTop: 0,
    borderBottomWidth: 0,
  },
  profileHeader: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 30,
  },
  contentContainer: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingHorizontal: util.screenPadding,
    marginBottom: 75,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: defaultFont,
  },
  textWhite: {
    color: '#fff',
  },
  textBold: {
    fontWeight: 'bold',
    fontFamily: defaultFont,
  },
  textGray: {
    fontFamily: defaultFont,
    color: '#888',
  },
  settingMenuContainer: {
    flex: 8,
    backgroundColor: '#fff',
    borderRadius: util.radiusSize,
    marginHorizontal: util.screenPadding,
    marginBottom: 75,
    paddingVertical: 13,
    ...baseStyle.shadowDefault,
  },
  profileName: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: defaultFont,
  },
  profileDescription: {
    color: Colors.yellow,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: defaultFont,
  },
  reddot: {
    width: 7,
    height: 7,
    backgroundColor: '#f44',
    borderRadius: 15,
    zIndex: 1,
    marginTop: -5,
    right:-5,
    position: 'absolute',
  }
});

export default homeStyles;
