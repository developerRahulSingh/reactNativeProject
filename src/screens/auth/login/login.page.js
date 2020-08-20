import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import AsyncStorageUtil from '../../../utils/asyncstorage.util';
import commonUtil from '../../../utils/common.util';
import NavigationUtil from '../../../utils/navigation.util';
import { removePINCodeSecurity } from '../../../utils/security.util';
import { BasePage } from '../../common/base.page';
import { ButtonUnderlineText, IconBasedTextInput, LightText, NotchPushComponent, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './login.page.style';

// Login Page
export default class LoginPage extends BasePage {
  constructor(props) {
    super(props, {
      username: '',
      password: '',
      enableLoginBtn: false,
      language_name: global['CULTURE_NAME'],
    });

    this.inputs = {};

    // bind required function (this binding is required in case the functions are passed as arguments to other components)
    this._focusNextInputField = this._focusNextInputField.bind(this);
    this._onTapLoginButton = this._onTapLoginButton.bind(this);
  }

  // TIP: uncomment this during development and add the username and password in the state for auto login
  // componentDidMount = async (): void => {
  //   return this._onTapLoginButton();
  // };

  _onTapSignUpButton = async () => {
    this.props.removeGoalAllocationData();
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.SignUp.SignUpPage);
  };

  _onTapForgotPasswordButton = async () => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Auth.ForgotPassword.ForgotPasswordPage);
  };

  _onTapLanguage = async () => {
    await NavigationUtil.showOverlay(screenId.Overlays.LanguageSelector, {
      items: commonUtil.languageOptions.map(item => ({...item, selected: item.key === this.state.language_name})),
      onItemSelected: this._onLanguageSelected,
    });
  };

  _onTapLoginButton = async () => {
    this.props.removeGoalAllocationData();
    // Step 1: validate the email format
    if (!commonConstant.EMAIL_REGEX.test(this.state.username.trim())) {
      return NavigationUtil.showAlert({messageText: strings('loginPage.alert_please_enter_valid_email')});
    }
    // return interfaces.userLoginWithToken('8011CAEB-362F-4108-9FBD-B7D25DDE2F49')
    return interfaces.userLogin(this.state.username.trim(), this.state.password)
      .then(async result => {
        await removePINCodeSecurity();

        // check if user has opted not to setup a pin
        const userSkippedPINSetup = await AsyncStorageUtil.getItem('userSkippedPINSetup');
        if (!!userSkippedPINSetup || !result.UserSignupRegistrationInfo.MobilePhoneVerified || !result.UserSignupRegistrationInfo.EmailVerified) {
          return await NavigationUtil.onSuccessfulLogin(result);
        } else {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.Auth.Login.AlternateLoginPage, {
            username: this.state.username.trim(),
            password: this.state.password,
            userInfo: result,
          });
        }
      })
      .catch(() => null);
  };

  checkIfFieldsAreNotEmpty = (type, value) => {
    if (type === 'username') {
      this.setState({
        username: value,
      }, () => {
        this.changeLoginBtnState();
      });
    }
    if (type === 'password') {
      this.setState({
        password: value,
      }, () => {
        this.changeLoginBtnState();
      });
    }
  };

  changeLoginBtnState = () => {
    this.setState({
      enableLoginBtn: !!this.state.username && this.state.username.length >= 6 && !!this.state.password,
    });
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === 'done') {
      if (!!this.state.username && this.state.username.length >= 6 && !!this.state.password) {
        await this._onTapLoginButton();
      } else {
        return NavigationUtil.showAlert({messageText: strings('common.alert_fill_details')});
      }
    } else {
      this.inputs[nextField].focus();
    }
  };

  _onLanguageSelected = async (selectedLanguage) => {
    this.setState({
      language_name: selectedLanguage.key,
    }, async () => {
      return await this.changeLanguage(selectedLanguage.key);
    });
  };

  render() {
    // get culture
    let cultureName = commonUtil.languageOptions.find(lang => lang.key === global['CULTURE_NAME']);

    // pick default / selected language
    let displayLanguageValue = !!cultureName ? strings(`languageSelectorComponent.${cultureName.label}`) : strings('languageSelectorComponent.label_english');

    return (
      <View style={commonStyle.container}>
        <NotchPushComponent/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}
                                 bounces={false} style={commonStyle.container}>
          <ScreenTitleImage title={strings('loginPage.title')}
                            imageAsset={require('../../../assets/b21_logo.png')}/>
          <View style={pageStyle.textInputsContainer}>
            <IconBasedTextInput
              onRef={(ref) => {
                this.inputs['email'] = ref;
              }}
              onSubmitEditing={async () => {
                await this._focusNextInputField('password');
              }}
              title={strings('loginPage.label_email')}
              icon={require('../../../assets/icon_mail.png')}
              maxLength={commonConstant.MAX_CHARACTER_EMAIL}
              value={this.state.username}
              placeholderText={strings('loginPage.placeholder_enter_email')}
              keyboardType={'email-address'}
              onChangeText={(username) => this.checkIfFieldsAreNotEmpty('username', username)}
            />
            <IconBasedTextInput
              onRef={(ref) => {
                this.inputs['password'] = ref;
              }}
              onSubmitEditing={async () => {
                await this._focusNextInputField('done');
              }}
              title={strings('loginPage.label_password')}
              icon={require('../../../assets/password.png')}
              maxLength={commonConstant.MAX_CHARACTER_PASSWORD}
              value={this.state.password}
              placeholderText={strings('loginPage.placeholder_enter_password')}
              returnKeyType={'done'}
              secureTextEntry={true}
              onChangeText={(password) => this.checkIfFieldsAreNotEmpty('password', password)}
            />
            <StandardButton
              onPress={this._onTapLoginButton}
              color={commonTheme.COLOR_SECONDARY}
              disabled={!this.state.enableLoginBtn}
              labelText={strings('loginPage.label_button_login')}
            />
          </View>
          <View style={pageStyle.sigUpForgotPasswordContainer}>
            <View style={pageStyle.rowWithCenterContentContainer}>
              <LightText style={pageStyle.languageText}>
                {strings('loginPage.label_language')}
              </LightText>
              <ButtonUnderlineText
                title={displayLanguageValue}
                onPressEvent={this._onTapLanguage}
                titleColor={commonTheme.COLOR_SECONDARY}
                isBold={false}
              />
            </View>
            <ButtonUnderlineText
              style={pageStyle.forgotPasswordButtonStyle}
              title={strings('loginPage.label_button_forgot_password')}
              onPressEvent={this._onTapForgotPasswordButton}
              titleColor={commonTheme.COLOR_SECONDARY}
              isBold={true}
            />
            <View style={pageStyle.rowWithCenterContentContainer}>
              <LightText style={pageStyle.signUpText}>
                {strings('loginPage.label_dont_have_account')}
              </LightText>
              <ButtonUnderlineText
                style={pageStyle.signUpButtonStyle}
                title={strings('loginPage.label_button_sign_up')}
                onPressEvent={this._onTapSignUpButton}
                titleColor={commonTheme.COLOR_PRIMARY}
                isBold={true}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={pageStyle.appVersionContainer}>
          <LightText style={pageStyle.appVersionText}>
            {strings('loginPage.label_version') + global['APP_VERSION']}
          </LightText>
        </View>
      </View>
    );
  }
}
