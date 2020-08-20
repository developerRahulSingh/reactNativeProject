import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  container: {
    backgroundColor: commonTheme.COLOR_DARK,
    borderRadius: 30,
    height: 30,
    width: 71,
  },
  animatedContainer: {
    ...commonStyle.contentCenter,
    flex: 1,
    flexDirection: 'row',
    width: 78,
  },
  circle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  text: {
    backgroundColor: commonTheme.COLOR_TRANSPARENT,
    color: commonTheme.COLOR_BRIGHT,
  },
  paddingRight: {
    paddingRight: 5,
  },
  paddingLeft: {
    paddingLeft: 5,
  },
});

export { componentStyle };
