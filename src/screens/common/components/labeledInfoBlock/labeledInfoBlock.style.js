import { StyleSheet } from 'react-native';
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
  },
  title: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_DEFAULT,
  },
  textValue: {
    flex: 1,
    fontFamily: commonTheme.FONT_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  image: {
    alignSelf: 'center',
    height: 20,
    marginLeft: 8,
    width: 20,
  },
  dropButtonImage: {
    height: 12,
    marginHorizontal: 8,
    width: 12,
  },
});

export { componentStyle };
