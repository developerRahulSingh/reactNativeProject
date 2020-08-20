import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  listContentContainerStyle: {
    padding: 8,
  },
  noItemDisplayContainer: {
    ...commonStyle.contentCenter,
  },
  noItemDisplayTextStyle: {
    color: commonTheme.COLOR_LIGHTER,
  },
  transactionPendingTextStyle: {
    color: commonTheme.COLOR_WARNING,
  },
  transactionFailedTextStyle: {
    color: commonTheme.COLOR_DANGER,
  },
  transactionCompleteTextStyle: {
    color: commonTheme.COLOR_SUCCESS,
  },
  historyItemContainer: {
    padding: 8,
  },
  historyItem: {
    padding: 8,
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
  },
  transactionTypeContainer: {
    ...commonStyle.container,
    paddingStart: 8,
  },
  transactionTypeDetailContainer: {
    alignItems: 'flex-end',
  },
  dateTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  tsTypeTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  arrowImageContainer: {
    ...commonStyle.contentCenter,
    paddingStart: 8,
  },
  arrowImageSubContainer: {
    height: 16,
    width: 20,
  },
  arrowImageStyle: {
    tintColor: commonTheme.COLOR_PRIMARY,
  },
  statusIndicatorLineStyle: {
    width: 8,
    borderRadius: 4,
  },
});

export { pageStyle };
