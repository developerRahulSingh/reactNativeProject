import React, { PureComponent } from 'react';
import { View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import commonTheme from '../../../../themes/common.theme';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './decimalMaskedTextInput.style';

export type DecimalMaskedTextInputProps = {
  currencySymbol?: string,
  minimumAmount?: string,
  maximumAmount?: string,
  onValidAmountAvailable?: ?(amount: string) => void,
  onSubmitEditing?: ?(any) => void,
  errorMessage?: string,
  placeHolderText?: string,
  showCompact?: boolean,
  showBorders?: boolean,
  textAlign?: string,
  decimalPoint?: number,
  value?: string,
  editable?: boolean,
}

export type DecimalMaskedTextInputState = {
  formattedAmount: string,
  amount: string,
}

class DecimalMaskedTextInput extends PureComponent<DecimalMaskedTextInputProps, DecimalMaskedTextInputState> {
  static defaultProps = {
    currencySymbol: null,
    minimumAmount: null,
    maximumAmount: null,
    errorMessage: null,
    placeHolderText: null,
    showCompact: false,
    showBorders: true,
    textAlign: 'left',
    decimalPoint: 2,
    value: null,
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      formattedAmount: this.props.value,
      amount: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<DecimalMaskedTextInputProps>, prevState: Readonly<DecimalMaskedTextInputState>, snapshot): void {
    if (this.props.value !== prevProps.value) {
      this.setState({
        formattedAmount: this.props.value,
      });
    }
  }

  checkInvestmentAmount = (formatted, extracted) => {
    this.setState({
      formattedAmount: formatted,
      amount: extracted,
    });
    if (this.state.amount >= 0) {
      this.props.onValidAmountAvailable?.(this.state.formattedAmount);
    }
  };

  render() {
    let stringDecimalMask = '9'.repeat(this.props.decimalPoint);
    let stringMask = '[999999999].[' + stringDecimalMask + ']';

    return (
      <View style={componentStyle.mainContainer}>
        <View style={[componentStyle.contentContainer, {
          borderTopWidth: this.props.showBorders ? 1 : 0,
          borderBottomWidth: this.props.showBorders ? 1 : 0,
        }]}>
          <RegularText style={[componentStyle.currencySymbolTextStyle, {
            paddingRight: this.props.showCompact ? 16 : 0,
            display: this.props.currencySymbol ? 'flex' : 'none',
          }]}>
            {this.props.currencySymbol}
          </RegularText>
          <TextInputMask
            ref={'inputBox'}
            editable={this.props.editable}
            style={[componentStyle.textInputMaskStyle, {
              color: this.props.editable ? commonTheme.COLOR_DEFAULT : commonTheme.COLOR_LIGHT,
              paddingHorizontal: this.props.showCompact ? 0 : 16,
              paddingVertical: this.props.showCompact ? 0 : 16,
              textAlign: this.props.textAlign,
            }]}
            placeholder={this.props.placeHolderText}
            keyboardType="decimal-pad"
            returnKeyType={'done'}
            value={this.state.formattedAmount}
            onChangeText={this.checkInvestmentAmount}
            mask={stringMask}
            onSubmitEditing={this.props.onSubmitEditing}
          />
        </View>
        {this.props.errorMessage !== null ?
          <RegularText style={componentStyle.errorMessageStyle}>
            {this.props.errorMessage}
          </RegularText> :
          null
        }
      </View>
    );
  }

}

export { DecimalMaskedTextInput };
