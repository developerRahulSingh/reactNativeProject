import { StyleSheet } from 'react-native';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  keyboardScrollViewContentStyle: {
    alignItems: 'center',
  },
  supportMailButtonContainer: {
    borderColor: commonTheme.COLOR_FADED,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 32,
    marginTop: 20,
    overflow: 'hidden',
  },
  selectFillContainer: {
    backgroundColor: commonTheme.COLOR_PRIMARY,
    width: 8,
  },
  supportMailButtonSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
  },
  emailImageStyle: {
    height: 24,
    marginHorizontal: 16,
    width: 24,
  },
  supportMailTextStyle: {
    color: commonTheme.PRIMARY_TEXT_COLOR_LIGHT,
  },
  supportEmailAddressTextStyle: {
    marginTop: 5,
  },
});

export { pageStyle };
