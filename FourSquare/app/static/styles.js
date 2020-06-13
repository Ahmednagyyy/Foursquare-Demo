/* istanbul ignore file */

import { ScreenDimensions } from './constants';
import FastImage from 'react-native-fast-image';

/**
 * This is for adding a global theme across the app
 */

export const Colors = {
  WHITE: "#FFFFFF",
  BLACK: "#000000"
};

export const Fonts = {
  /* WEIGHTS */
  THIN: '100',
  LIGHT: '200',
  REGULAR: '300',
  MEDIUM: '400',
  BOLD: '500',
  HEAVY: '700',
  /* FONTS */
  PRIMARY: '',
  SECONDARY: ''
};

export const ViewStyles = {};

/**
 * This is for adding default props applied automatically to react-native-elements components across the app,
 * This can be getting its input from firebase remote config further on
 */

export const Theme = {
  Text: {
    style: {}
  },
  Input: {
    inputStyle: {}
  },
  Avatar: {
    overlayContainerStyle: {},
    ImageComponent: FastImage
  },
  Icon: {
    iconStyle: {}
  },

  Card: {
    containerStyle: {
      margin: 0,
      shadowColor: Colors.BLACK,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: Colors.WHITE,
      borderRadius: 8,
      elevation: 5,
      borderColor: 'transparent',
      padding: 0
    },
    wrapperStyle: {
      flex: 1
    }
  },
  Divider: {
    style: {
      height: 1,
      backgroundColor: Colors.BLACK,
    }
  },
  Button: {
    containerStyle: {},
    buttonStyle: {},
    titleStyle: {}
  },
  Header: {
    containerStyle: {
      borderWidth: 0
    }
  },
  // Set a global primary color to the app
  colors: {}
};
