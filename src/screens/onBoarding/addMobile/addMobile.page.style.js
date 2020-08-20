import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 32,
  },
  subContainer: {
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_LIGHTEST,
    flexDirection: 'row',
  },
  flagButtonContainer: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
  },
  flagImageStyle: {
    height: 24,
    marginHorizontal: 8,
    width: 32,
  },
  dropImageStyle: {
    height: 8,
    width: 8,
  },
  phonePrefixContainer: {
    ...commonStyle.contentCenter,
    paddingHorizontal: 8,
  },
  phonePrefixTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_MEDIUM,
  },
  textInputStyle: {
    flex: 1,
  },
});

export { pageStyle };
