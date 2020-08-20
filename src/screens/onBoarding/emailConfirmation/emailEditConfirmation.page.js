import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { LabeledInfoBlockComponent } from '../../../screens/common/components';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, StandardButton } from '../../common/components';
import { pageStyle } from './emailEditConfirmation.page.style';

export default class EmailEditConfirmationPage extends BasePage {
  constructor(props) {
    super(props);
    // bind required function (this binding is required in case the functions are passed as arguments to other components)
    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
    this._backButton = this._backButton.bind(this);
  }

  _onNextButtonClicked = async () => {
    return interfaces.updateEmail(this.props.navigationProps.email)
      .then(() => {
        return interfaces.getUserInfo();
      })
      .then((result) => {
        this.props.storeUserData(result);
        return NavigationUtil.reset(this.props.componentId);
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
          title={strings('emailEditConfirmationPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={[pageStyle.emailConfirmationContainerStyle, commonStyle.container]}>
          <LabeledInfoBlockComponent icon={require('../../../assets/email.png')}
                                     title={strings('emailEditConfirmationPage.label_oldEmail')}
                                     value={this.props.User.Email}
                                     style={pageStyle.oldEmailStyle}/>
          <LabeledInfoBlockComponent icon={require('../../../assets/email.png')}
                                     title={strings('emailEditConfirmationPage.label_newEmail')}
                                     value={this.props.navigationProps.email}/>
        </View>
        <StandardButton
          onPress={this._onNextButtonClicked}
          color={commonTheme.COLOR_PRIMARY_DARK}
          labelText={strings('emailEditConfirmationPage.label_button_update_email')}
          isBottomButton
        />
      </View>
    );
  }
}
