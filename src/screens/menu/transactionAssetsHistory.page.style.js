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
  historyItemContainer: {
    padding: 8,
  },
  historyItem: {
    padding: 8,
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderColor: commonTheme.COLOR_PRIMARY,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
  },
  transactionTypeContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingStart: 8,
  },
  transactionTypeDetailContainer: {
    alignItems: 'flex-end',
  },
  dateTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
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
    backgroundColor: commonTheme.COLOR_PRIMARY,
  },
  selectAssetButtonContainer: {
    paddingHorizontal: 16,
  },
});

export { pageStyle };
