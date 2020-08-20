import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  backdrop: {
    ...commonStyle.contentCenter,
    ...commonStyle.modalScreenContainer,
    backgroundColor: commonTheme.COLOR_DARK + '7F',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  container: {
    ...commonStyle.modalContainer,
    backgroundColor: commonTheme.COLOR_TRANSPARENT,
    borderRadius: 16,
  },
  listView: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    padding: 8,
  },
  subContainer: {
    flex: 1,
  },
  labelContainer: {
    paddingVertical: 8,
  },
  labelTextStyle: {
    textAlign: 'center',
  },
});

export { componentStyle };
