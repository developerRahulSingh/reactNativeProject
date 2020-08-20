import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  countryNotSupportedTextStyle: {
    color: commonTheme.PRIMARY_TEXT_COLOR_LIGHT,
    fontFamily: commonTheme.FONT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    lineHeight: 29,
    marginBottom: 25,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  mainContainerStyle: {
    ...commonStyle.contentCenter,
    backgroundColor: commonTheme.COLOR_COUNTRY_NOT_SUPPORT_BG,
  },
});

export { pageStyle };
