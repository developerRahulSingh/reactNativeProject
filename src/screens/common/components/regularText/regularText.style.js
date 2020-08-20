import { StyleSheet } from 'react-native';
import fontFamilyStyles from '../../../../styles/font.style';

const componentStyle = StyleSheet.create({
  fontStyle: {
    ...fontFamilyStyles.robotoRegular,
    ...fontFamilyStyles.defaultText,
  },
});

export { componentStyle };
