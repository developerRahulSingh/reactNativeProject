import { StyleSheet } from 'react-native';
import commonTheme from '../../../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pinViewOuterView: {
    backgroundColor: commonTheme.COLOR_PRIMARY,
    borderRadius: 32,
    marginHorizontal: 8,
    padding: 4,
  },
  pinViewInnerView: {
    borderRadius: 32,
    width: 8,
  },
});

export { componentStyle };
