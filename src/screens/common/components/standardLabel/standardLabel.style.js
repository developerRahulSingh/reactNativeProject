import { StyleSheet } from 'react-native';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  title: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_DEFAULT,
  },
  requiredIndicatorStyle: {
    marginLeft: 4,
  },
});

export { componentStyle };
