import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { removePINCodeSecurity } from '../../../utils/security.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, OTPTextView, ScreenTitleImage, SetPasswordComponent, StandardButton, StandardLabel } from '../../common/components';
import { pageStyle } from './resetPassword.page.style';

export default class ResetPasswordPage extends BasePage {

  constructor(props) {
    super(props, {
      password: '',
      verifiedCode: '',
      enableNextBtn: false,
    });

    this._backButton = this._backButton.bind(this);
    this._focusNextInput = this._focusNextInput.bind(this);
    this._changeButtonState = this._changeButtonState.bind(this);
    this._validateVerifiedCode = this._validateVerifiedCode.bind(this);
    this._resetPasswordPressed = this._resetPasswordPressed.bind(this);

    this.passwordComponent = React.createRef();
  }

  _resetPasswordPressed = async () => {
    if (!this.state.verifiedCode) {
      return NavigationUtil.showAlert({messageText: strings('resetPasswordPage.label_enter_code')});
    } else if (this.state.verifiedCode.length !== 6) {
      return NavigationUtil.showAlert({messageText: strings('resetPasswordPage.error_enter_valid_verification_code')});
    } else if (!this.state.password) {
      return NavigationUtil.showAlert({messageText: strings('resetPasswordPage.error_invalid_password')});
    }
    return interfaces.resetPassword(this.props.navigationProps.username, this.state.password, this.state.verifiedCode, this.props.navigationProps.SUAuthenticationToken)
      .then(() => {
        return NavigationUtil.showAlert({
          messageText: strings('resetPasswordPage.alert_password_changed'),
          onRightButtonPress: async () => {
            await removePINCodeSecurity();
            return NavigationUtil.gotoLogin();
          },
        });
      }).catch(() => null);
  };

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _validPasswordInfo = (password: string) => {
    this.setState({password}, () => {
      this._changeButtonState();
    });
  };

  _validateVerifiedCode(verifiedCode: string) {
    this.setState({verifiedCode}, () => {
      this._changeButtonState();
    });
  }

  _changeButtonState = () => {
    this.setState({
      enableNextBtn: !!this.state.verifiedCode && this.state.verifiedCode.length === 6 && !!this.state.password,
    });
  };

  _focusNextInput() {
    this.passwordComponent.current.focus();
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('resetPasswordPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          <ScreenTitleImage imageAsset={require('../../../assets/signUpIcon.png')}/>
          <View style={pageStyle.formView}>
            <StandardLabel text={strings('resetPasswordPage.label_enter_code')}/>
            <OTPTextView
              onCodeFilled={(verifiedCode => {
                this._validateVerifiedCode(verifiedCode);
              })}
              onSubmit={() => {
                if (this.state.verifiedCode.length === 6) {
                  this._focusNextInput();
                }
              }}
              inputCount={6}
            />
            <SetPasswordComponent
              ref={this.passwordComponent}
              passwordTitle={strings('resetPasswordPage.label_password')}
              passwordPlaceholderText={strings('resetPasswordPage.placeholder_password')}
              confirmPasswordTitle={strings('resetPasswordPage.label_retype_password')}
              confirmPasswordPlaceholderText={strings('resetPasswordPage.placeholder_retype_password')}
              onSubmitEditing={this._resetPasswordPressed}
              onValidPasswordAvailable={(password) => this._validPasswordInfo(password)}
              returnKeyType={'done'}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._resetPasswordPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('resetPasswordPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
