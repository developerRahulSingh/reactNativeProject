import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import { BasePage } from '../../common/base.page';
import { ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './registrationStatus.page.style';

export default class RegistrationStatusPage extends BasePage {

  constructor(props) {
    super(props, {}, true);
  }

  _backButtonHandler = async () => {
    console.log('Back Button work as Disable.');
  };

  componentDidMount = async () => {
    return interfaces.getUserInfo()
      .then((result) => {
        this.props.storeUserData(result);
      })
      .catch(() => null);
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    this.props.removeComponentID();
  };

  // _onNavigation = async (isSkip) => {
  //   return interfaces.getGoalAllocation()
  //     .then((result) => {
  //       this.props.storeGoalAllocation(result);
  //       return interfaces.getGoalDashboard();
  //     })
  //     .then((result) => {
  //       this.props.storeUserData({GoalDashboard: result});
  //       if (isSkip) {
  //         return NavigationUtil.gotoBottomTabsNavigation();
  //       } else {
  //         return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Investment.InvestmentAmountPage);
  //       }
  //     })
  //     .catch(() => null);
  // };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <ScreenTitleImage title={strings('registrationStatusPage.title')}
                          imageAsset={require('../../../assets/welcome.icon.png')}
                          imageAssetBackground={commonTheme.COLOR_TRANSPARENT} handleNotch={true}
                          descriptionText={strings('registrationStatusPage.description')}
                          descriptionTextColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}
                          showLargeDescription
        />
        <View style={[commonStyle.bottomButtonContainer, pageStyle.bottomButtonsContainerStyle]}>
          {/*<StandardButton*/}
          {/*  onPress={() => this._onNavigation(false)}*/}
          {/*  color={commonTheme.COLOR_DARK}*/}
          {/*  labelText={strings('registrationStatusPage.label_button_Invest_now')}*/}
          {/*/>*/}
          {/*<StandardButton*/}
          {/*  onPress={() => this._onNavigation(true)}*/}
          {/*  color={commonTheme.COLOR_TRANSPARENT}*/}
          {/*  labelColor={commonTheme.COLOR_BRIGHT}*/}
          {/*  labelText={strings('registrationStatusPage.label_button_skip')}*/}
          {/*/>*/}
          <StandardButton
            onPress={this._getBackToMainScreen}
            color={commonTheme.COLOR_DARK}
            labelText={strings('registrationStatusPage.label_button_Done')}
          />
        </View>
      </View>
    );
  }
}
