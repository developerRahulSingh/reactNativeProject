import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';

const pageStyle = StyleSheet.create({
  keyboardScrollViewContainerStyle: {
    paddingHorizontal: 32,
  },
  notSupportedContainerStyle: {
    ...commonStyle.contentCenter,
    flex: 1,
  },
  textAlignStyle: {
    textAlign: 'center',
  },
});

export { pageStyle };
