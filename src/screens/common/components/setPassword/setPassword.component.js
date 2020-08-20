import React, { PureComponent } from 'react';
import { View } from 'react-native';
import commonConstant from '../../../../constants/common.constant';
import { IconBasedTextInput } from '../iconBasedTextInput/iconBasedTextInput.component';
import { PasswordStrengthComponent } from '../passwordStrength/passwordStrength.component';
import { componentStyle } from './setPassword.style';

export type SetPasswordComponentProps = {
  confirmPasswordIcon?: any,
  confirmPasswordTitle?: string,
  confirmPasswordPlaceholderText?: string,
  onSubmitEditing?: ?(any) => void,
  onValidPasswordAvailable?: ?(password: string) => void,
  passwordIcon?: any,
  passwordPlaceholderText?: string,
  passwordTitle?: string,
  returnKeyType?: string,
}

export type SetPasswordComponentState = {
  passwordStrength: number,
  password: string,
  confirmPassword: string,
}

class SetPasswordComponent extends PureComponent<SetPasswordComponentProps, SetPasswordComponentState> {
  static defaultProps = {
    confirmPasswordIcon: require('../../../../assets/setPassBlackSmall.png'),
    confirmPasswordTitle: null,
    confirmPasswordPlaceholderText: null,
    passwordIcon: require('../../../../assets/setPassBlackSmall.png'),
    passwordPlaceholderText: null,
    passwordTitle: null,
    returnKeyType: 'default',
  };

  constructor(props) {
    super(props);

    this.state = {
      passwordStrength: null,
      password: '',
      confirmPassword: '',
    };

    this.inputs = {};

    this._onValueChange = this._onValueChange.bind(this);
    this._focusNextInputField = this._focusNextInputField.bind(this);
  }

  checkPasswordStrength = (password: string) => {
    let passwordStrength = 0;
    if (!!password && password.length > 0) {
      if (commonConstant.LOWERCASE_CHARACTER_REGEX.test(password)) {
        passwordStrength++;
      }
      if (commonConstant.UPPERCASE_CHARACTER_REGEX.test(password)) {
        passwordStrength++;
      }
      if (commonConstant.NUMBER_REGEX.test(password)) {
        passwordStrength++;
      }
      if (commonConstant.SPECIAL_CHARACTER_REGEX.test(password)) {
        passwordStrength++;
      }
      if (password.length >= commonConstant.MIN_CHARACTER_PASSWORD) {
        passwordStrength++;
      }
      if (password.indexOf('&') > -1
        || password.indexOf('"') > -1
        || password.indexOf('\'') > -1
        || password.indexOf('\`') > -1
        || password.indexOf('\\') > -1) {
        passwordStrength--;
      } else {
        passwordStrength++;
      }
    } else {
      passwordStrength = 0;
    }

    this.setState({
      passwordStrength: passwordStrength,
    });
  };

  _onValueChange(val: string, stateName: string, calculateStrength: boolean = false) {
    this.setState({
      [stateName]: val,
    }, () => {
      if (calculateStrength) {
        this.checkPasswordStrength(val);
      }
      if (this.state.password === this.state.confirmPassword && this.state.passwordStrength >= 6) {
        this.props.onValidPasswordAvailable?.(this.state.password);
      } else {
        this.props.onValidPasswordAvailable?.(null);
      }
    });
  }

  _focusNextInputField = async (nextField) => {
    if (nextField === 'done') {
      this.props.onSubmitEditing?.('password');
    } else {
      this.inputs[nextField].focus();
    }
  };

  focus() {
    this.inputs['0'].focus();
  }

  render() {
    return (
      <View>
        <View style={componentStyle.contentContainer}>
          <IconBasedTextInput
            icon={this.props.passwordIcon}
            maxLength={commonConstant.MAX_CHARACTER_PASSWORD}
            onChangeText={(password) => this._onValueChange(password, 'password', true)}
            onRef={(ref) => {
              this.inputs['0'] = ref;
            }}
            onSubmitEditing={() => this._focusNextInputField('1')}
            placeholderText={this.props.passwordPlaceholderText}
            returnKeyType={'next'}
            secureTextEntry={true}
            title={this.props.passwordTitle}
            value={this.state.password}
          />
          <PasswordStrengthComponent passwordStrength={this.state.passwordStrength} style={componentStyle.passwordComponentStyle}/>
        </View>
        <IconBasedTextInput
          icon={this.props.confirmPasswordIcon}
          maxLength={commonConstant.MAX_CHARACTER_PASSWORD}
          onChangeText={(confirmPassword) => this._onValueChange(confirmPassword, 'confirmPassword')}
          onRef={(ref) => {
            this.inputs['1'] = ref;
          }}
          onSubmitEditing={() => this._focusNextInputField('done')}
          placeholderText={this.props.confirmPasswordPlaceholderText}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={true}
          title={this.props.confirmPasswordTitle}
          value={this.state.confirmPassword}
        />
      </View>
    );
  }
}

export { SetPasswordComponent };
