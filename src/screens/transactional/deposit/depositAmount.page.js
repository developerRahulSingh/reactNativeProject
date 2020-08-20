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
import { BackNavTitle, DecimalMaskedTextInput, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './depositAmount.page.style';

export default class DepositAmountPage extends BasePage {

  constructor(props) {
    super(props, {
      enableNextBtn: false,
      transactionAmount: '',
      errorMessage: '',
    });
  }

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    let numberInvestmentAmount = parseFloat(this.state.transactionAmount);
    if (!numberInvestmentAmount || numberInvestmentAmount < this.props.GoalCurrency.MinDepositAmount || numberInvestmentAmount > this.props.GoalCurrency.MaxDepositAmount) {
      this.setState({
        errorMessage: strings('depositAmountPage.error_invalid_amount', {
          minAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MinDepositAmount).toFixed(2),
          maxAmount: this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.GoalCurrency.MaxDepositAmount).toFixed(2),
        }),
      });
      return;
    }
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.SelectPaymentInstrumentTypePage, {
      transactionAmount: numberInvestmentAmount,
      direction: paymentInstrumentDirection.Deposit,
      purpose: 'cash',
    });
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
          title={strings('depositAmountPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage imageAsset={require('../../../assets/dollars_colis_circle.png')}
                            descriptionText={strings('depositAmountPage.description')}/>
          <View style={pageStyle.decimalTextInputViewStyle}>
            <DecimalMaskedTextInput onSubmitEditing={this._onNextButtonPressed}
                                    currencySymbol={this.props.GoalCurrency.CurrencySymbol}
                                    onValidAmountAvailable={(amount) => {
                                      this._checkInvestmentAmount(amount);
                                    }}
                                    editable={!this.state.useMaximumCashBalance}
                                    value={this.state.transactionAmount}
                                    errorMessage={this.state.errorMessage}
                                    placeHolderText={strings('depositAmountPage.placeholder_enter_amount')}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('depositAmountPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
