import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  assetBalanceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  amountCalculatorStyle: {
    paddingVertical: 16,
  },
  textColorStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginStartStyle: {
    marginStart: 8,
  },
  marginEndStyle: {
    marginEnd: 8,
  },
});

export { pageStyle };
