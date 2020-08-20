import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, ScreenTitleImage, SetPasswordComponent, StandardButton } from '../common/components';
import { pageStyle } from './changePassword.page.style';

export default class ChangePasswordPage extends BasePage {

  constructor(props) {
    super(props, {
      enableNextBtn: false,
      password: '',
    });
    this._onChangedPasswordClick = this._onChangedPasswordClick.bind(this);
    this._backButton = this._backButton.bind(this);
    this._enableDisableNextButton = this._enableDisableNextButton.bind(this);
  }

  _enableDisableNextButton = (password: string) => {
    this.setState({
      password,
      enableNextBtn: !!password,
    });
  };

  _onChangedPasswordClick = async () => {
    if (!this.state.password) {
      await NavigationUtil.showAlert({messageText: strings('changePasswordPage.error_invalid_password')});
      return;
    }

    let isSpecialUserTokenAvailable = await this.getSpecialUserAuthenticationToken();
    if (!!isSpecialUserTokenAvailable) {
      return interfaces.forgotPassword(this.props.User.Email, this.SUAuthenticationToken)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.ChangePasswordVerificationPage, {
            specialAuth: this.SUAuthenticationToken,
            password: this.state.password,
          });
        })
        .catch(() => null);
    }
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('changePasswordPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          <ScreenTitleImage imageAsset={require('../../assets/setPassword.png')}
                            descriptionText={strings('changePasswordPage.description')}/>
          <View style={[pageStyle.formView]}>
            <SetPasswordComponent
              ref='passwordComponent'
              passwordTitle={strings('changePasswordPage.label_new_password')}
              passwordPlaceholderText={strings('changePasswordPage.placeholder_new_password')}
              confirmPasswordTitle={strings('changePasswordPage.label_retype_password')}
              confirmPasswordPlaceholderText={strings('changePasswordPage.label_retype_password')}
              onSubmitEditing={this._onChangedPasswordClick}
              onValidPasswordAvailable={(password) => this._enableDisableNextButton(password)}
              returnKeyType={'done'}/>
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onChangedPasswordClick}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('changePasswordPage.label_button_change_password')}
          />
        </View>
      </View>
    );
  }
}
