import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  subContainerStyle: {
    flex: 1,
    paddingHorizontal: 30,
  },
  savedLabelStyle: {
    ...fontFamilyStyles.mediumText,
    marginBottom: 8,
    textAlign: 'center',
  },
  paymentInstrumentContainerStyle: {
    ...commonStyle.contentCenter,
    backgroundColor: commonTheme.COLOR_FADED,
    borderRadius: 8,
    margin: 32,
    padding: 16,
  },
  paymentInstrumentListContainerStyle: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  displayNameLabelStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
    paddingBottom: 8,
  },
});

export { pageStyle };
