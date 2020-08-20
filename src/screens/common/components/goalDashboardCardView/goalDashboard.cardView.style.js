import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';

const coinImageSizeObj = {
  height: 48,
  width: 48,
};

const coinCheckMarkSizeObj = {
  height: 40,
  width: 40,
};

const componentStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentSubContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  coinInfoContainer: {
    flex: 1,
  },
  coinImage: {
    ...coinImageSizeObj,
  },
  coinImageContainer: {
    ...coinImageSizeObj,
    borderRadius: 24,
    marginRight: 8,
  },
  rateText: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  coinRateCurrencySymbolText: {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  buyNowButtonContainer: {
    alignSelf: 'center',
    backgroundColor: commonTheme.COLOR_PRIMARY,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buyNowButtonText: {
    alignSelf: 'center',
    color: commonTheme.COLOR_BRIGHT,
    fontSize: commonTheme.TEXT_SIZE_DEFAULT,
    justifyContent: 'center',
  },
  coinInfoConditionalContainer: {
    alignItems: 'flex-end',
  },
  coinBalanceText: {
    color: commonTheme.PRIMARY_TEXT_COLOR_LIGHT,
    fontSize: commonTheme.TEXT_SIZE_DEFAULT,
  },
  percentagePerformanceContainer: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
  },
  percentagePerformanceText: {
    fontSize: commonTheme.TEXT_SIZE_SMALL,
  },
  gainReturnImage: {
    alignSelf: 'center',
    height: 12,
    width: 12,
  },
  coinCheckMarkImage: {
    ...coinCheckMarkSizeObj,
  },
  coinCheckMarkContainer: {
    ...coinCheckMarkSizeObj,
    borderTopStartRadius: 7,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
});

export { componentStyle };
