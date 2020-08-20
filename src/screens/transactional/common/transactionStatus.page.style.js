import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  errorMessageTextStyle: {
    color: commonTheme.COLOR_DANGER,
    marginVertical: 16,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollViewButtonContainerStyle: {
    flex: 1,
    paddingTop: 16,
  },
  subContainerStyle: {
    flex: 1,
    paddingHorizontal: 32,
  },
  successFailureTextStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  showDebugContainerStyle: {
    paddingVertical: 16,
  },
  showDebugButtonStyle: {
    paddingVertical: 8,
  },
});

export { pageStyle };
