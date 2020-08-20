import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  labelConsentStyle: {
    marginBottom: 8,
  },
  labelAgreeConsentTextColor: {
    color: commonTheme.PRIMARY_TEXT_COLOR_DARK,
  },
  switchButtonContainerViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  switchButtonContainerStyle: {
    marginEnd: 8,
  },
  paddingHorizontalStyle: {
    paddingHorizontal: 32,
  },
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_PRIMARY,
  },
  renderFieldsContainerStyle: {
    width: '100%',
  },
  keyBoardScrollViewContentContainerStyle: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export { pageStyle };
