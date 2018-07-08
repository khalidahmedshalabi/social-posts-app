import { Dimensions } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const pagePadding = 20
export const smallPagePadding = 15

export default {
  pagePadding,
  smallPagePadding,
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
