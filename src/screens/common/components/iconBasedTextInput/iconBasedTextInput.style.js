import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  mainContainer: {
    alignItems: 'stretch',
  },
  contentContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_LIGHTEST,
    flexDirection: 'row',
    marginBottom: 24,
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    height: 20,
    marginLeft: 8,
    resizeMode: 'contain',
    width: 20,
  },
  infoImageStyle: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  infoIconButtonStyle: {
    ...commonStyle.contentCenter,
    padding: 4,
  },
  titleMainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export { componentStyle };
