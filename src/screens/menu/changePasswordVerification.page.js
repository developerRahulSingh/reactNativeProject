import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../config/i18/i18n';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { removePINCodeSecurity } from '../../utils/security.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, ButtonUnderlineText, OTPTextView, ScreenTitleImage, StandardButton } from '../common/components';
import { pageStyle } from './changePasswordVerification.page.style';

export default class ChangePasswordVerificationPage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      verificationCode: '',
      enableResendCodeBtn: false,
      timesAllowedToCall: 3,
      timer: 0,
      hideResendButton: false,
    });

    this._backButton = this._backButton.bind(this);
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    clearInterval(this._resendCodeTimer);
  };

  componentDidMount = () => {
    this._initializeTimer();
  };

  _decrementTimer = () => {
    this.setState((prv_state) => ({
      timer: prv_state.timer === 0 ? 0 : prv_state.timer - 1,
    }));
    if (this.state.timer === 0) {
      this.setState({
        enableResendCodeBtn: this.state.timesAllowedToCall > 0,
        timesAllowedToCall: this.state.timesAllowedToCall - 1,
        hideResendButton: (this.state.timesAllowedToCall - 1) < 0,
      }, () => {
        clearInterval(this._resendCodeTimer);
      });
    }
  };

  _initializeTimer = () => {
    if (this.state.timesAllowedToCall !== 0) {
      this.setState({
        timer: 60,
      });
    }
    this._resendCodeTimer = setInterval(() => {
      this._decrementTimer();
    }, 1000);
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onNextButtonClicked = async () => {
    return interfaces.resetPassword(this.props.User.Email, this.props.navigationProps.password, this.state.verificationCode, this.props.navigationProps.specialAuth)
      .then(() => {
        return NavigationUtil.showAlert({
          messageText: strings('changePasswordVerificationPage.alert_success_change_password'),
          onRightButtonPress: async () => {
            await removePINCodeSecurity();
            return NavigationUtil.gotoLogin();
          },
        });
      })
      .catch(() => null);
  };

  _reSendMobileVerificationCode = async () => {
    return interfaces.forgotPassword(this.props.User.Email, this.props.navigationProps.specialAuth)
      .then(() => {
        this.setState({
          enableResendCodeBtn: false,
        }, () => {
          this._initializeTimer();
          return NavigationUtil.showAlert({messageText: strings('changePasswordVerificationPage.alert_verification_code_sent_successfully')});
        });
      }).catch(() => {
        this.setState({
          enableResendCodeBtn: false,
        });
      });
  };

  _updateOTPField = (code) => {
    this.setState({
      verificationCode: code,
      enableNextBtn: code.length > 0 && code.length === 6,
    });
  };

  _showProblemReceivingCodeAlert = () => {
    return NavigationUtil.showAlert({messageText: strings('changePasswordVerificationPage.alert_problem_receiving_code_message')});
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('changePasswordVerificationPage.title')}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}
          onPressEvent={this._backButton}/>
        <View style={pageStyle.mainContainer}>
          <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
            <ScreenTitleImage descriptionText={strings('changePasswordVerificationPage.label_enter_code_below')}
                              imageAsset={require('../../assets/smsCircle.png')}/>
            <OTPTextView
              onCodeFilled={(code => {
                this._updateOTPField(code);
              })}
              onSubmit={() => {
                if (this.state.verificationCode.replace(/ /g, '').length === 6) {
                  return this._onNextButtonClicked();
                }
              }}
              inputCount={6}
            />
          </KeyboardAwareScrollView>
          <View style={pageStyle.resendButtonContainer}>
            {!this.state.hideResendButton ?
              <StandardButton
                width={'60%'}
                onPress={this._reSendMobileVerificationCode}
                color={commonTheme.COLOR_TRANSPARENT}
                labelColor={commonTheme.COLOR_DARK}
                showBorder={true}
                disabled={!this.state.enableResendCodeBtn}
                borderColor={commonTheme.COLOR_DARK}
                labelText={this.state.timer !== 0 ? strings('changePasswordVerificationPage.label_button_resend_code_timer', {timer: this.state.timer}) : strings('changePasswordVerificationPage.label_button_resend_code')}
              />
              : null}
            {this.state.timesAllowedToCall < 0 ?
              <ButtonUnderlineText
                title={strings('changePasswordVerificationPage.label_button_problem_receiving_code')}
                onPressEvent={this._showProblemReceivingCodeAlert}
                titleColor={commonTheme.COLOR_PRIMARY_DARK}
                isBold={true}
              />
              : null}
          </View>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClicked}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('changePasswordVerificationPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
