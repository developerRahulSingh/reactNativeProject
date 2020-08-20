import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  historyItemContainer: {
    flex: 1,
    padding: 8,
  },
  mainContainer: {
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderRadius: 4,
    borderWidth: 1,
    margin: 8,
  },
  infoContainer: {
    padding: 8,
  },
  transactionTypeContainer: {
    ...commonStyle.container,
    paddingStart: 8,
  },
  dateTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  contentAlignmentEnd: {
    alignItems: 'flex-end',
  },
  tsTypeTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  coinItemMainContainer: {
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinImageContainer: {
    marginEnd: 8,
  },
  coinImageStyle: {
    borderRadius: 24,
    height: 40,
    width: 40,
  },
  coinItemMainSubContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  piDisplayNameContainer: {
    paddingStart: 16,
    flexDirection: 'row',
  },
  feesContainer: {
    paddingStart: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusIndicatorLineStyle: {
    width: 8,
    borderRadius: 4,
  },
  flexDirectionStyle: {
    flexDirection: 'row',
  },
});

export { pageStyle };
