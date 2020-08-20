import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDirection from '../../../constants/payment.instrument.direction.enum';
import paymentInstrumentDisplayName from '../../../constants/payment.instrument.display.name.enum';
import screenId from '../../../constants/screen.id.enum';
import { PITypeEntity, PITypeTransferServiceTypesEntity, TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, DecimalMaskedTextInput, LightText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './investmentAmount.page.style';

export default class InvestmentAmountPage extends BasePage {

  constructor(props) {
    super(props, {
      enableNextBtn: false,
      transactionAmount: '',
      errorMessage: '',
    });
  }

  componentDidMount(): void {
    if (this.props.navigationProps.useCashBalance) {
      this.setState({useCashBalance: this.props.navigationProps.useCashBalance});
    }
  }

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    let numberInvestmentAmount = parseFloat(this.state.transactionAmount);
    if (!!this.state.useCashBalance) {
      if (this.props.GoalDashboard.CashBalance < this.props.GoalCurrency.MinDepositAmount) {
        this.setState({
          errorMessage: strings('investmentAmountPage.error_minimum_cash_balance', {
            minAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MinDepositAmount).toFixed(this.props.GoalCurrency.Precision),
          }),
          enableNextBtn: false,
        });
        return;
      }
      if (!numberInvestmentAmount || numberInvestmentAmount < this.props.GoalCurrency.MinDepositAmount || numberInvestmentAmount > this.props.GoalDashboard.CashBalance) {
        this.setState({
          errorMessage: strings('investmentAmountPage.error_invalid_amount', {
            minAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MinDepositAmount).toFixed(this.props.GoalCurrency.Precision),
            maxAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalDashboard.CashBalance).toFixed(this.props.GoalCurrency.Precision),
          }),
          enableNextBtn: false,
        });
        return;
      }
      await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.ConfirmTransactionPage, {
        transactionAmount: this.state.transactionAmount === this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision) ?
          this.props.GoalDashboard.CashBalance :
          numberInvestmentAmount,
        piType: this._buildCashBalancePIType(),
        purpose: 'investment',
      });
    } else {
      if (!numberInvestmentAmount || numberInvestmentAmount < this.props.GoalCurrency.MinDepositAmount || numberInvestmentAmount > this.props.GoalCurrency.MaxDepositAmount) {
        this.setState({
          errorMessage: strings('investmentAmountPage.error_invalid_amount', {
            minAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MinDepositAmount).toFixed(this.props.GoalCurrency.Precision),
            maxAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MaxDepositAmount).toFixed(this.props.GoalCurrency.Precision),
          }),
          enableNextBtn: false,
        });
        return;
      }
      await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.SelectPaymentInstrumentTypePage, {
        transactionAmount: numberInvestmentAmount,
        direction: paymentInstrumentDirection.Deposit,
        purpose: 'investment',
      });
    }
  };

  _buildCashBalancePIType = () => {
    let cashBalanceOption = new PITypeTransferServiceTypesEntity();
    let piPaymentInstrumentForCashBalance = new PITypeEntity();
    piPaymentInstrumentForCashBalance.PITypeDisplayName = paymentInstrumentDisplayName.CashBalance;
    piPaymentInstrumentForCashBalance.PITypeName = paymentInstrumentDisplayName.CashBalance;
    piPaymentInstrumentForCashBalance.PITypeID = '0';
    piPaymentInstrumentForCashBalance.disabled = !this.props.GoalDashboard?.CashBalance;
    cashBalanceOption.PIType = piPaymentInstrumentForCashBalance;
    let tsPaymentInstrumentForCashBalance = new TSTypeEntity();
    tsPaymentInstrumentForCashBalance.TSTypeDisplayName = 'Cash';
    tsPaymentInstrumentForCashBalance.TSTypeName = 'Cash';
    tsPaymentInstrumentForCashBalance.TSTypeID = '0';
    tsPaymentInstrumentForCashBalance.Selected = true;
    cashBalanceOption.PITransferServiceTypes = [tsPaymentInstrumentForCashBalance];
    return cashBalanceOption;
  };

  _checkInvestmentAmount = (amount) => {
    this.setState({
      transactionAmount: amount,
      enableNextBtn: amount > 0,
      errorMessage: '',
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('investmentAmountPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage imageAsset={require('../../../assets/dollars_colis_circle.png')}
                            descriptionText={strings('investmentAmountPage.description')}/>
          {!!this.props.GoalDashboard?.CashBalance ?
            <View style={pageStyle.switchViewStyle}>
              {this.props.navigationProps.useCashBalance ?
                null : <View style={[pageStyle.mainSwitchButtonViewStyle, pageStyle.cashBalanceLabelViewStyle]}>
                  <RegularText style={pageStyle.textColor}>
                    {strings('investmentAmountPage.label_use_cash_balance')}
                  </RegularText>
                  <SwitchButton
                    value={this.state.useCashBalance}
                    onValueChange={useCashBalance => this.setState({useCashBalance}, () => {
                      if (!useCashBalance) {
                        this.setState({
                          useMaximumCashBalance: false,
                          errorMessage: '',
                        });
                      }
                    })}
                  />
                </View>}
              {this.state.useCashBalance ?
                <>
                  <View style={pageStyle.cashBalanceLabelViewStyle}>
                    <RegularText style={pageStyle.textColor}>
                      {strings('investmentAmountPage.label_cash_balance')}
                    </RegularText>
                    <LightText style={[pageStyle.textColor, pageStyle.marginEnd]}>
                      {this.props.GoalCurrency.CurrencySymbol + this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision)}
                    </LightText>
                  </View>
                  <View style={pageStyle.switchButtonViewStyle}>
                    <SwitchButton
                      value={this.state.useMaximumCashBalance}
                      onValueChange={useMaximumCashBalance => this.setState({useMaximumCashBalance}, () => {
                          if (useMaximumCashBalance) {
                            this._checkInvestmentAmount(this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision));
                          }
                        },
                      )}
                    />
                    <RegularText style={[pageStyle.textColor, pageStyle.marginStart]}>
                      {strings('investmentAmountPage.label_use_max_amount')}
                    </RegularText>

                  </View>
                </>
                : null}
            </View>
            : null}
          <View style={[commonStyle.container, pageStyle.paddingHorizontal]}>
            <DecimalMaskedTextInput onSubmitEditing={this._onNextButtonPressed}
                                    currencySymbol={this.props.GoalCurrency.CurrencySymbol}
                                    onValidAmountAvailable={(amount) => {
                                      this._checkInvestmentAmount(amount);
                                    }}
                                    editable={!this.state.useMaximumCashBalance}
                                    value={this.state.transactionAmount}
                                    errorMessage={this.state.errorMessage}
                                    placeHolderText={strings('investmentAmountPage.placeholder_enter_amount')}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('investmentAmountPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
