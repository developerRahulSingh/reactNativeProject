import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  subContainerStyle: {
    backgroundColor: commonTheme.COLOR_HINT,
    flexDirection: 'row',
    padding: 16,
  },
  exchangeRateContainerStyle: {
    alignItems: 'center',
    flex: 1,
  },
  coinNameContainerStyle: {
    borderRightColor: commonTheme.COLOR_FADED,
    borderRightWidth: 2,
  },
});

export { pageStyle };
