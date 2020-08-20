import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  contentContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 8,
  },
  navButton: {
    padding: 8,
  },
  navButtonIcon: {
    height: 20,
    width: 20,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: commonTheme.TEXT_SIZE_LARGE,
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export { componentStyle };
