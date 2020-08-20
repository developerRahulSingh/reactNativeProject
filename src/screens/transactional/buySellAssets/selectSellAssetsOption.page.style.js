import { StyleSheet } from 'react-native';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  advanceSellTextStyle: {
    ...fontFamilyStyles.smallText,
    color: commonTheme.COLOR_LIGHTER,
  },
  advanceSellContainerStyle: {
    marginHorizontal: 16,
    marginTop: 4,
  },
  buttonContainerStyle: {
    paddingHorizontal: 16,
  },
});

export { pageStyle };
