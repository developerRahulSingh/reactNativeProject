import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  renderCurrencyContainerStyle: {
    flex: 1,
    padding: 8,
  },
  currentAssetsValueContainerStyle: {
    alignItems: 'center',
    backgroundColor: commonTheme.COLOR_FADED,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  textColorStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginEndStyle: {
    marginEnd: 8,
  },
  imageCardClickContainerStyle: {
    borderTopStartRadius: 7,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  amountCalculatorContainerStyle: {
    borderTopColor: commonTheme.COLOR_FADED,
    borderTopWidth: 1,
  },
  alignItemStyle: {
    alignItems: 'flex-end',
  },
  currencyNameTextStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  assetAmountContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencySymbolImageStyle: {
    height: 48,
    width: 48,
  },
  currencySymbolContainerStyle: {
    borderRadius: 24,
    marginRight: 8,
  },
  buttonContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    padding: 16,
  },
  renderCurrencySubContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 8,
    borderWidth: 1,
  },
  renderCurrencyContainerViewStyle: {
    padding: 8,
  },
});

export { pageStyle };
