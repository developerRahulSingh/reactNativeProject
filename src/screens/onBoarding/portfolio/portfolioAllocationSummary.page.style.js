import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  renderListHeaderContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  donutChartContainerStyle: {
    alignItems: 'center',
    width: '100%',
  },
  renderHeaderListButtonStyle: {
    alignItems: 'center',
  },
  renderCoinTileContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    flex: 1 / 3,
    height: '100%',
    padding: 8,
  },
  flatListColumnWrapperStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    marginHorizontal: 16,
    paddingHorizontal: 8,
  },
  flatListContentContainerStyle: {
    paddingBottom: 24,
  },
  linearGradientStyle: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

export { pageStyle };
