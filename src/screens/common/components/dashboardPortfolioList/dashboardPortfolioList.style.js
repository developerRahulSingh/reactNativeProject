import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  cardViewContainer: {
    padding: 8,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
  },
  moreOptionContainer: {
    alignItems: 'center',
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  moreOptionSubContainer: {
    height: 32,
    justifyContent: 'center',
  },
  coinContainer: {
    padding: 8,
  },
});

export { componentStyle };
