import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../base.page';
import { BackNavTitle, ScreenTitleImage, StandardButton } from '../components';
import { pageStyle } from './upgradeToVIP.page.style';

export default class UpgradeToVIPPage extends BasePage {

  constructor(props) {
    super(props);
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  _onContinueButtonPressed = () => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      let assetUnPurchased = this.props.GoalDashboard.UnpurchasedCoins.find(curr => curr.CurrencyCode === 'B21');
      let coinInfo = {};
      if (!!assetUnPurchased) {
        coinInfo.AssetAmount = 0;
        coinInfo.Balance = 0;
        coinInfo.CurrencyCode = assetUnPurchased.CurrencyCode;
        coinInfo.GoalCurrencyConversionRate = assetUnPurchased.GoalCurrencyConversionRate;
      } else {
        let asset = this.props.GoalDashboard.AssetPerformances.find(curr => curr.CurrencyCode === 'B21');
        coinInfo.AssetAmount = asset.AssetAmount;
        coinInfo.Balance = asset.Balance;
        coinInfo.CurrencyCode = asset.CurrencyCode;
        coinInfo.GoalCurrencyConversionRate = asset.GoalCurrencyConversionRate;
      }
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.CoinInfoPage, {
        AssetAmount: coinInfo.AssetAmount,
        AssetCurrencyCode: coinInfo.CurrencyCode,
        Balance: coinInfo.Balance,
        GoalCurrencyConversionRate: coinInfo.GoalCurrencyConversionRate,
        purpose: 'buySingle',
      });
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('upgradeToVIPPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.COLOR_DEFAULT_LIGHT}/>
        <ScreenTitleImage imageAsset={require('../../../assets/b21_logo.png')}
                          descriptionText={strings('upgradeToVIPPage.description')}
                          showLargeDescription={true}
                          descriptionTextColor={commonTheme.PRIMARY_TEXT_COLOR_DARK}
        />
        <View style={[commonStyle.bottomButtonContainer, pageStyle.continueButtonStyle]}>
          <StandardButton
            color={commonTheme.COLOR_PRIMARY_DARK}
            onPress={this._onContinueButtonPressed}
            labelText={strings('upgradeToVIPPage.label_button_continue')}
          />
        </View>
      </View>
    );
  }
}
