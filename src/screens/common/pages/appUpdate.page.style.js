import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  currentVersionContainer: {
    backgroundColor: commonTheme.COLOR_FADED,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  installVersionContainer: {
    ...commonStyle.contentCenter,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  versionTextStyle: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  installVersionText: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
});

export { pageStyle };
