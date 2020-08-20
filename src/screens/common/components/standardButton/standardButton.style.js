import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  container: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  labelStyle: {
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
  },
});

export { componentStyle };
