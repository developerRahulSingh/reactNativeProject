import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  instrumentContainerStyle: {
    paddingHorizontal: 32,
  },
  descriptionTextContainer: {
    padding: 24,
  },
  descriptionTextStyle: {
    textAlign: 'center',
  },
  descriptionBoldTextStyle: {
    color: commonTheme.COLOR_DEFAULT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
});

export { pageStyle };
