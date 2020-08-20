import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, LabeledInfoBlockComponent, StandardButton } from '../../common/components';
import { pageStyle } from './verifyUpdateEmail.page.style';

export default class VerifyUpdateEmailPage extends BasePage {
  constructor(props) {
    super(props);

    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _onNextButtonClicked = async () => {
    return interfaces.updateEmail(this.props.navigationProps.email)
      .then(() => {
        return NavigationUtil.showAlert({
          messageText: strings('verifyUpdateEmailPage.alert_success_change_email'),
          onRightButtonPress: () => {
            return NavigationUtil.goBackToScreen(this.props.componentID);
          },
        });
      })
      .catch(() => null);
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('verifyUpdateEmailPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={pageStyle.formView}>
          <LabeledInfoBlockComponent icon={require('../../../assets/email.png')} title={strings('verifyUpdateEmailPage.label_oldEmail')}
                                     value={this.props.User.Email} style={{marginBottom: 24}}/>
          <LabeledInfoBlockComponent icon={require('../../../assets/email.png')} title={strings('verifyUpdateEmailPage.label_newEmail')}
                                     value={this.props.navigationProps.email}/>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClicked}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('verifyUpdateEmailPage.label_button_done')}
          />
        </View>
      </View>
    );
  }
}
