/**
 * This is for adding constant values across the app
 */
/* istanbul ignore file */

import { Dimensions } from 'react-native';

export const ScreenDimensions = {
  SCREEN_HEIGHT: Dimensions.get('window').height,
  SCREEN_WIDTH: Dimensions.get('window').width
};

export const PAGINATION_COUNT = 10;
export const PAGINATION_THRESHOLD = 0.5;
export const HEADER_ALERT_TIME_OUT = 3500;
