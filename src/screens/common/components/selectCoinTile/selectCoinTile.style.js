import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  selectionMarkContainer: {
    borderTopStartRadius: 7,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  selectionMark: {
    height: 40,
    width: 40,
  },
  currencyLabel: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    marginTop: 4,
    textAlign: 'center',
  },
  currencyIconContainer: {
    borderRadius: 32,
    padding: 8,
  },
  currencyIcon: {
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  contentContainer: {
    alignItems: 'center',
    borderColor: commonTheme.COLOR_LIGHT,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 16,
  },
});

export { componentStyle };
