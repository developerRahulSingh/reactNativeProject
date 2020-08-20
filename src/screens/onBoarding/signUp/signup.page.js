import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { CreateUserRequestModel } from '../../../models/requests';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './signup.page.style';

export default class SignUpPage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      FirstName: '',
      LastName: '',
      EmailAddress: '',
    });

    this.inputs = {};

    // bind required function (this binding is required in case the functions are passed as arguments to other components)
    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onNextButtonClicked = async () => {
    if (!this.state.FirstName.trim()) {
      return NavigationUtil.showAlert({messageText: strings('signUpPage.alert_please_enter_valid_first_name')});
    } else if (!this.state.LastName.trim()) {
      return NavigationUtil.showAlert({messageText: strings('signUpPage.alert_please_enter_valid_last_name')});
    } else if (!commonConstant.EMAIL_REGEX.test(this.state.EmailAddress.trim())) {
      return NavigationUtil.showAlert({messageText: strings('signUpPage.alert_please_enter_valid_email')});
    }

    let isSpecialUserTokenAvailable = await this.getSpecialUserAuthenticationToken();
    if (!!isSpecialUserTokenAvailable) {
      let userProp = new CreateUserRequestModel(this.state.FirstName.trim(), this.state.LastName.trim(), this.state.EmailAddress.trim(), this.SUAuthenticationToken);

      return interfaces.checkAvailableEmail(this.state.EmailAddress.trim(), this.SUAuthenticationToken)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.SignUp.SetPasswordPage, {
            User: userProp,
          });
        })
        .catch(() => null);
    }
  };

  _checkIfFieldsAreNotEmpty = (type, value) => {
    if (type === 'firstName') {
      this.setState({
        FirstName: value,
      }, () => {
        this._changeNextBtnState();
      });
    }
    if (type === 'lastName') {
      this.setState({
        LastName: value,
      }, () => {
        this._changeNextBtnState();
      });
    }
    if (type === 'emailAddress') {
      this.setState({
        EmailAddress: value,
      }, () => {
        this._changeNextBtnState();
      });
    }
  };

  _changeNextBtnState = () => {
    this.setState({
      enableNextBtn: !!this.state.FirstName && !!this.state.LastName && !!this.state.EmailAddress,
    });
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === 'done') {
      if (!!this.state.FirstName && !!this.state.LastName && !!this.state.EmailAddress) {
        await this._onNextButtonClicked();
      } else {
        return NavigationUtil.showAlert({messageText: strings('common.alert_fill_details')});
      }
    } else {
      this.inputs[nextField].focus();
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('signUpPage.title')}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}
          onPressEvent={this._backButton}/>
        <KeyboardAwareScrollView enableOnAndroid={false} showsVerticalScrollIndicator={false}
                                 contentContainerStyle={[commonStyle.keyboardScrollViewContentContainer, pageStyle.formView]}>
          <ScreenTitleImage imageAsset={require('../../../assets/signUpIcon.png')}/>
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['0'] = ref;
            }}
            onSubmitEditing={() => this._focusNextInputField('1')}
            title={strings('signUpPage.label_first_name')}
            icon={require('../../../assets/icon_user_black.png')}
            maxLength={commonConstant.MAX_CHARACTER_DEFAULT}
            value={this.state.FirstName}
            placeholderText={strings('signUpPage.placeholder_first_name')}
            returnKeyType={'next'}
            onChangeText={(firstName) => this._checkIfFieldsAreNotEmpty('firstName', firstName)}
          />
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['1'] = ref;
            }}
            onSubmitEditing={() => this._focusNextInputField('2')}
            title={strings('signUpPage.label_last_name')}
            icon={require('../../../assets/icon_user_black.png')}
            maxLength={commonConstant.MAX_CHARACTER_DEFAULT}
            value={this.state.LastName}
            placeholderText={strings('signUpPage.placeholder_last_name')}
            returnKeyType={'next'}
            onChangeText={(lastName) => this._checkIfFieldsAreNotEmpty('lastName', lastName)}
          />
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['2'] = ref;
            }}
            onSubmitEditing={() => this._focusNextInputField('done')}
            title={strings('signUpPage.label_email')}
            icon={require('../../../assets/icon_mail_black.png')}
            maxLength={commonConstant.MAX_CHARACTER_EMAIL}
            value={this.state.EmailAddress}
            placeholderText={strings('signUpPage.placeholder_email')}
            returnKeyType={'done'}
            keyboardType={'email-address'}
            onChangeText={(emailAddress) => this._checkIfFieldsAreNotEmpty('emailAddress', emailAddress)}
          />
        </KeyboardAwareScrollView>
        <StandardButton
          onPress={this._onNextButtonClicked}
          color={commonTheme.COLOR_PRIMARY_DARK}
          disabled={!this.state.enableNextBtn}
          labelText={strings('signUpPage.label_button_next')}
          isBottomButton={true}
        />
      </View>
    );
  }
}

