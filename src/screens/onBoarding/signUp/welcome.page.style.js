import { Dimensions, StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  pageControlContainerStyle: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  currentIndicatorStyle: {
    height: 8,
    width: 16,
  },
  indicatorStyle: {
    height: 8,
    width: 8,
  },
  staticFirstScreenContainerStyle: {
    backgroundColor: commonTheme.COLOR_WELCOME_ONE_BG,
    width: Dimensions.get('window').width,
  },
  staticSecondScreenContainerStyle: {
    backgroundColor: commonTheme.SECONDARY_BACKGROUND_COLOR,
    width: Dimensions.get('window').width,
  },
  staticThirdScreenContainerStyle: {
    backgroundColor: commonTheme.COLOR_WELCOME_THIRD_BG,
    width: Dimensions.get('window').width,
  },
  staticForthScreenContainerStyle: {
    backgroundColor: commonTheme.COLOR_PRIMARY,
    width: Dimensions.get('window').width,
  },
  staticThirdScreenSubContainerStyle: {
    paddingHorizontal: 32,
    marginBottom: 128,
  },
  thirdScreenContentTitleContainer: {
    marginBottom: 4,
    marginTop: 16,
  },
  thirdScreenContentHeaderStyle: {
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    textAlign: 'center',
  },
  thirdScreenContentTextStyle: {
    color: commonTheme.COLOR_BRIGHT,
    textAlign: 'center',
  },
});

export { pageStyle };
