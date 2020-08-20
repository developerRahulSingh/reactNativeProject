import { StyleSheet } from 'react-native';
import commonTheme from '../themes/common.theme';

const fontFamilyStyles = StyleSheet.create({
  robotoRegular: {
    fontFamily: commonTheme.FONT_REGULAR,
  },
  robotoLight: {
    fontFamily: commonTheme.FONT_LIGHT,
  },
  robotoMedium: {
    fontFamily: commonTheme.FONT_MEDIUM,
  },
  robotoBold: {
    fontFamily: commonTheme.FONT_BOLD,
  },
  extraSmallText: {
    fontSize: commonTheme.TEXT_SIZE_EXTRA_SMALL,
    color: commonTheme.COLOR_DEFAULT,
  },
  smallText: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    color: commonTheme.COLOR_DEFAULT,
  },
  defaultText: {
    fontSize: commonTheme.TEXT_SIZE_DEFAULT,
    color: commonTheme.COLOR_DEFAULT,
  },
  mediumText: {
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    color: commonTheme.COLOR_DEFAULT,
  },
  largeText: {
    fontSize: commonTheme.TEXT_SIZE_LARGE,
    color: commonTheme.COLOR_DEFAULT,
  },
  extraLargeText: {
    fontSize: commonTheme.TEXT_SIZE_EXTRA_LARGE,
    color: commonTheme.COLOR_DEFAULT,
  },
});

export default fontFamilyStyles;
