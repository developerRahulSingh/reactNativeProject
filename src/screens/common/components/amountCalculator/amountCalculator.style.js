import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  mainContainer: {
    alignItems: 'stretch',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  contentContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    flex: 1,
    flexDirection: 'row',
  },
  errorText: {
    color: commonTheme.COLOR_DANGER,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    textAlign: 'center',
  },
  coinInfoLabel: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    paddingBottom: 8,
  },
  coinInfoContainer: {
    flex: 1,
  },
  coinInfoValueText: {
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  errorContainer: {
    padding: 8,
  },
});

export { componentStyle };
