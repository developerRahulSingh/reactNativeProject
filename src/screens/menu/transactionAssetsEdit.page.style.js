import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  contentMainContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  infoContainer: {
    ...commonStyle.contentCenter,
    borderColor: commonTheme.COLOR_PRIMARY,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    flexDirection: 'row',
  },
  idContainer: {
    flex: 1,
  },
  dateAmountInfoContainer: {
    alignItems: 'flex-end',
  },
  dateTimePickerContainerStyle: {
    backgroundColor: commonTheme.COLOR_DEFAULT + '7F',
    flex: 1,
    justifyContent: 'flex-end',
  },
  dateTimePickerDoneButtonContainerStyle: {
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_DEFAULT_LIGHT,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'flex-end',
    padding: 16,
  },
  dateTimePickerBGColor: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
  },
});

export { pageStyle };
