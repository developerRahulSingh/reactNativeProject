import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { componentStyle } from './passwordStrength.style';

export type PasswordStrengthComponentProps = {
  passwordStrength?: number,
  style?: any
}

export type PasswordStrengthComponentState = {}

class PasswordStrengthComponent extends PureComponent<PasswordStrengthComponentProps, PasswordStrengthComponentState> {
  static defaultProps = {
    passwordStrength: 0,
    style: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    let strengthStyle: any;
    if (!this.props.passwordStrength) {
      strengthStyle = componentStyle.notDisplay;
    } else if (this.props.passwordStrength > 0 && this.props.passwordStrength <= 4) {
      strengthStyle = componentStyle.passwordWeak;
    } else if (this.props.passwordStrength === 5) {
      strengthStyle = componentStyle.passwordMedium;
    } else {
      strengthStyle = componentStyle.passwordStrong;
    }
    return (
      <View style={[componentStyle.passwordStrengthBgView, this.props.style]}>
        <View style={[strengthStyle]}>
        </View>
      </View>
    );
  }
}

export { PasswordStrengthComponent };
