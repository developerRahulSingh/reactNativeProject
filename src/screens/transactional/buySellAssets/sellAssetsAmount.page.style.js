import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  decimalMaskInputContainerStyle: {
    flex: 1,
    paddingHorizontal: 32,
  },
  textColorStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  marginStartStyle: {
    marginStart: 8,
  },
  withdrawAllSwitchContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  marginEndStyle: {
    marginEnd: 8,
  },
  subContainerStyle: {
    backgroundColor: commonTheme.COLOR_FADED,
    justifyContent: 'space-between',
  },
});

export { pageStyle };
