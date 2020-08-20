import React, { PureComponent } from 'react';
import { View } from 'react-native';
import type { PINCodeValidateProps, PINCodeValidateState } from '../../pinCodeValidate.component';
import { NumberPad } from '../numberPad/numberPad.component';
import { PINDisplay } from '../pinDisplay/pinDisplay.component';
import { componentStyle } from './pinCode.base.style';

export type PINCodeBaseProps = {
  pinCodeLength?: number,
  pinCode?: string,
  onPINCodeReady?: ?(pinCode: string) => void,
}

export type PINCodeBaseState = {
  pinCode?: string;
  disableNumberPad?: boolean
}

class PINCodeBase extends PureComponent<PINCodeBaseProps, PINCodeBaseState> {
  static defaultProps = {
    pinCodeLength: 4,
    pinCode: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      pinCode: this.props.pinCode,
    };
  }

  componentDidUpdate(prevProps: Readonly<PINCodeValidateProps>, prevState: Readonly<PINCodeValidateState>, snapshot): void {
    if (prevProps.pinCode !== this.props.pinCode) {
      this.setState({
        pinCode: this.props.pinCode,
        disableNumberPad: this.props.pinCode.length === this.props.pinCodeLength,
      });
    }
  }

  updateCurrentPIN = (key) => {
    if (key !== 'delete') {
      this.setState({pinCode: `${this.state.pinCode}${key}`}, () => {
        this.setState({disableNumberPad: this.state.pinCode.length === this.props.pinCodeLength}, () => {
          if (this.state.pinCode.length === this.props.pinCodeLength) {
            setTimeout(() => this.props.onPINCodeReady?.(this.state.pinCode));
          }
        });
      });
    } else {
      if (this.state.pinCode.length > 0) {
        this.setState({
          pinCode: this.state.pinCode.substring(0, this.state.pinCode.length - 1),
        }, () => {
          this.setState({disableNumberPad: this.state.pinCode.length === this.props.pinCodeLength});
        });
      }
    }
  };

  render() {
    return (
      <View style={componentStyle.mainContainer}>
        <View style={componentStyle.pinDisplayContainer}>
          <PINDisplay pinCodeLength={this.props.pinCodeLength} enteredDigits={this.state.pinCode.length}/>
        </View>
        <View style={componentStyle.numberPadContainer}>
          <NumberPad disabled={this.state.disableNumberPad} onPressKey={(key) => {
            this.updateCurrentPIN(key);
          }}/>
        </View>
      </View>
    );
  }
}

export { PINCodeBase };
