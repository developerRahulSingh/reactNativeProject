import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  textInput: {
    borderBottomWidth: 2,
    fontFamily: commonTheme.FONT_MEDIUM,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});

export { componentStyle };
