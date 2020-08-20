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
import { BackNavTitle, IconBasedTextInput, StandardButton } from '../../common/components';
import { pageStyle } from './updateEmail.page.style';

export default class UpdateEmailPage extends BasePage {

  constructor(props) {
    super(props, {
      enteredEmail: '',
      enableNextBtn: false,
    });

    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _onNextButtonClicked = async () => {
    // Step 1: check if the email is a valid email address
    if (!commonConstant.EMAIL_REGEX.test(this.state.enteredEmail.trim())) {
      return NavigationUtil.showAlert({messageText: strings('updateEmailPage.error_please_enter_valid_email')});
    }

    // Step 2: get and store the special user token
    let isSpecialUserTokenAvailable = await this.getSpecialUserAuthenticationToken();

    // Step 3: validate the email existence and move to next screen
    if (!!isSpecialUserTokenAvailable) {
      return interfaces.checkAvailableEmail(this.state.enteredEmail.trim(), this.SUAuthenticationToken)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.UserProfile.VerifyUpdateEmailPage, {
            email: this.state.enteredEmail.trim(),
          });
        })
        .catch(() => null);
    }
  };

  _handleTextInputTextChange = (value) => {
    this.setState({
      enteredEmail: value,
      enableNextBtn: !!value,
    });
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('updateEmailPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} extraScrollHeight={30} enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={pageStyle.formView}>
          <IconBasedTextInput
            maxLength={commonConstant.MAX_CHARACTER_EMAIL}
            onSubmitEditing={this._onNextButtonClicked}
            returnKeyType={'done'}
            title={strings('updateEmailPage.label_email')}
            icon={require('../../../assets/email.png')}
            value={this.state.enteredEmail}
            placeholderText={strings('updateEmailPage.placeholder_new_email')}
            keyboardType={'email-address'}
            onChangeText={(enteredEmail) => this._handleTextInputTextChange(enteredEmail)}
          />
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClicked}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('updateEmailPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
