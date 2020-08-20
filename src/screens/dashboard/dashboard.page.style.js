import { StyleSheet } from 'react-native';
import { commonStyle } from '../../styles/common.style';
import fontFamilyStyles from '../../styles/font.style';
import commonTheme from '../../themes/common.theme';

const flexCommonStyle = {
  flex: 1,
};

const arrowImageSize = {
  height: 20,
  width: 20,
};

const pageStyle = StyleSheet.create({
  contentContainerStyle: {
    ...flexCommonStyle,
  },
  linearGradientView: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  keyboardScrollViewContentContainer: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  headerButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  portfolioInfoMainContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  portfolioInfoRowCommonContainer: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  portfolioInfoStaticLabelRowContainer: {
    marginBottom: 4,
  },
  portfolioInfoDynamicLabelRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentValueTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_LARGE,
  },
  portfolioInfoRowSecondValueContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  portfolioInfoRowSecondValueTextStyle: {
    marginEnd: 8,
  },
  gainImageStyle: {
    height: 12,
    width: 12,
  },
  currentReturnValueInfoContainer: {
    backgroundColor: commonTheme.COLOR_PRIMARY + '1F',
  },
  investGainValueInfoContainer: {
    backgroundColor: commonTheme.COLOR_SECONDARY + '1F',
    marginTop: 16,
  },
  investValueTextStyle: {
    fontSize: commonTheme.TEXT_SIZE_EXTRA_SMALL,
  },
  myPortfolioContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    borderBottomWidth: 1,
    borderColor: commonTheme.COLOR_LIGHTEST,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  myPortfolioLabelContainer: {
    justifyContent: 'center',
  },
  chartToggleImageStyle: {
    height: 32,
    width: 32,
  },
  cashBalanceViewContainer: {
    backgroundColor: commonTheme.COLOR_BRIGHT,
    padding: 16,
  },
  cashBalanceViewSubContainer: {
    ...flexCommonStyle,
    flexDirection: 'row',
  },
  cashBalanceViewRowContainer: {
    ...flexCommonStyle,
    backgroundColor: commonTheme.COLOR_HINT,
    borderBottomStartRadius: 8,
    borderTopStartRadius: 8,
    padding: 16,
  },
  cashBalanceArrowContainer: {
    ...commonStyle.contentCenter,
    aspectRatio: 1,
    backgroundColor: commonTheme.COLOR_HINT,
    borderBottomRightRadius: 8,
    borderLeftColor: commonTheme.COLOR_BRIGHT,
    borderLeftWidth: 2,
    borderTopRightRadius: 8,
  },
  cashBalanceArrowImageStyle: {
    ...arrowImageSize,
    tintColor: commonTheme.COLOR_DEFAULT_LIGHT,
  },
  donutChartContainer: {
    ...flexCommonStyle,
    ...commonStyle.contentCenter,
  },
  userInfoContainerStyle: {
    backgroundColor: commonTheme.COLOR_PRIMARY_DARK,
  },
  userInfoSubContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 24,
    paddingStart: 32,
    paddingVertical: 12,
  },
  userNameTextStyle: {
    fontSize: fontFamilyStyles.largeText.fontSize,
    color: commonTheme.COLOR_BRIGHT,
  },
  userLevelTextStyle: {
    ...fontFamilyStyles.smallText,
    color: commonTheme.COLOR_FADED,
  },
  upgradeNowTextStyle: {
    ...fontFamilyStyles.smallText,
    color: commonTheme.COLOR_SECONDARY + 'CF',
  },
  userProfilePictureButtonContainer: {
    ...commonStyle.contentCenter,
    height: 36,
  },
  userProfilePictureWithArrowImageContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  userProfilePictureContainer: {
    aspectRatio: 1,
    borderColor: commonTheme.COLOR_SECONDARY,
    borderRadius: 69,
    borderWidth: 1,
    overflow: 'hidden',
  },
  userImageStyle: {
    aspectRatio: 1,
    height: 38,
    width: 38,
  },
  arrowImageStyle: {
    ...arrowImageSize,
    marginHorizontal: 4,
    resizeMode: 'contain',
    tintColor: commonTheme.COLOR_BRIGHT,
  },
  kycStatusIndicatorStyle: {
    position: 'absolute',
    top: 8,
    right: 50,
    zIndex: 10,
    width: 18,
    height: 18,
    borderColor: commonTheme.COLOR_PRIMARY_DARK,
    borderWidth: 2,
    borderRadius: 9,
  },
});

export { pageStyle };
