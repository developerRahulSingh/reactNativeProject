import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';

const pageStyle = StyleSheet.create({
  subContainerStyle: {
    backgroundColor: commonTheme.COLOR_HINT,
    flexDirection: 'row',
    padding: 16,
  },
  exchangeRateContainerStyle: {
    alignItems: 'center',
    flex: 1,
  },
  coinNameContainerStyle: {
    borderRightColor: commonTheme.COLOR_FADED,
    borderRightWidth: 2,
  },
  separatorStyle: {
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: commonTheme.COLOR_LIGHT,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  infoTextContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingEnd: 4,
  },
  infoCopyButtonContainer: {
    ...commonStyle.contentCenter,
    backgroundColor: commonTheme.COLOR_PRIMARY,
    borderRadius: 8,
    padding: 8,
    height: 40,
    width: 40,
  },
  infoCopyButtonImageStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  qrCodeContainer: {
    alignSelf: 'center',
    paddingBottom: 16,
  },
  infoContentContainer: {
    margin: 16,
  },
});

export { pageStyle };
