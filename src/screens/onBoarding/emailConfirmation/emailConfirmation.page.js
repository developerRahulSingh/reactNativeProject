import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import stackName from '../../../constants/stack.name.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { ButtonUnderlineText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './emailConfirmation.page.style';

export default class EmailConfirmationPage extends BasePage {
  constructor(props) {
    super(props, {
      enableResendEmailBtn: false,
      timesAllowedToCall: 3,
      timer: 0,
      hideResendEmailButton: false,
    });
  }

  componentWillUnmount = () => {
    super.componentWillUnmount();
    clearInterval(this._resendTimer);
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
        enableResendEmailBtn: this.state.timesAllowedToCall > 0,
        timesAllowedToCall: this.state.timesAllowedToCall - 1,
        hideResendEmailButton: (this.state.timesAllowedToCall - 1) < 0,
      }, () => {
        clearInterval(this._resendTimer);
      });
    }
  };

  _initializeTimer = () => {
    if (this.state.timesAllowedToCall !== 0) {
      this.setState({
        timer: 60,
      });
    }
    this._resendTimer = setInterval(() => {
      this._decrementTimer();
    }, 1000);
  };

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  //customer support popup alert method
  _showProblemReceivingCodeAlert = () => {
    return NavigationUtil.showAlert({messageText: strings('emailConfirmationPage.alert_checkEmailAndContactSupport')});
  };

  //Resend Email button click event for resend email to user account
  _resendEmail = async () => {
    return interfaces.resendEmailVerification()
      .then(() => {
        this.setState({
          enableResendEmailBtn: false,
        }, () => {
          this._initializeTimer();
          return NavigationUtil.showAlert({messageText: strings('emailConfirmationPage.alert_verificationLinkSend')});
        });
      }).catch(() => {
        this.setState({
          enableResendEmailBtn: false,
        });
      });
  };

  _editEmail = async () => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.EmailConfirmation.EmailEditPage);
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    return interfaces.getUserInfo()
      .then((result) => {
        this.props.storeUserData(result);
        let isEmailVerified = result.UserSignupRegistrationInfo.EmailVerified;
        let isUpdatedEmailVerified = result.UserSignupRegistrationInfo.UpdateEmailVerified;
        if (isEmailVerified || isUpdatedEmailVerified) {
          return NavigationUtil.resetTo(stackName.MobileVerificationStack, screenId.OnBoarding.AddMobile.AddMobilePage);
        } else {
          return NavigationUtil.showAlert({messageText: strings('emailConfirmationPage.alert_emailNotVerified')});
        }
      })
      .catch(() => null);
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <ScreenTitleImage title={strings('emailConfirmationPage.title')} titleColor={commonTheme.COLOR_DARK}
                          imageAsset={require('../../../assets/sendKYC.png')}
                          imageAssetBackground={commonTheme.COLOR_TRANSPARENT} handleNotch={true}
                          descriptionText={strings('emailConfirmationPage.description', {email: this.props.User.UpdateEmailAddressRequested ? this.props.User.UpdateEmailAddressRequested : this.props.User.Email})}/>
        <View style={commonStyle.container}>
          <View style={[pageStyle.editEmailContainerStyle]}>
            {!this.state.hideResendEmailButton ?
              <StandardButton
                width={'60%'}
                onPress={this._resendEmail}
                color={commonTheme.COLOR_BRIGHT}
                labelColor={commonTheme.COLOR_DARK}
                borderColor={commonTheme.COLOR_LIGHT}
                showBorder={true}
                disabled={!this.state.enableResendEmailBtn}
                labelText={this.state.timer !== 0 ? strings('emailConfirmationPage.label_button_resend_email_timer', {timer: this.state.timer}) : strings('emailConfirmationPage.label_button_resend_email')}
              />
              : null}
            {this.state.timesAllowedToCall < 0 ?
              <ButtonUnderlineText
                title={strings('emailConfirmationPage.label_button_problemsReceivingCode')}
                onPressEvent={this._showProblemReceivingCodeAlert}
                titleColor={commonTheme.SECONDARY_TEXT_COLOR_LIGHT}
                isBold={false}
              />
              :
              null}
          </View>
          <View style={pageStyle.editEmailContainerStyle}>
            <StandardButton
              width={'60%'}
              onPress={this._editEmail}
              color={commonTheme.COLOR_BRIGHT}
              labelColor={commonTheme.COLOR_DARK}
              borderColor={commonTheme.COLOR_LIGHT}
              showBorder={true}
              labelText={strings('emailConfirmationPage.label_button_edit_email')}
            />
          </View>
        </View>
        <StandardButton
          onPress={this._onNextButtonPressed}
          color={commonTheme.COLOR_DARK}
          labelText={strings('emailConfirmationPage.label_button_confirmed')}
          isBottomButton
        />
      </View>
    );
  }
}
