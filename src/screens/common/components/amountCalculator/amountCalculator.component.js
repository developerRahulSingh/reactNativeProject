import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import { DecimalMaskedTextInput } from '../decimalMaskedTextInput/decimalMaskedTextInput.component';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './amountCalculator.style';

export type AmountCalculatorProps = {
  toggleAmountQty?: boolean,
  currencySymbol?: string,
  currencyCode?: string,
  error?: string,
  cryptoCurrencyCode?: string,
  goalCurrencyConversionRate?: number,
  handleTextChange?: ?(any) => void,
  initialAmount?: number,
  initialAmountPrecision?: number,
  initialQuantity?: number,
  initialQuantityPrecision?: number,
  disable?: boolean,
  onSubmitEditing?: ?(any) => void,
  style?: any
}

export type AmountCalculatorState = {
  enterQuantity: string,
  calculatedAmount: number,
  calculatedQuantity: number,
  enterAmount: string,
}

class AmountCalculator extends PureComponent<AmountCalculatorProps, AmountCalculatorState> {
  static defaultProps = {
    toggleAmountQty: false,
    currencySymbol: '',
    currencyCode: '',
    error: '',
    cryptoCurrencyCode: '',
    goalCurrencyConversionRate: 0,
    initialAmount: 0,
    initialAmountPrecision: 2,
    initialQuantity: 0,
    initialQuantityPrecision: 8,
    disable: true,
    style: {},
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      enterQuantity: null,
      calculatedAmount: 0,
      calculatedQuantity: 0,
      enterAmount: null,
    };

  }

  componentDidUpdate(prevProps: Readonly<AmountCalculatorProps>, prevState: Readonly<AmountCalculatorState>, snapshot): void {
    if (this.props.initialAmount !== prevProps.initialAmount && prevProps.disable) {
      this.updateCoinQty(this.props.initialAmount);
    } else if (this.props.initialQuantity !== prevProps.initialQuantity && prevProps.disable) {
      this.updateAmount(this.props.initialQuantity);
    }
  }

  updateCoinQty = (value) => {
    let isMaxAmount = typeof value === 'number';
    let valueNumber = parseFloat(value);
    valueNumber = isNaN(valueNumber) ? 0 : valueNumber;
    const calculatedQuantity = parseFloat((valueNumber / this.props.goalCurrencyConversionRate).toFixed(this.props.initialQuantityPrecision));
    this.setState({
      enterQuantity: calculatedQuantity,
      calculatedAmount: !!value ? valueNumber : 0,
      calculatedQuantity: !!value ? calculatedQuantity : 0,
      enterAmount: isMaxAmount ? valueNumber.toFixed(this.props.initialAmountPrecision) : value,
    }, () => {
      this.props.handleTextChange?.({
        Quantity: this.state.calculatedQuantity,
        Amount: this.state.calculatedAmount,
      });
    });
  };

// Enter Coin Quantity then Coin Amount value change according
  updateAmount = (value) => {
    let isMaxAmount = typeof value === 'number';
    let valueNumber = parseFloat(value);
    valueNumber = isNaN(valueNumber) ? 0 : valueNumber;
    const calculatedAmount = parseFloat((this.props.goalCurrencyConversionRate * valueNumber).toFixed(this.props.initialAmountPrecision));
    this.setState({
      enterQuantity: !!isMaxAmount ? valueNumber.toFixed(this.props.initialQuantityPrecision) : value,
      calculatedAmount: !!value ? calculatedAmount : 0,
      calculatedQuantity: !!value ? valueNumber : 0,
      enterAmount: calculatedAmount,
    }, () => {
      this.props.handleTextChange?.({
        Quantity: this.state.calculatedQuantity,
        Amount: this.state.calculatedAmount,
      });
    });
  };

// TextInput Enter Text Event
  handleTextChange = (val) => {
    if (this.props.toggleAmountQty) {
      this.updateAmount(val);
    } else {
      this.updateCoinQty(val);
    }
  };

  render() {
    return (
      <View style={[componentStyle.mainContainer, this.props.style]}>
        <View style={componentStyle.contentContainer}>
          <View style={componentStyle.coinInfoContainer}>
            <RegularText style={componentStyle.coinInfoLabel}>
              {this.props.toggleAmountQty ? strings('amountCalculatorComponent.label_currency_value', {currencyCode: this.props.currencyCode}) : strings('amountCalculatorComponent.label_crypto_currency_coins', {cryptoCurrencyCode: this.props.cryptoCurrencyCode})}
            </RegularText>
            <RegularText style={componentStyle.coinInfoValueText}>
              {this.props.toggleAmountQty ? this.state.calculatedAmount >= 0 ? parseFloat(this.state.calculatedAmount).toFixed(this.props.initialAmountPrecision) : '0.00' : this.state.calculatedQuantity >= 0 ? parseFloat(this.state.calculatedQuantity).toFixed(this.props.initialQuantityPrecision) : '0.00000000'}
            </RegularText>
          </View>
          <View style={componentStyle.inputsContainer}>
            <RegularText style={componentStyle.coinInfoLabel}>
              {this.props.toggleAmountQty ? strings('amountCalculatorComponent.label_coin_quantity', {cryptoCurrencyCode: this.props.cryptoCurrencyCode}) : strings('amountCalculatorComponent.label_coin_amount', {currencyCode: this.props.currencyCode})}
            </RegularText>
            {this.props.toggleAmountQty ?
              <DecimalMaskedTextInput
                onSubmitEditing={this.props.onSubmitEditing}
                showCompact={true}
                textAlign={'right'}
                showBorders={false}
                decimalPoint={this.props.initialQuantityPrecision}
                placeHolderText={strings('amountCalculatorComponent.placeholder_quantity')}
                value={this.state.enterQuantity}
                editable={this.props.disable}
                onValidAmountAvailable={(amount) => {
                  this.handleTextChange(amount);
                }}/>
              : null}
            {!this.props.toggleAmountQty ?
              <DecimalMaskedTextInput
                onSubmitEditing={this.props.onSubmitEditing}
                showCompact={true}
                currencySymbol={this.props.currencySymbol}
                textAlign={'right'}
                showBorders={false}
                decimalPoint={this.props.initialAmountPrecision}
                placeHolderText={strings('amountCalculatorComponent.placeholder_amount')}
                value={this.state.enterAmount}
                editable={this.props.disable}
                onValidAmountAvailable={(amount) => {
                  this.handleTextChange(amount);
                }}/>
              : null
            }
          </View>
        </View>
        {this.props.error ?
          <View style={componentStyle.errorContainer}>
            <RegularText style={componentStyle.errorText}>
              {this.props.error}
            </RegularText>
          </View> :
          null
        }
      </View>
    );
  }
}

export { AmountCalculator };
