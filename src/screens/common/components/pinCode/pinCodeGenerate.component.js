import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { RegularText } from '..';
import { strings } from '../../../../config/i18/i18n';
import { PINCodeBase } from './parts/pinCodeBase/pinCode.base.component';
import { componentStyle } from './pinCodeGenerate.style';

export type PINCodeGenerateProps = {
  pinCodeLength?: number,
  pinCode?: string,
  enterTitle?: string,
  confirmTitle?: string,
  onComplete?: ?(pinCode: string) => void,
}

export type PINCodeGenerateState = {
  pinCode?: string;
  confirmPINCode?: string;
}

class PINCodeGenerate extends PureComponent<PINCodeGenerateProps, PINCodeGenerateState> {
  static defaultProps = {
    pinCodeLength: 4,
    pinCode: '',
    enterTitle: strings('pinCodeGenerateComponent.label_enter_pin'),
    confirmTitle: strings('pinCodeGenerateComponent.label_confirm_pin'),
  };

  constructor(props) {
    super(props);
    this.state = {
      pinCode: this.props.pinCode,
      confirmPINCode: this.props.pinCode,
    };
  }

  pinEntered = (pinCode: string) => {
    this.setState({pinCode, confirmPINCode: ''});
  };

  confirmPINEntered = (confirmPINCode: string) => {
    if (this.state.pinCode === confirmPINCode) {
      this.props.onComplete?.(this.state.pinCode);
      this.setState({confirmPINCode});
    } else {
      this.setState({confirmPINCode: '', pinCode: ''});
    }
  };

  render() {
    return (
      <>
        {!this.state.pinCode ?
          <>
            <View style={componentStyle.titleContainer}>
              <RegularText style={componentStyle.titleText}>
                {this.props.enterTitle}
              </RegularText>
            </View>
            <PINCodeBase pinCodeLength={this.props.pinCodeLength} onPINCodeReady={this.pinEntered} pinCode={this.state.pinCode}/>
          </> :
          null}
        {this.state.pinCode ?
          <>
            <View style={componentStyle.titleContainer}>
              <RegularText style={componentStyle.titleText}>
                {this.props.confirmTitle}
              </RegularText>
            </View>
            <PINCodeBase pinCodeLength={this.props.pinCodeLength} onPINCodeReady={this.confirmPINEntered}
                         pinCode={this.state.confirmPINCode}/>
          </> :
          null}
      </>
    );
  }
}

export { PINCodeGenerate };
