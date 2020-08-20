import { StyleSheet } from 'react-native';
import fontFamilyStyles from '../../../../styles/font.style';

const componentStyle = StyleSheet.create({
  fontStyle: {
    ...fontFamilyStyles.robotoLight,
    ...fontFamilyStyles.defaultText,
  },
});

export { componentStyle };
