import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  selectedCountryNameTextStyle: {
    color: commonTheme.COLOR_BRIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  dropDownImageStyle: {
    height: 8,
    width: 8,
  },
  countryFlagImageStyle: {
    height: 24,
    marginHorizontal: 8,
    width: 32,
  },
  selectedCountryFlagContainerStyle: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
  },
  selectedCountryButtonContainerStyle: {
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_BRIGHT,
    flexDirection: 'row',
  },
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 32,
  },
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_CONFIRM_YOUR_COUNTRY_BG,
  },
});

export { pageStyle };
