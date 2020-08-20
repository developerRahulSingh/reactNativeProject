import { StyleSheet } from 'react-native';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: commonTheme.COLOR_DARK,
  },
  sectionHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 24,
  },
  sectionHeading: {
    color: commonTheme.COLOR_PRIMARY_DARK,
  },
  menuVersionNumberText: {
    color: commonTheme.SECONDARY_TEXT_COLOR_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  menuView: {
    paddingBottom: 32,
    paddingHorizontal: 32,
  },
});

export { pageStyle };
