import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_COLLECT_DOB_BG,
  },
  errorTextColor: {
    color: commonTheme.SECONDARY_TEXT_COLOR_LIGHT,
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
  selectDOBContainerStyle: {
    flex: 1,
    paddingHorizontal: 32,
  },
});

export { pageStyle };
