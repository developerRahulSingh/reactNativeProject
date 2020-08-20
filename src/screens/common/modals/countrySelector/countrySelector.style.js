import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  backdrop: {
    ...commonStyle.contentCenter,
    ...commonStyle.modalScreenContainer,
    backgroundColor: commonTheme.COLOR_DEFAULT + '7F',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  container: {
    ...commonStyle.modalContainer,
    backgroundColor: commonTheme.COLOR_TRANSPARENT,
    borderRadius: 16,
  },
  listView: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    padding: 8,
    paddingTop: 0,
  },
  textInput: {
    flex: 0,
  },
  subContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    padding: 16,
  },
  textInputContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderRadius: 4,
    borderWidth: 1,
  },
});

export { componentStyle };
