import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDirection from '../../../constants/payment.instrument.direction.enum';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, DecimalMaskedTextInput, LightText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './withdrawAmount.page.style';

export default class WithdrawAmountPage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      enteredWithdrawAmount: '',
      errorMessage: '',
      withdrawAllCashBalance: false,
    });
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    let numberWithdrawAmount = parseFloat(this.state.enteredWithdrawAmount);
    if (!numberWithdrawAmount || (numberWithdrawAmount < this.props.GoalCurrency.MinWithdrawalAmount) || (this.props.GoalCurrency.MaxWithdrawalAmount < numberWithdrawAmount)) {
      this.setState({
        errorMessage: strings('withdrawAmountPage.error_invalid_amount', {
          minAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MinWithdrawalAmount).toFixed(this.props.GoalCurrency.Precision),
          maxAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MaxWithdrawalAmount).toFixed(this.props.GoalCurrency.Precision),
        }),
        enableNextBtn: false,
      });
      return;
    } else if (!numberWithdrawAmount || this.props.GoalDashboard.CashBalance < numberWithdrawAmount) {
      this.setState({
        errorMessage: strings('withdrawAmountPage.error_more_than_have'),
        enableNextBtn: false,
      });
      return;
    }
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.SelectPaymentInstrumentTypePage, {
      transactionAmount: this.state.enteredWithdrawAmount === this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision) ?
        this.props.GoalDashboard.CashBalance :
        parseFloat(numberWithdrawAmount.toFixed(this.props.GoalCurrency.Precision)),
      direction: paymentInstrumentDirection.Withdraw,
      withdrawAll: !!this.state.withdrawAllCashBalance || this.state.enteredWithdrawAmount === this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision),
      purpose: 'withdraw',
    });
  };

  _handleWithdrawInput = (amount) => {
    this.setState({
      enteredWithdrawAmount: amount,
      enableNextBtn: amount > 0,
      errorMessage: '',
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('withdrawAmountPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false}
                                 contentContainerStyle={pageStyle.paddingHorizontal}>
          <ScreenTitleImage imageAsset={require('../../../assets/withdraw-partial-icon.png')}
                            descriptionText={strings('withdrawAmountPage.description')}/>
          <View style={[pageStyle.cashBalanceInfoContainer, pageStyle.maxCashBalanceSwitchContainer]}>
            <RegularText style={pageStyle.textColor}>
              {strings('withdrawAmountPage.label_cash_balance')}
            </RegularText>
            <LightText style={[pageStyle.textColor, pageStyle.marginEnd]}>
              {this.props.GoalCurrency.CurrencySymbol + this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision)}
            </LightText>
          </View>
          {!!this.props.GoalDashboard?.CashBalance ?
            <>
              <View style={pageStyle.maxCashBalanceSwitchContainer}>
                <SwitchButton
                  value={this.state.withdrawAllCashBalance}
                  onValueChange={withdrawAllCashBalance => this.setState({withdrawAllCashBalance}, () => {
                      if (withdrawAllCashBalance) {
                        this._handleWithdrawInput(this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision));
                      }
                    },
                  )}
                />
                <RegularText style={[pageStyle.textColor, pageStyle.marginStart]}>
                  {strings('withdrawAmountPage.label_use_max_amount')}
                </RegularText>
              </View>
              <View style={[pageStyle.decimalInputContainer, pageStyle.paddingHorizontal]}>
                <DecimalMaskedTextInput
                  onSubmitEditing={this._onNextButtonPressed}
                  currencySymbol={this.props.GoalCurrency.CurrencySymbol}
                  onValidAmountAvailable={(amount) => {
                    this._handleWithdrawInput(amount);
                  }}
                  editable={!this.state.withdrawAllCashBalance}
                  value={this.state.enteredWithdrawAmount}
                  errorMessage={this.state.errorMessage}
                  placeHolderText={strings('withdrawAmountPage.placeholder_enter_amount')}
                />
              </View>
            </>
            :
            <View style={pageStyle.paddingHorizontal}>
              <RegularText style={pageStyle.cashBalanceErrorText}>
                {strings('withdrawAmountPage.error_not_enough_cash_balance')}
              </RegularText>
            </View>}
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          {!!this.props.GoalDashboard?.CashBalance ?
            <StandardButton
              onPress={this._onNextButtonPressed}
              color={commonTheme.COLOR_PRIMARY_DARK}
              disabled={!this.state.enableNextBtn}
              labelText={strings('withdrawAmountPage.label_button_next')}
            />
            :
            <StandardButton
              onPress={this._backButton}
              color={commonTheme.COLOR_PRIMARY_DARK}
              labelText={strings('withdrawAmountPage.label_button_go_back')}
            />
          }
        </View>
      </View>
    );
  }
}
