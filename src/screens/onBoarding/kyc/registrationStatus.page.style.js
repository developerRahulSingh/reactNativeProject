import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  pageColorStyle: {
    backgroundColor: commonTheme.SECONDARY_BACKGROUND_COLOR,
  },
  bottomButtonsContainerStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export { pageStyle };
