import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import stackName from '../../../constants/stack.name.enum';
import interfaces from '../../../interfaces';
import { CreateUserRequestModel } from '../../../models/requests';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { removePINCodeSecurity } from '../../../utils/security.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, ScreenTitleImage, SetPasswordComponent, StandardButton } from '../../common/components';
import { pageStyle } from './setPassword.page.style';

const propTypes = {user: PropTypes.instanceOf(CreateUserRequestModel)};
const defaultProps = {user: new CreateUserRequestModel()};

export default class SetPasswordPage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      password: '',
      referralCode: '',
    });
    this.inputs = {};
    // bind required function (this binding is required in case the functions are passed as arguments to other components)
    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _infoShowPopUp = () => {
    return NavigationUtil.showAlert({messageText: strings('setPasswordPage.alert_optional')});
  };

  // Actions
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onNextButtonClicked = async () => {
    if (!this.state.password) {
      return NavigationUtil.showAlert({messageText: strings('setPasswordPage.alert_invalid_password')});
    }
    try {
      // step 1: call create user api
      let resultCreateUser = await interfaces.createUser(this.props.navigationProps.User, this.state.password, this.state.referralCode.trim());
      if (!!resultCreateUser) {
        this.props.storeUserData(resultCreateUser);
        await removePINCodeSecurity();
      } else {
        return null;
      }

      // step 2: store countries and navigate to next screen
      let resultGetCountries = await interfaces.getCountries();
      if (!!resultGetCountries) {
        this.props.addCountry(resultGetCountries);
        return NavigationUtil.resetTo(stackName.EmailVerificationStack, screenId.OnBoarding.EmailConfirmation.EmailConfirmationPage);
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('setPasswordPage.title')}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}
          onPressEvent={this._backButton}/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}
                                 contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          <ScreenTitleImage imageAsset={require('../../../assets/setPassword.png')}
                            descriptionText={strings('setPasswordPage.description')}/>
          <View style={[pageStyle.formView]}>
            <SetPasswordComponent
              passwordTitle={strings('setPasswordPage.label_password')}
              passwordPlaceholderText={strings('setPasswordPage.placeholder_password')}
              confirmPasswordTitle={strings('setPasswordPage.label_retype_password')}
              confirmPasswordPlaceholderText={strings('setPasswordPage.placeholder_retype_password')}
              onSubmitEditing={() => {
                this.inputs['referralInput'].focus();
              }}
              onValidPasswordAvailable={(password) => {
                this.setState({
                  password,
                  enableNextBtn: !!password,
                });
              }}/>
            <IconBasedTextInput
              onRef={(ref) => {
                this.inputs['referralInput'] = ref;
              }}
              infoIcon={require('../../../assets/icon_info.png')}
              InfoIconButtonPress={this._infoShowPopUp}
              onSubmitEditing={() => {
                return this._onNextButtonClicked();
              }}
              title={strings('setPasswordPage.label_referral_code')}
              icon={require('../../../assets/icon_pointer_black.png')}
              maxLength={commonConstant.REFERRAL_CODE_CHARACTER}
              value={this.state.referralCode}
              placeholderText={strings('setPasswordPage.placeholder_referral_code')}
              returnKeyType={'done'}
              onChangeText={(referralCode) => {
                this.setState({
                  referralCode,
                });
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <StandardButton
          onPress={this._onNextButtonClicked}
          color={commonTheme.COLOR_PRIMARY_DARK}
          disabled={!this.state.enableNextBtn}
          labelText={strings('setPasswordPage.label_button_next')}
          isBottomButton={true}
        />
      </View>
    );
  }
}

SetPasswordPage.propTypes = propTypes;
SetPasswordPage.defaultProps = defaultProps;
