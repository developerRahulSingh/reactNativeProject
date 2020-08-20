import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { IconBasedTextInput } from '../../../screens/common/components';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, StandardButton } from '../../common/components';
import { pageStyle } from './emailEdit.page.style';

export default class EmailEditPage extends BasePage {

  constructor(props) {
    super(props, {
      email: '',
      enableNextBtn: false,
    });

    // bind required function (this binding is required in case the functions are passed as arguments to other components)
    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _onNextButtonClicked = async () => {
    // Step 1: check if the email is a valid email address
    if (!commonConstant.EMAIL_REGEX.test(this.state.email.trim())) {
      return NavigationUtil.showAlert({messageText: strings('emailEditPage.alert_enter_valid_email')});
    }

    // Step 2: get and store the special user token
    let isSpecialUserTokenAvailable = await this.getSpecialUserAuthenticationToken();

    // Step 3: validate the email existence and move to next screen
    if (!!isSpecialUserTokenAvailable) {
      return interfaces.checkAvailableEmail(this.state.email.trim(), this.SUAuthenticationToken)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.EmailConfirmation.EmailEditConfirmationPage, {
            email: this.state.email.trim(),
          });
        })
        .catch(() => null);
    }
  };

  _checkIfFieldsAreNotEmpty = (value) => {
    this.setState({
      email: value,
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
          title={strings('emailEditPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} extraScrollHeight={30} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <View style={pageStyle.iconBasedTextInputContainerStyle}>
            <IconBasedTextInput
              maxLength={commonConstant.MAX_CHARACTER_EMAIL}
              onSubmitEditing={this._onNextButtonClicked}
              title={strings('emailEditPage.label_email')}
              icon={require('../../../assets/email.png')}
              value={this.state.email}
              placeholderText={strings('emailEditPage.placeholder_email')}
              keyboardType={'email-address'}
              returnKeyType={'done'}
              onChangeText={(email) => this._checkIfFieldsAreNotEmpty(email)}
            />
          </View>
        </KeyboardAwareScrollView>
        <StandardButton
          onPress={this._onNextButtonClicked}
          color={commonTheme.COLOR_PRIMARY_DARK}
          disabled={!this.state.enableNextBtn}
          labelText={strings('emailEditPage.label_button_done')}
          isBottomButton
        />
      </View>
    );
  }
}
