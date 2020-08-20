import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  currencySymbolTextStyle: {
    fontFamily: commonTheme.FONT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    paddingLeft: 16,
  },
  textInputMaskStyle: {
    flex: 1,
    fontFamily: commonTheme.FONT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    width: '100%',
  },
  contentContainer: {
    ...commonStyle.contentCenter,
    borderBottomWidth: 1,
    borderColor: commonTheme.INPUT_FIELD_BORDER_COLOR,
    borderTopWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  errorMessageStyle: {
    color: commonTheme.COLOR_DANGER,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    marginTop: 4,
  },
});

export { componentStyle };
