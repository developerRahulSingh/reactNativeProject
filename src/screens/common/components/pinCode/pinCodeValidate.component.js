import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { RegularText } from '..';
import { strings } from '../../../../config/i18/i18n';
import { PINCodeBase } from './parts/pinCodeBase/pinCode.base.component';
import { componentStyle } from './pinCodeValidate.style';

export type PINCodeValidateProps = {
  pinCodeLength?: number,
  pinCode?: string,
  enterTitle?: string,
  onComplete?: ?(pinCode: string) => void,
}

export type PINCodeValidateState = {
  pinCode?: string;
}

class PINCodeValidate extends PureComponent<PINCodeValidateProps, PINCodeValidateState> {
  static defaultProps = {
    pinCodeLength: 4,
    pinCode: '',
    enterTitle: strings('pinCodeValidateComponent.label_enter_pin'),
  };

  constructor(props) {
    super(props);
    this.state = {
      pinCode: this.props.pinCode,
    };
  }

  componentDidUpdate(prevProps: Readonly<PINCodeValidateProps>, prevState: Readonly<PINCodeValidateState>, snapshot): void {
    if (prevProps.pinCode !== this.props.pinCode) {
      this.setState({pinCode: this.props.pinCode});
    }
  }

  pinEntered = (pinCode: string) => {
    this.setState({pinCode}, () => {
      this.props.onComplete?.(this.state.pinCode);
    });
  };

  render() {
    return (
      <>
        <View style={componentStyle.titleContainer}>
          <RegularText style={componentStyle.titleText}>
            {this.props.enterTitle}
          </RegularText>
        </View>
        <PINCodeBase pinCodeLength={this.props.pinCodeLength} onPINCodeReady={this.pinEntered} pinCode={this.state.pinCode}/>
      </>
    );
  }
}

export { PINCodeValidate };
