import { StyleSheet } from 'react-native';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  rowItemContainer: {
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
  },
  linearGradientContainer: {
    borderRadius: 8,
    flex: 1,
  },
  rowItemSubContainer: {
    backgroundColor: commonTheme.COLOR_TRANSPARENT,
    borderColor: commonTheme.INPUT_FIELD_BORDER_COLOR,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowItemTextStyle: {
    color: commonTheme.PRIMARY_TEXT_COLOR_LIGHT,
    textAlign: 'center',
  },
  listStyle: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  webViewMainContainer: {
    alignItems: 'center',
    backgroundColor: commonTheme.COLOR_DARK + '7F',
    height: '100%',
    width: '100%',
  },
  webViewCloseButtonContainer: {
    alignItems: 'flex-end',
    height: 30,
    marginBottom: 5,
    marginTop: 40,
    width: '90%',
  },
  webViewCloseButtonSubContainer: {
    alignItems: 'flex-end',
    height: 40,
    width: 40,
  },
  webViewCloseButtonImageStyle: {
    height: 20,
    width: 20,
  },
  webViewContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 4,
    height: '85%',
    overflow: 'hidden',
    padding: 10,
    width: '90%',
  },
  webviewStyle: {
    borderRadius: 8,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
});

export { pageStyle };
