import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../../../styles/common.style';
import commonTheme from '../../../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  mainContainer: {
    padding: 8,
  },
  itemContainer: {
    ...commonStyle.contentCenter,
    aspectRatio: 3 / 2,
    flex: 1 / 3,
    padding: 8,
  },
  itemClickContainer: {
    ...commonStyle.contentCenter,
    backgroundColor: commonTheme.COLOR_PIN_NUMBER_BG,
    borderRadius: 16,
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  itemText: {
    color: commonTheme.COLOR_PRIMARY_DARK,
    fontSize: commonTheme.TEXT_SIZE_LARGE,
  },
  deleteImage: {
    height: 32,
    tintColor: commonTheme.COLOR_PRIMARY_DARK,
    width: 32,
  },
});

export { componentStyle };
