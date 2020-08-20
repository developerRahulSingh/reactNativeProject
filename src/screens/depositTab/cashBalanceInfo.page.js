import React from 'react';
import { View } from 'react-native';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { LightText, RegularText, ScreenTitleImage, StandardButton } from '../common/components';
import { pageStyle } from '../depositTab/cashBalanceInfo.page.style';

export default class CashBalanceInfoPage extends BasePage {
  constructor(props) {
    super(props, {}, true);
  }

  componentDidAppear = async () => {
    super.componentDidAppear();
    return interfaces.getGoalDashboard()
      .then((result) => {
        this.props.storeUserData({GoalDashboard: result});
      })
      .catch(() => null);
  };

  _backButtonHandler = async () => {
    return NavigationUtil.gotoDashboardTab(this.props.componentId);
  };

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Deposit.DepositAmountPage);
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage title={strings('cashBalanceInfoPage.title')}
                          imageAsset={require('../../assets/dollars_colis_circle.png')}
                          descriptionText={strings('cashBalanceInfoPage.description')}
                          handleNotch={true}
        />
        <View style={pageStyle.cashBalanceLabelViewStyle}>
          <RegularText style={pageStyle.textColor}>
            {strings('cashBalanceInfoPage.label_cash_balance')}
          </RegularText>
          <LightText style={[pageStyle.textColor, pageStyle.marginEnd]}>
            {this.props.GoalCurrency.CurrencySymbol + this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision)}
          </LightText>
        </View>
        <View style={pageStyle.bottomButtonContainerStyle}>
          <StandardButton
            color={commonTheme.COLOR_PRIMARY_DARK}
            onPress={this._onNextButtonPressed}
            labelText={strings('cashBalanceInfoPage.label_button_deposit_now')}
          />
        </View>
      </View>
    );
  }
}
