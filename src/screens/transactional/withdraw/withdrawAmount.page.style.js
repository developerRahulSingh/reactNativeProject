import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  cashBalanceInfoContainer: {
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  maxCashBalanceSwitchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  decimalInputContainer: {
    flex: 1,
    paddingVertical: 32,
  },
  cashBalanceErrorText: {
    color: commonTheme.COLOR_DANGER,
    fontSize: commonTheme.TEXT_SIZE_DEFAULT,
    textAlign: 'center',
  },
  cashBalanceInfoContainerView: {
    flexShrink: 1,
  },
  textColor: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginEnd: {
    marginEnd: 8,
  },
  marginStart: {
    marginStart: 8,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
});

export { pageStyle };
