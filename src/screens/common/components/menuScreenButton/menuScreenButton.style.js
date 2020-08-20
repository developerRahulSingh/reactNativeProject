import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  contentContainer: {
    borderBottomColor: commonTheme.COLOR_LIGHT,
    borderBottomWidth: 1,
  },
  menuIcon: {
    height: 24,
    marginHorizontal: 16,
    tintColor: commonTheme.COLOR_PRIMARY,
    width: 24,
  },
  menuText: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  menuRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
});

export { componentStyle };
