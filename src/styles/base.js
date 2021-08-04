import {Dimensions, StyleSheet} from 'react-native';
const Colors = {
  primary: '#721B65',
  primaryDarker: '#360325',
  primaryLight: '#fff2fd',
  primaryLight2: '#e683c5',
  red: '#B80D57',
  orange: '#F8615A',
  yellow: '#FFD868',
  white: '#fff',
  gray: '#aaa',
  light: '#eee',
  black: '#000',
  black50: '#8a8a8a',
  green: 'green',
  gradient: ['#721B65', '#B80D57', '#FFD868'],
  gradientLight: ['#B80D57', '#FFD868'],
  gradientGray: ['#fef', '#fcf'],
  gradientReverse: ['#FFD868', '#B80D57', '#721B65'],
};
const {width, height} = Dimensions.get('window');
const defaultFont = 'IBMPlexSansThai-Medium';
const textFont = 'IBMPlexSansThai-Text';
const lightFont = 'IBMPlexSansThai-Light';
const boldFont = 'IBMPlexSansThai-Bold';
const util = {
  screenPadding: 24,
  radiusSize: 10,
  objectWidth: width - 48,
};
const baseStyle = StyleSheet.create({
  primaryButton: {
    marginVertical: 15,
    backgroundColor: Colors.primary,
    borderRadius: util.radiusSize,
    paddingVertical: 10,
    fontWeight: 'bold',
    fontFamily: defaultFont,
  },
  buttonTitle: {
    fontFamily: defaultFont,
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingHorizontal: 20,
    borderRadius: util.radiusSize,
    fontFamily: defaultFont,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 0,
    fontFamily: defaultFont,
  },
  shadowDefault: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },
});
export {
  Colors,
  width,
  height,
  defaultFont,
  lightFont,
  boldFont,
  textFont,
  util,
  baseStyle,
};
