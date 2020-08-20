import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  linearGradientStyle: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  subContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  renderCurrencyItemsMainContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    marginHorizontal: 16,
  },
  renderCurrencyItemContainerStyle: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  incrementDecrementImageStyle: {
    height: 24,
    width: 24,
  },
  incrementDecrementButtonStyle: {
    borderRadius: 8,
    padding: 6,
  },
  incrementDecrementContainerStyle: {
    padding: 4,
  },
  incrementDecrementMainContainerStyle: {
    justifyContent: 'space-between',
    padding: 8,
  },
  percentageTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_LARGE * 2,
  },
  currencySymbolImageStyle: {
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  contentCenter: {
    ...commonStyle.contentCenter,
  },
  lockButtonStyle: {
    padding: 6,
  },
  lockContainerStyle: {
    padding: 8,
  },
  renderCurrencyContainerStyle: {
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 16,
  },
  renderCurrencySubContainerStyle: {
    flexDirection: 'row',
  },
});

export { pageStyle };
