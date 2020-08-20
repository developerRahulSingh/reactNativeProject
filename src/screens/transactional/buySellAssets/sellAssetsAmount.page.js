import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { PITypeEntity, PITypeTransferServiceTypesEntity, TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, DecimalMaskedTextInput, LightText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './sellAssetsAmount.page.style';

export default class SellAssetsAmountPage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      assetValue: 0,
      errorMessage: '',
      withdrawAll: false,
    });
  }

  componentDidMount(): void {
    this.setState({
      assetValue: this.props.GoalDashboard.Balance - this.props.GoalDashboard.CashBalance,
    });
  }

  _buildAssetSellPIType() {
    let cashBalanceOption = new PITypeTransferServiceTypesEntity();
    let piPaymentInstrumentForCashBalance = new PITypeEntity();
    piPaymentInstrumentForCashBalance.PITypeDisplayName = 'Portfolio';
    piPaymentInstrumentForCashBalance.PITypeName = 'Portfolio';
    piPaymentInstrumentForCashBalance.PITypeID = '0';
    piPaymentInstrumentForCashBalance.disabled = false;
    cashBalanceOption.PIType = piPaymentInstrumentForCashBalance;
    let tsPaymentInstrumentForCashBalance = new TSTypeEntity();
    tsPaymentInstrumentForCashBalance.TSTypeDisplayName = this._isWithdrawingFull() ? 'Full' : 'Partial';
    tsPaymentInstrumentForCashBalance.TSTypeName = this._isWithdrawingFull() ? 'Full' : 'Partial';
    tsPaymentInstrumentForCashBalance.TSTypeID = '0';
    tsPaymentInstrumentForCashBalance.Selected = true;
    cashBalanceOption.PITransferServiceTypes = [tsPaymentInstrumentForCashBalance];
    return cashBalanceOption;
  }

  _isWithdrawingFull = () => {
    return this.state.withdrawAll ? true : this.state.transactionAmount === this.state.assetValue.toFixed(2);
  };

  _onNextButtonPressed = async () => {
    if (parseFloat(this.state.transactionAmount) <= parseFloat(this.state.assetValue.toFixed(2)) &&
      parseFloat(this.state.transactionAmount) >= this.props.GoalCurrency.MinWithdrawalAmount) {
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.ConfirmTransactionPage, {
        purpose: this._isWithdrawingFull() ? 'fullPortfolio' : 'partialPortfolio',
        transactionAmount: parseFloat(this.state.transactionAmount),
        piType: this._buildAssetSellPIType(),
      });
    } else {
      this.setState({
        errorMessage: strings('sellAssetsAmountPage.error_max_amount', {
          minAmount: this.props.GoalCurrency.CurrencySymbol + this.props.GoalCurrency.MinWithdrawalAmount,
          maxAmount: this.props.GoalCurrency.CurrencySymbol + this.state.assetValue.toFixed(2),
        }),
      });
    }
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _checkAmount = (amount) => {
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
          title={strings('sellAssetsAmountPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage imageAsset={require('../../../assets/withdraw-total-icon.png')}
                            descriptionText={strings('sellAssetsAmountPage.description')}/>
          <View style={commonStyle.container}>
            <View style={[pageStyle.subContainerStyle, pageStyle.withdrawAllSwitchContainerStyle]}>
              <RegularText style={pageStyle.textColorStyle}>
                {strings('sellAssetsAmountPage.label_current_value')}
              </RegularText>
              <LightText style={[pageStyle.textColorStyle, pageStyle.marginEndStyle]}>
                {this.props.GoalCurrency.CurrencySymbol + (this.state.assetValue.toFixed(2))}
              </LightText>
            </View>
            <View style={pageStyle.withdrawAllSwitchContainerStyle}>
              <SwitchButton
                value={this.state.withdrawAll}
                onValueChange={withdrawAll => this.setState({withdrawAll}, () => {
                    if (withdrawAll) {
                      this._checkAmount(this.state.assetValue.toFixed(2));
                    }
                  },
                )}
              />
              <RegularText style={[pageStyle.marginStartStyle, pageStyle.textColorStyle]}>
                {strings('sellAssetsAmountPage.label_withdraw_all')}
              </RegularText>
            </View>
            <View style={pageStyle.decimalMaskInputContainerStyle}>
              <DecimalMaskedTextInput onSubmitEditing={this._onNextButtonPressed}
                                      currencySymbol={this.props.GoalCurrency.CurrencySymbol}
                                      onValidAmountAvailable={(amount) => {
                                        this._checkAmount(amount);
                                      }}
                                      editable={!this.state.withdrawAll}
                                      value={this.state.transactionAmount}
                                      placeHolderText={strings('sellAssetsAmountPage.placeholder')}
                                      errorMessage={this.state.errorMessage}/>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('sellAssetsAmountPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
