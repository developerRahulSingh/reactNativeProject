import { Dimensions, StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  renderRowContainerStyle: {
    marginVertical: 5,
  },
  renderRowLinearGradientStyle: {
    borderRadius: 8,
  },
  renderRowButtonStyle: {
    backgroundColor: commonTheme.COLOR_TRANSPARENT,
    borderColor: commonTheme.INPUT_FIELD_BORDER_COLOR,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  flatListStyle: {
    padding: 30,
  },
  agreeTermConditionSwitchButtonContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 32,
  },
  marginStartStyle: {
    marginStart: 8,
  },
  webViewMainContainerStyle: {
    alignItems: 'center',
    backgroundColor: commonTheme.COLOR_DARK + '7F',
    height: '100%',
    width: '100%',
  },
  closeWebViewButtonStyle: {
    alignItems: 'flex-end',
    height: 30,
    marginBottom: 5,
    marginTop: 50,
    width: '90%',
  },
  closeButtonStyle: {
    height: 30,
    width: 30,
  },
  closeButtonImageStyle: {
    height: 20,
    width: 20,
  },
  webViewContainerStyle: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 8,
    height: Dimensions.get('window').height - 200,
    overflow: 'hidden',
    padding: 10,
    width: '90%',
  },
  webViewStyle: {
    borderRadius: 8,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
});

export { pageStyle };
