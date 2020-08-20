import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';

const pageStyle = StyleSheet.create({
  linearGradientViewStyle: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  subContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
  },
  headerContainer: {
    borderBottomColor: commonTheme.COLOR_LIGHTEST,
    borderBottomWidth: 1,
    borderTopColor: commonTheme.COLOR_LIGHTEST,
    borderTopWidth: 1,
    paddingVertical: 16,
  },
  headerTextStyle: {
    textAlign: 'center',
  },
  listContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  itemMainContainer: {
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 16,
  },
  itemSubContainer: {
    flexDirection: 'row',
  },
  lockUnlockButtonContainer: {
    padding: 8,
  },
  lockUnlockButtonSubContainer: {
    padding: 6,
  },
  imageStyle: {
    height: 24,
    width: 24,
  },
  contentCenter: {
    ...commonStyle.contentCenter,
  },
  coinImageStyle: {
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  percentageTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_LARGE * 2,
  },
  plusMinusButtonContainer: {
    justifyContent: 'space-between',
    padding: 8,
  },
  buttonsContainer: {
    padding: 4,
  },
  buttonsSubContainer: {
    borderRadius: 8,
    padding: 6,
  },
});

export { pageStyle };
