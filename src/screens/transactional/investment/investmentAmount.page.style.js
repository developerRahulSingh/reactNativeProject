import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 32,
  },
  textColor: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginStart: {
    marginStart: 8,
  },
  switchButtonViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  marginEnd: {
    marginEnd: 8,
  },
  cashBalanceLabelViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  mainSwitchButtonViewStyle: {
    backgroundColor: commonTheme.COLOR_FADED,
    flexShrink: 1,
    width: '100%',
  },
  switchViewStyle: {
    flexShrink: 1,
    marginBottom: 32,
  },
});

export { pageStyle };
