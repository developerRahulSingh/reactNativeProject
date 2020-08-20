import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './forgotPassword.page.style';

export default class ForgotPasswordPage extends BasePage {
  constructor(props) {
    super(props, {
      email: '',
      enableNextBtn: false,
    });
    // bind required function (this binding is required in case the functions are passed as arguments to other components)
    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _checkIfFieldsAreNotEmpty = (value) => {
    this.setState({
      email: value,
      enableNextBtn: !!value,
    });
  };

  _onNextButtonClicked = async () => {
    // Step 1: check if the email is a valid email address
    if (!commonConstant.EMAIL_REGEX.test(this.state.email.trim())) {
      return NavigationUtil.showAlert({messageText: strings('forgotPasswordPage.alert_please_enter_valid_email')});
    }

    // Step 2: get and store the special user token
    let isSpecialUserTokenAvailable = await this.getSpecialUserAuthenticationToken();

    // Step 3: call forgot password api
    if (!!isSpecialUserTokenAvailable) {
      return interfaces.forgotPassword(this.state.email.trim(), this.SUAuthenticationToken)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.Auth.ForgotPassword.ResetPasswordPage, {
            username: this.state.email.trim(),
            SUAuthenticationToken: this.SUAuthenticationToken,
          });
        })
        .catch(() => null);
    }
  };

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('forgotPasswordPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          <ScreenTitleImage imageAsset={require('../../../assets/signUpIcon.png')}/>
          <View style={pageStyle.formView}>
            <IconBasedTextInput
              icon={require('../../../assets/email.png')}
              maxLength={commonConstant.MAX_CHARACTER_EMAIL}
              keyboardType={'email-address'}
              onChangeText={(email) => this._checkIfFieldsAreNotEmpty(email)}
              onSubmitEditing={() => this._onNextButtonClicked()}
              placeholderText={strings('forgotPasswordPage.placeholder_user_name')}
              returnKeyType={'done'}
              title={strings('forgotPasswordPage.label_email')}
              value={this.state.email}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            color={commonTheme.COLOR_PRIMARY_DARK}
            onPress={() => this._onNextButtonClicked()}
            labelText={strings('forgotPasswordPage.label_button_next')}
            disabled={!this.state.enableNextBtn}
          />
        </View>
      </View>
    );
  }
};
