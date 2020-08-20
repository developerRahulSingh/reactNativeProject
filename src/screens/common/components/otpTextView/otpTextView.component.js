import React, { PureComponent } from 'react';
import { View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { StandardTextInput } from '../standardTextInput/standardTextInput.component';
import { componentStyle } from './otpTextView.style';

export type OTPTextViewProps = {
  defaultValue?: string,
  inputCount?: number,
  containerStyle?: any,
  textInputStyle?: any,
  cellTextLength?: number,
  tintColor?: string,
  offTintColor?: string,
  keyboardType?: string,
  onCodeFilled?: ?(otpCode: string) => void,
  onSubmit?: ?(any) => void,
}

export type OTPTextViewState = {
  focusedInput: number,
  otpText: Array
}

class OTPTextView extends PureComponent<OTPTextViewProps, OTPTextViewState> {
  static defaultProps = {
    defaultValue: '',
    inputCount: 4,
    tintColor: commonTheme.COLOR_PRIMARY,
    offTintColor: commonTheme.COLOR_DEFAULT_LIGHT,
    cellTextLength: 1,
    containerStyle: {},
    textInputStyle: {},
    keyboardType: 'default',
  };

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: 0,
      otpText: [],
    };
    this.inputs = [];
  }

  onTextChange = (text, i) => {
    const {cellTextLength, inputCount, onCodeFilled} = this.props;
    this.setState((prevState) => {
      let {otpText} = prevState;
      otpText[i] = text;
      return {
        otpText,
      };
    }, () => {
      let result = this.state.otpText.join('');
      onCodeFilled && onCodeFilled?.(result);
      if (text.length === cellTextLength && i !== inputCount - 1) {
        this.inputs[i + 1].focus();
      }
    });
  };

  onInputFocus = (i) => {
    this.setState({focusedInput: i});
  };

  onKeyPress = (e, i) => {
    const {otpText = []} = this.state;
    //Since otpText[i] is undefined, The clear operation is not functional
    if (e.nativeEvent.key === 'Backspace' && i !== 0 && !otpText[i]) {
      this.inputs[i - 1].focus();
    }
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      cellTextLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      ...textInputProps
    } = this.props;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      let defaultChars = [];
      if (defaultValue) {
        defaultChars = defaultValue.match(new RegExp('.{1,' + cellTextLength + '}', 'g'));
      }
      const inputStyle = [
        componentStyle.textInput,
        textInputStyle,
        {borderColor: offTintColor},
      ];
      if (this.state.focusedInput === i) {
        inputStyle.push({borderColor: tintColor});
      }

      TextInputs.push(
        <StandardTextInput
          ref={(e) => {
            this.inputs[i] = e;
          }}
          key={i}
          defaultValue={defaultValue ? defaultChars[i] : ''}
          style={inputStyle}
          maxLength={cellTextLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={(text) => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={e => this.onKeyPress(e, i)}
          onSubmitEditing={this.props.onSubmit}
          keyboardType={keyboardType}
          {...textInputProps}
        />,
      );
    }
    return (
      <View style={[componentStyle.container, containerStyle]}>
        {TextInputs}
      </View>
    );
  }
}

export { OTPTextView };
