import {StyleSheet, Platform} from 'react-native';
import {width, height, Colors, defaultFont, boldFont, util} from './base';

const registerStyles = StyleSheet.create({
  titleText: {
    color: '#fff',
    fontFamily: defaultFont,
    fontSize: 22,
  },
  contentContainer: {
    display: 'flex',
    height: Platform.OS == 'ios' ? height - 45 : height,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: width,
    backgroundColor: 'transparent',
    height: 45,
    paddingTop: 0,
    borderBottomWidth: 0,
    paddingHorizontal: util.screenPadding,
  },
  topContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: util.screenPadding,
  },
  contentView: {
    backgroundColor: '#eee',
    flexDirection: 'column',
    flex: 6,
    paddingVertical: 10,
    paddingHorizontal: util.screenPadding,
  },
});

export default registerStyles;
