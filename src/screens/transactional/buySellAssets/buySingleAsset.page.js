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
import { AmountCalculator, BackNavTitle, LightText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './buySingleAsset.page.style';

export default class BuySingleAssetPage extends BasePage {
  constructor(props) {
    super(props, {
      useCashBalance: false,
      useMaximumCashBalance: false,
      enableNextBtn: false,
      errorMessage: '',
      calculatedAmount: 0,
      calculatedQuantity: 0,
    });
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Create Cash Balance PIType Entity
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

  //Next button Click Event
  _onNextButtonPressed = async () => {
    if ((this.props.selectedAsset.MaxBuyAmount < this.state.calculatedQuantity) || (this.state.calculatedQuantity < this.props.selectedAsset.MinBuyAmount)) {
      this.setState({
        errorMessage: strings('buySingleAssetPage.error_invalid_coin', {
          assetCurrencyCode: this.props.navigationProps.AssetCurrencyCode,
          minAmount: this.props.selectedAsset.MinBuyAmount.toFixed(this.props.selectedAsset.Precision),
          maxAmount: this.props.selectedAsset.MaxBuyAmount.toFixed(this.props.selectedAsset.Precision),
        }),
        enableNextBtn: false,
      });
      return;
    }
    if (!!this.state.useCashBalance) {
      if (this.state.calculatedAmount > this.props.GoalDashboard.CashBalance) {
        this.setState({
          errorMessage: strings('buySingleAssetPage.error_more_than_available_cash_balance'),
          enableNextBtn: false,
        });
        return;
      }
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.ConfirmTransactionPage, {
        ...this.props.navigationProps,
        transactionAmount: this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision) === this.state.calculatedAmount.toFixed(this.props.GoalCurrency.Precision) ?
          this.props.GoalDashboard.CashBalance :
          this.state.calculatedAmount,
        piType: this._buildCashBalancePIType(),
      });
    } else {
      if (this.props.GoalCurrency.MaxDepositAmount < this.state.calculatedAmount || this.state.calculatedAmount < this.props.GoalCurrency.MinDepositAmount) {
        this.setState({
          errorMessage: strings('buySingleAssetPage.error_deposit_amount_limit', {
            minAmount: this.props.GoalCurrency.MinDepositAmount.toFixed(this.props.GoalCurrency.Precision),
            maxAmount: this.props.GoalCurrency.MaxDepositAmount.toFixed(this.props.GoalCurrency.Precision),
          }),
          enableNextBtn: false,
        });
        return;
      }
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.SelectPaymentInstrumentTypePage, {
        ...this.props.navigationProps,
        transactionAmount: this.state.calculatedAmount,
        direction: paymentInstrumentDirection.Deposit,
      });
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('buySingleAssetPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.COLOR_DEFAULT_LIGHT}/>
        <KeyboardAwareScrollView bounces={true} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage
            imageAsset={{uri: `${this.props.CurrencyImageBaseURL}${this.props.navigationProps.AssetCurrencyCode}/symbol.png`}}
            imageAssetBackground={this.props.selectedAsset.HexCode}
            descriptionText={strings('buySingleAssetPage.description')}
          />
          {!!this.props.GoalDashboard?.CashBalance ?
            <>
              <View style={[pageStyle.cashBalanceContainer, pageStyle.assetBalanceContainer]}>
                <RegularText style={pageStyle.textColor}>
                  {strings('buySingleAssetPage.label_use_cash_balance')}
                </RegularText>
                <SwitchButton
                  value={this.state.useCashBalance}
                  onValueChange={useCashBalance => this.setState({useCashBalance}, () => {
                    if (!useCashBalance) {
                      this.setState({
                        useMaximumCashBalance: false,
                        errorMessages: '',
                      });
                    }
                  })}
                />
              </View>
              {this.state.useCashBalance ?
                <>
                  <View style={pageStyle.assetBalanceContainer}>
                    <RegularText style={pageStyle.textColor}>
                      {strings('buySingleAssetPage.label_cash_balance')}
                    </RegularText>
                    <LightText style={[pageStyle.textColor, pageStyle.marginStyle]}>
                      {this.props.GoalCurrency.CurrencySymbol + this.props.GoalDashboard.CashBalance.toFixed(this.props.GoalCurrency.Precision)}
                    </LightText>
                  </View>
                  <View style={pageStyle.switchContainer}>
                    <SwitchButton
                      value={this.state.useMaximumCashBalance}
                      onValueChange={useMaximumCashBalance => this.setState({useMaximumCashBalance})}
                      disabled={this.props.GoalDashboard.CashBalance <= 0}
                    />
                    <RegularText style={[pageStyle.switchButtonLabelStyle, pageStyle.textColor]}>
                      {strings('buySingleAssetPage.label_use_full_cash_balance')}
                    </RegularText>
                  </View>
                </>
                : null}
            </>
            : null}
          <AmountCalculator
            style={pageStyle.amountCalculatorStyle}
            initialAmount={this.state.useMaximumCashBalance ? this.props.GoalDashboard.CashBalance : null}
            initialAmountPrecision={this.props.GoalCurrency.Precision}
            initialQuantityPrecision={this.props.selectedAsset.Precision}
            disable={!this.state.useMaximumCashBalance}
            toggleAmountQty={false}
            currencySymbol={this.props.GoalCurrency.CurrencySymbol}
            currencyCode={this.props.GoalCurrency.CurrencyCode}
            error={this.state.errorMessage}
            cryptoCurrencyCode={this.props.navigationProps.AssetCurrencyCode}
            goalCurrencyConversionRate={this.props.navigationProps.GoalCurrencyConversionRate}
            handleTextChange={(result) => {
              this.setState({
                calculatedAmount: parseFloat(result.Amount.toFixed(this.props.GoalCurrency.Precision)),
                calculatedQuantity: parseFloat(result.Quantity.toFixed(this.props.selectedAsset.Precision)),
                enableNextBtn: result.Amount > 0,
                errorMessage: '',
              });
            }}
            onSubmitEditing={this._onNextButtonPressed}
          />
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            onPress={this._onNextButtonPressed}
            labelText={strings('buySingleAssetPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
