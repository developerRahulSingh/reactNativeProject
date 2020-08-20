import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  keyBoardScrollViewContentContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_COLLECT_ADDRESS_BG,
  },
  dynamicFieldsContainerStyle: {
    marginBottom: 24,
  },
  dynamicFieldsButtonStyle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_DARK,
    flexDirection: 'row',
    height: 46,
  },
  dynamicFieldsImageStyle: {
    height: 20,
    marginStart: 8,
    tintColor: commonTheme.COLOR_DARK,
    width: 20,
  },
  dynamicFieldTextStyle: {
    color: commonTheme.COLOR_DARK,
    fontFamily: commonTheme.FONT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    paddingLeft: 5,
  },
});

export { pageStyle };
