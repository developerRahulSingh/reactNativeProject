import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import stackName from '../../../constants/stack.name.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, ButtonUnderlineText, OTPTextView, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './verifyMobile.page.style';

export default class VerifyMobilePage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      verificationCode: '',
      enableResendCodeBtn: false,
      timesAllowedToCall: 3,
      timer: 0,
      hideResendCodeButton: false,
    });

    this._backButton = this._backButton.bind(this);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    clearInterval(this._resendCodeTimer);
  }

  componentDidMount() {
    this._initializeTimer();
  }

  _backButton = async () => {
    await NavigationUtil.reset(this.props.componentId);
  };

  _decrementTimer = () => {
    this.setState((prv_state) => ({
      timer: prv_state.timer === 0 ? 0 : prv_state.timer - 1,
    }));
    if (this.state.timer === 0) {
      this.setState({
        enableResendCodeBtn: this.state.timesAllowedToCall > 0,
        timesAllowedToCall: this.state.timesAllowedToCall - 1,
        hideResendCodeButton: (this.state.timesAllowedToCall - 1) < 0,
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

  _onNextButtonClicked = async () => {
    if (this.state.verificationCode.replace(/ /g, '').length === 6) {

      return interfaces.addPhone(this.props.navigationProps.FullMobileNumber, this.state.verificationCode)
        .then(() => {
          return interfaces.getUserInfo();
        })
        .then(async (resultUserInformation) => {
          this.props.storeUserData(resultUserInformation);
          return interfaces.getCurrencies();
        })
        .then((result) => {
          this.props.storeCurrencies(result);
          return NavigationUtil.resetTo(stackName.TermsAndConditionsStack, screenId.OnBoarding.SignUp.TermsAndConditionsPage);
        })
        .catch(() => null);
    }
  };

  _onCLickResendCode = async () => {
    return interfaces.sendMobileNumberVerificationCode(this.props.navigationProps.FullMobileNumber, this.props.navigationProps.SelectedCountry?.CountryCode)
      .then(() => {
        this.setState({
          enableResendCodeBtn: false,
        }, () => {
          this._initializeTimer();
          return NavigationUtil.showAlert({messageText: strings('verifyMobilePage.alert_verification_code_sent_successfully')});
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
    return NavigationUtil.showAlert({messageText: strings('verifyMobilePage.alert_problem_receiving_code_message')});
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('verifyMobilePage.title')}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}
          onPressEvent={this._backButton}/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage descriptionText={strings('verifyMobilePage.label_enter_code_below')}
                            imageAsset={require('../../../assets/smsCircle.png')}/>
          <View style={pageStyle.mainContainer}>
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
            <View style={pageStyle.buttonsContainer}>
              {!this.state.hideResendCodeButton ?
                <StandardButton
                  width={'70%'}
                  onPress={this._onCLickResendCode}
                  color={commonTheme.COLOR_TRANSPARENT}
                  colorDisabled={commonTheme.COLOR_LIGHTEST}
                  labelColor={commonTheme.COLOR_DEFAULT}
                  showBorder={true}
                  borderColor={commonTheme.COLOR_LIGHT}
                  disabled={!this.state.enableResendCodeBtn}
                  labelText={this.state.timer !== 0 ? strings('verifyMobilePage.label_button_resend_code_timer', {timer: this.state.timer}) : strings('verifyMobilePage.label_button_resend_code')}
                />
                : null}
              {this.state.timesAllowedToCall < 0 ?
                <ButtonUnderlineText
                  title={strings('verifyMobilePage.label_problem_receiving_code')}
                  onPressEvent={this._showProblemReceivingCodeAlert}
                  titleColor={commonTheme.COLOR_PRIMARY_DARK}
                  isBold={true}/>
                : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <StandardButton
          onPress={this._onNextButtonClicked}
          color={commonTheme.COLOR_PRIMARY_DARK}
          disabled={!this.state.enableNextBtn}
          labelText={strings('verifyMobilePage.label_button_next')}
          isBottomButton={true}
        />
      </View>
    );
  }
}
