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
  },
  itemContainer: {
    paddingVertical: 8,
  },
});

export { componentStyle };
