import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../../../styles/common.style';

const componentStyle = StyleSheet.create({
  mainContainer: {
    width: 256,
  },
  pinDisplayContainer: {
    ...commonStyle.contentCenter,
    flexShrink: 1,
    minHeight: 32,
  },
  numberPadContainer: {
    flexShrink: 1,
    width: '100%',
  },
});

export { componentStyle };
