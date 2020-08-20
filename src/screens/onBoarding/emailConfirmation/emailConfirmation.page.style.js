import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_EMAIL_CONFIRMATION_BG,
  },
  editEmailContainerStyle: {
    alignItems: 'center',
    padding: 32,
  },
});

export { pageStyle };
