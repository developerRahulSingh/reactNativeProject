import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { getPINCodeSecurity, getUserCredentials, removePINCodeSecurity, saveUserCredentials, setPINCodeSecurity } from '../../../utils/security.util';
import { BasePage } from '../../common/base.page';
import { ButtonUnderlineText, ScreenTitleImage } from '../../common/components';
import { PINCodeGenerate, PINCodeValidate } from '../../common/components/pinCode';
import { pageStyle } from './alternateLogin.page.style';

export default class AlternateLoginPage extends BasePage {
  constructor(props) {
    super(props);
  }

  _onPINEntered = async (pinCode: string) => {
    this.setState({pinCode}, () => {
      return getPINCodeSecurity()
        .then((savedPINCode) => {
          return !!savedPINCode && (savedPINCode === pinCode);
        })
        .then(async (isSuccess) => {
          if (isSuccess) {
            let credentials = await getUserCredentials();
            if (credentials) {
              this.props.removeGoalAllocationData();
              return interfaces.userLogin(credentials.username, credentials.password)
                .then(async result => {
                  return await NavigationUtil.onSuccessfulLogin(result);
                })
                .catch(() => null);
            } else {
              await removePINCodeSecurity();
              return NavigationUtil.gotoLogin(true);
            }
          } else {
            this.setState({pinCode: ''});
          }
        })
        .catch(() => {
          this.setState({pinCode: ''});
        });
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage
          title={this.props.navigationProps.isPinSetup ? strings('alternateLoginPage.title_validate') : strings('alternateLoginPage.title_setup')}
          handleNotch
          imageAsset={require('../../../assets/b21_logo.png')}/>
        <View style={pageStyle.contentContainer}>
          {!this.props.navigationProps.isPinSetup ?
            <>
              <PINCodeGenerate pinCodeLength={6}
                               onComplete={async (pinCode) => {
                                 return setPINCodeSecurity(pinCode)
                                   .then(() => {
                                     return saveUserCredentials(this.props.navigationProps.username, this.props.navigationProps.password);
                                   })
                                   .then(() => {
                                     return NavigationUtil.onSuccessfulLogin(this.props.navigationProps.userInfo);
                                   });

                               }}
                               enterTitle={strings('alternateLoginPage.title_generate_pin')}
                               confirmTitle={strings('alternateLoginPage.title_generate_pin_confirm')}/>
              <View style={pageStyle.bottomButtonContainer}>
                <ButtonUnderlineText
                  title={strings('alternateLoginPage.label_button_skip_setup')}
                  onPressEvent={async () => {
                    return NavigationUtil.showAlert({
                      messageText: strings('alternateLoginPage.alert_skip_pin_setup'),
                      onRightButtonPress: async () => {
                        return NavigationUtil.onSuccessfulLogin(this.props.navigationProps.userInfo);
                      },
                      onLeftButtonPress: () => {
                      },
                    });
                  }}
                  hideUnderline
                  titleColor={commonTheme.COLOR_SECONDARY_DARK}/>
              </View>
            </> :
            <>
              <PINCodeValidate pinCodeLength={6}
                               pinCode={this.state.pinCode}
                               onComplete={this._onPINEntered}
                               enterTitle={strings('alternateLoginPage.title_validate_pin')}/>
              <View style={pageStyle.bottomButtonContainer}>
                <ButtonUnderlineText
                  title={strings('alternateLoginPage.label_button_login')}
                  onPressEvent={async () => {
                    return NavigationUtil.resetToStackRoot(this.props.componentId, screenId.Auth.Login.LoginPage);
                  }}
                  hideUnderline
                  titleColor={commonTheme.COLOR_SECONDARY_DARK}/>
              </View>
            </>}
        </View>
      </View>
    );
  }
}
