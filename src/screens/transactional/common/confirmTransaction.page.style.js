import { StyleSheet } from 'react-native';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  subContainerViewStyle: {
    paddingHorizontal: 16,
  },
  textMediumMarginTopStyle: {
    ...fontFamilyStyles.mediumText,
    marginTop: 16,
  },
  soldCurrencyListContainerStyle: {
    padding: 16,
  },
  soldAssetsLabelContainerStyle: {
    backgroundColor:
    commonTheme.COLOR_HINT,
    marginTop: 16,
    padding: 16,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  getMessageContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  transactionalStatusContainerStyle: {
    alignItems: 'center',
  },
  soldCurrenciesTextColor: {
    color: commonTheme.COLOR_LIGHTER,
  },
  imageStyle: {
    height: 32,
    width: 32,
  },
  imageContainerStyle: {
    borderRadius: 24,
    marginEnd: 16,
    padding: 8,
  },
  soldCurrenciesContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
});

export { pageStyle };
