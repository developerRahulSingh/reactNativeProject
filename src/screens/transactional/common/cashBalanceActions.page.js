import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, ButtonWithIconAndArrow, ScreenTitleImage } from '../../common/components';
import { pageStyle } from './cashBalanceActions.page.style';

export default class CashBalanceActionsPage extends BasePage {

  constructor(props) {
    super(props);
  }

  componentDidMount = async (): void => {
    this.props.setComponentID(this.props.componentId);
  };

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('cashBalanceActionsPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={pageStyle.subContainerViewStyle}>
          <ScreenTitleImage imageAsset={require('../../../assets/withdraw-amount-icon.png')}/>

          <ButtonWithIconAndArrow
            imageLink={require('../../../assets/menu.investment.icon.png')}
            titleDescription={strings('cashBalanceActionsPage.label_button_invest')}
            disableButton={this.props.GoalDashboard.CashBalance <= 0}
            buttonClickEvent={async () => {
              if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
                return this._showAggregateKycStatusErrorPopup(true);
              } else {
                if (Object.keys(this.props.GoalAllocation).length === 0) {
                  this._showGoalAllocationErrorPopup(true);
                  // return NavigationUtil.showAlert({
                  //   messageText: strings('common.alert_already_portfolio_allocation'),
                  //   alertTitle: strings('common.title_alert_allocation_required'),
                  //   leftButtonText: strings('common.label_alert_button_later'),
                  //   rightButtonText: strings('common.label_alert_button_Continue'),
                  //   onRightButtonPress: async () => {
                  //     await interfaces.getGoalAllocation()
                  //       .then(async (result) => {
                  //         this.props.storeGoalAllocation(result);
                  //         return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Investment.InvestmentAmountPage);
                  //       })
                  //       .catch(async () => {
                  //         await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.BuildPortfolioPage);
                  //       });
                  //   },
                  //   onLeftButtonPress: () => null,
                  // });
                } else {
                  return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Investment.InvestmentAmountPage, {
                    useCashBalance: true,
                  });
                }
              }
            }}
          />

          <ButtonWithIconAndArrow
            imageLink={require('../../../assets/menu.withdraw.icon.png')}
            titleDescription={strings('cashBalanceActionsPage.label_button_sell_from_portfolio')}
            buttonClickEvent={async () => {
              if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
                return this._showAggregateKycStatusErrorPopup(true);
              } else {
                await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.SelectSellAssetsOptionPage);
              }
            }}
          />

          <ButtonWithIconAndArrow
            imageLink={require('../../../assets/menu.fundingmethod.icon.png')}
            titleDescription={strings('cashBalanceActionsPage.label_button_withdraw_cash_balance')}
            disableButton={this.props.GoalDashboard.CashBalance <= 0}
            buttonClickEvent={async () => {
              if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
                return this._showAggregateKycStatusErrorPopup(true);
              } else {
                return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Withdraw.WithdrawAmountPage);
              }
            }}
          />

          <ButtonWithIconAndArrow
            imageLink={require('../../../assets/menu.withdraw.icon.png')}
            titleDescription={strings('cashBalanceActionsPage.label_button_deposit_to_cash_balance')}
            buttonClickEvent={async () => {
              if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
                return this._showAggregateKycStatusErrorPopup(true);
              } else {
                await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Deposit.DepositAmountPage);
              }
            }}
          />
        </View>
      </View>
    );
  }
}
