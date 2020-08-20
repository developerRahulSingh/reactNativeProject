import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  linearStyle: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  flatListStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    marginHorizontal: 16,
    paddingHorizontal: 8,
  },
  renderCoinTileStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    flex: 1 / 3,
    height: '100%',
    padding: 8,
  },
  renderListHeaderStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export { pageStyle };
