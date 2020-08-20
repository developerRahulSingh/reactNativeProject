import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  renderFieldsContainerStyle: {
    paddingHorizontal: 32,
    width: '100%',
  },
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_COLLECT_ADDITIONAL_INFO_BG,
  },
  keyBoardScrollViewStyle: {
    paddingTop: 30,
  },
  keyBoardScrollViewContentContainer: {
    alignItems: 'center',
  },
});

export { pageStyle };
