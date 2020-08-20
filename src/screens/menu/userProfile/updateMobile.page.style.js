import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  countryCodeWithMobileContainer: {
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_LIGHTEST,
    flexDirection: 'row',
  },
  flagButtonContainer: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
  },
  imageFlagStyle: {
    height: 24,
    marginHorizontal: 8,
    width: 32,
  },
  imageDropSolidStyle: {
    height: 8,
    width: 8,
  },
  mobileNumberContainer: {
    ...commonStyle.contentCenter,
    flex: 1,
    flexDirection: 'row',
  },
  mobileNumberPrefixTextStyle: {
    paddingHorizontal: 8,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
  },
});

export { pageStyle };
