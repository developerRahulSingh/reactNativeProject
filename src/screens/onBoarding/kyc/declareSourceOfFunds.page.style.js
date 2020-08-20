import { StyleSheet } from 'react-native';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  flatListEmptyTextStyle: {
    textAlign: 'center',
  },
  flatListsContainerStyle: {
    flex: 1,
  },
  flatListsContentContainerStyle: {
    paddingHorizontal: 16,
  },
  pageColorStyle: {
    backgroundColor: commonTheme.COLOR_PRIMARY_DARK,
  },
  renderListButtonStyle: {
    borderBottomColor: commonTheme.COLOR_HINT,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  renderListTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  renderListImageStyle: {
    height: 16,
    width: 16,
  },
});

export { pageStyle };

