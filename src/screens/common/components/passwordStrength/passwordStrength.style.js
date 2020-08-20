import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  passwordStrengthBgView: {
    backgroundColor: commonTheme.INPUT_FIELD_BORDER_COLOR,
    borderRadius: 5,
    height: 10,
    overflow: 'hidden',
    position: 'absolute',
    width: '15%',
  },
  passwordWeak: {
    backgroundColor: commonTheme.PASSWORD_WEAK,
    height: '100%',
    width: '33%',
  },
  passwordMedium: {
    backgroundColor: commonTheme.PASSWORD_MEDIUM,
    height: '100%',
    width: '66%',
  },
  passwordStrong: {
    backgroundColor: commonTheme.PASSWORD_STRONG,
    height: '100%',
    width: '100%',
  },
  notDisplay: {
    display: 'none',
  },
});

export { componentStyle };
