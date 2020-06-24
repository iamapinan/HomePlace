import {StyleSheet, Dimensions} from 'react-native';
import {width, height, Colors, defaultFont, util} from './base';

const styles = StyleSheet.create({
  scrollView: {
    height: height,
  },
  body: {},
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    fontFamily: defaultFont,
    paddingHorizontal: util.screenPadding,
  },
  sectionDescription: {
    fontFamily: defaultFont,
    fontSize: 16,
    color: Colors.yellow,
    marginTop: 15,
    paddingHorizontal: 24,
  },
  LoginButton: {
    marginVertical: 20,
    paddingHorizontal: 24,
  },
  loginInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    borderStyle: 'solid',
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  fbbutton: {
    backgroundColor: '#4267B2',
    borderRadius: 32,
    height: 50,
    marginVertical: 5,
  },
  facbookText: {color: '#fff', marginLeft: 10},
  googlebt: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    height: 50,
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  googleText: {color: '#888', marginLeft: 10},
  linebt: {
    backgroundColor: '#00C300',
    borderRadius: 32,
    height: 50,
    marginVertical: 5,
  },
  lineText: {color: '#fff', marginLeft: 10},
  slideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    width: width,
    marginLeft: 0,
    paddingVertical: 10,
  },
  slideImage: {
    width: width - 50,
    height: 240,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  slideTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: defaultFont,
  },
  slideDescription: {
    color: '#666',
    fontSize: 14,
    fontFamily: defaultFont,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 310,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 8,
  },
  LoginTopIcon: {
    width: 45,
    height: 45,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    height: 60,
  },
});

export default styles;
