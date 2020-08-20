import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  donutChartContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  donutChartStyle: {
    alignItems: 'center',
    width: '100%',
  },
  linearGradientStyle: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

export { pageStyle };
