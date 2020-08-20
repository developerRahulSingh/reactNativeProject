import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  cashBalanceContainer: {
    backgroundColor: commonTheme.COLOR_FADED,
    flexShrink: 1,
  },
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
  switchButtonLabelStyle: {
    marginStart: 8,
  },
  textColor: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginStyle: {
    marginEnd: 8,
  },
});

export { pageStyle };
