import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';

const textColor = {
  color: commonTheme.COLOR_LIGHT,
};

const pageStyle = StyleSheet.create({
  textInputsContainer: {
    paddingHorizontal: 32,
  },
  sigUpForgotPasswordContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rowWithCenterContentContainer: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
  },
  languageText: {
    ...textColor,
    paddingRight: 5,
  },
  forgotPasswordButtonStyle: {
    margin: 16,
  },
  signUpText: {
    ...textColor,
  },
  signUpButtonStyle: {
    padding: 8,
  },
  appVersionContainer: {
    ...commonStyle.contentCenter,
    paddingVertical: 16,
    width: '100%',
  },
  appVersionText: {
    ...fontFamilyStyles.smallText,
    ...textColor,
  },
});

export { pageStyle };
