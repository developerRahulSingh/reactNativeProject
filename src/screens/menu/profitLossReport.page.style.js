import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  descriptionTextStyle: {
    color: commonTheme.PRIMARY_TEXT_COLOR_LIGHT,
  },
  selectYearButtonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  selectYearButtonSubContainer: {
    alignItems: 'center',
    borderBottomColor: commonTheme.COLOR_HINT,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  dropSolidImageStyle: {
    height: 10,
    marginHorizontal: 5,
    width: 10,
  },
  selectYearTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_EXTRA_SMALL,
  },
  pdfExcelSelectionContainer: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
    marginTop: 20,
  },
  switchButtonContainerStyle: {
    marginHorizontal: 8,
  },
  bottomButtonContainerStyle: {
    ...commonStyle.bottomButtonContainer,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});

export { pageStyle };
