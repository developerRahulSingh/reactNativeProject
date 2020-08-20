import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  textInput: {
    color: commonTheme.COLOR_DEFAULT,
    flex: 1,
    fontFamily: commonTheme.FONT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});

export { componentStyle };
