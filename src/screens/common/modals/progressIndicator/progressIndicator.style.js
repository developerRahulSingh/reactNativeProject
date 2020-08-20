import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  backdrop: {
    ...commonStyle.contentCenter,
    ...commonStyle.modalScreenContainer,
    backgroundColor: commonTheme.COLOR_DARK + '7F',
    left: 0,
    paddingHorizontal: 32,
    paddingVertical: 64,
    position: 'absolute',
    top: 0,
  },
});

export { componentStyle };
