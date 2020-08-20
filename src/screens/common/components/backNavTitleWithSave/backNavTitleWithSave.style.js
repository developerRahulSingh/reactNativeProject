import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  contentContainer: {
    width: '100%',
    padding: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    padding: 8,
  },
  navButtonIcon: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: commonTheme.TEXT_SIZE_LARGE,
    color: commonTheme.TERTIARY_BACKGROUND_COLOR,
    textAlign: 'center',
  },
});

export { componentStyle };
