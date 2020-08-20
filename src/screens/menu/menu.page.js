import React from 'react';
import { ScrollView, View } from 'react-native';
import { Freshchat } from 'react-native-freshchat-sdk';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import stringConstant from '../../constants/string.constant';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import AsyncStorageUtil from '../../utils/asyncstorage.util';
import commonUtil from '../../utils/common.util';
import NavigationUtil from '../../utils/navigation.util';
import { isPINCodeSecurityEnabled, removePINCodeSecurity } from '../../utils/security.util';
import { BasePage } from '../common/base.page';
import { BoldText, LightText, MenuScreenButton, ScreenTitleImage } from '../common/components';
import { pageStyle } from './menu.page.style';

export default class MenuPage extends BasePage {
  constructor(props) {
    super(props, {
      language_name: global['CULTURE_NAME'],
      showSignOut: false,
    }, true);

    this._openRespectiveScreen = this._openRespectiveScreen.bind(this);
  }

  _backButtonHandler = async () => {
    return NavigationUtil.gotoDashboardTab(this.props.componentId);
  };

  _signOutButtonPressed = () => {
    return NavigationUtil.showAlert({
      messageText: strings('menuPage.label_logout_popup_description'),
      alertTitle: strings('menuPage.title_logout_popup'),
      onRightButtonPress: async () => {
        Freshchat.resetUser();
        return NavigationUtil.gotoLogin();
      },
      onLeftButtonPress: () => null,
    });
  };

  componentDidMount = async (): void => {
    AsyncStorageUtil.getItem(stringConstant.LANGUAGE_CODE).then((value) => {
      this.setState({language_name: value});
    });
    this.setState({
      showSignOut: await isPINCodeSecurityEnabled(),
    });
  };

  _investmentAllocationClickEvent = async () => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      if (Object.keys(this.props.GoalAllocation).length === 0) {
        this.props.removeComponentID();
        await interfaces.getGoalAllocation()
          .then(async (result) => {
            this.props.storeGoalAllocation(result);
            await NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.ManageInvestmentAllocationPage);
          })
          .catch(async () => {
            await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.BuildPortfolioPage);
          });
      } else {
        await NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.ManageInvestmentAllocationPage);
      }
    }
  };

  _openRespectiveScreen = async (screenID) => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false && screenID === screenId.Transactional.Deposit.DepositAmountPage) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      await NavigationUtil.gotoScreen(this.props.componentId, screenID);
    }
  };

  _onShowLanguagesList = async () => {
    await NavigationUtil.showOverlay(screenId.Overlays.LanguageSelector, {
      items: commonUtil.languageOptions.map(item => ({...item, selected: item.key === this.state.language_name})),
      onItemSelected: this._onLanguageSelected,
    });
  };

  _onLanguageSelected = async (selectedLanguage) => {
    this.setState({
      language_name: selectedLanguage.key,
    }, async () => {
      return await this.changeLanguage(selectedLanguage.key);
    });
  };

  openSecurityPopup = async () => {
    let items = [strings('menuPage.label_change_password')];

    const userSkippedPINSetup = await AsyncStorageUtil.getItem('userSkippedPINSetup');

    if (await isPINCodeSecurityEnabled()) {
      items.push(strings('menuPage.label_remove_pin'));
    } else {
      if (userSkippedPINSetup) {
        items.push(strings('menuPage.label_enable_pin'));
      } else {
        items.push(strings('menuPage.label_disable_pin'));
      }
    }

    return NavigationUtil.showOverlay(screenId.Overlays.SimpleSelector, {
      items: items.map(item => ({
        label: item,
        key: item,
        selected: false,
      })),
      onItemSelected: (selectedItem) => {
        switch (selectedItem.key) {
          case strings('menuPage.label_change_password'):
            return this._openRespectiveScreen(screenId.Menu.ChangePasswordPage);
          case strings('menuPage.label_remove_pin'):
            return NavigationUtil.showAlert({
              alertTitle: strings('menuPage.label_remove_pin'),
              messageText: strings('menuPage.alert_sure'),
              onRightButtonPress: async () => {
                return removePINCodeSecurity();
              },
              onLeftButtonPress: () => null,
            });
          case strings('menuPage.label_enable_pin'):
            return AsyncStorageUtil.removeItem('userSkippedPINSetup');
          case strings('menuPage.label_disable_pin'):
            return AsyncStorageUtil.setItem('userSkippedPINSetup', true);
          default:
            return;
        }
      },
    });
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.mainContainer]}>
        <ScreenTitleImage titleColor={commonTheme.COLOR_PRIMARY_DARK} title={strings('menuPage.title')}
                          handleNotch={true}/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={pageStyle.menuView}>
          <View style={pageStyle.sectionHeadingContainer}>
            <BoldText style={pageStyle.sectionHeading}>{strings('menuPage.label_my_account')}</BoldText>
          </View>
          <MenuScreenButton
            buttonClickEvent={() => this._investmentAllocationClickEvent()}
            imageLink={require('../../assets/menu.investment.icon.png')}
            buttonName={strings('menuPage.label_button_investment_allocation')}
          />
          <MenuScreenButton
            buttonClickEvent={() => this._openRespectiveScreen(screenId.Menu.TransactionHistoryPage)}
            imageLink={require('../../assets/menu.transectionhistory.icon.png')}
            buttonName={strings('menuPage.label_button_transaction_history')}
          />
          <MenuScreenButton
            buttonClickEvent={async () => {
              if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
                return this._showAggregateKycStatusErrorPopup(false);
              } else {
                return this._openRespectiveScreen(screenId.Transactional.Withdraw.WithdrawAmountPage);
              }
            }}
            imageLink={require('../../assets/menu.withdraw.icon.png')}
            buttonName={strings('menuPage.label_button_withdraw')}
          />
          <MenuScreenButton
            buttonClickEvent={() => this._openRespectiveScreen(screenId.Transactional.Deposit.DepositAmountPage)}
            imageLink={require('../../assets/menu.fundingmethod.icon.png')}
            buttonName={strings('menuPage.label_button_deposit')}
          />
          <MenuScreenButton
            buttonClickEvent={this._onShowLanguagesList}
            imageLink={require('../../assets/language.png')}
            buttonName={strings('menuPage.label_button_language')}
          />
          <MenuScreenButton
            buttonClickEvent={() => this._openRespectiveScreen(screenId.Menu.ProfitLossReportPage)}
            imageLink={require('../../assets/menu.help.icon.png')}
            buttonName={strings('menuPage.label_button_profit_loss_report')}
          />
          <MenuScreenButton
            buttonClickEvent={() => this.openSecurityPopup()}
            imageLink={require('../../assets/menu.security.icon.png')}
            buttonName={strings('menuPage.label_button_security')}
          />
          <View style={pageStyle.sectionHeadingContainer}>
            <BoldText style={pageStyle.sectionHeading}>{strings('menuPage.label_app_settings')}</BoldText>
            <LightText style={pageStyle.menuVersionNumberText}>{strings('menuPage.label_version') + global['APP_VERSION']}</LightText>
          </View>
          <MenuScreenButton
            buttonClickEvent={() => this._openRespectiveScreen(screenId.Menu.HelpPage)}
            imageLink={require('../../assets/menu.help.icon.png')}
            buttonName={strings('menuPage.label_button_help')}
          />
          <MenuScreenButton
            buttonClickEvent={() => this._openRespectiveScreen(screenId.Menu.LegalPage)}
            imageLink={require('../../assets/menu.legal.icon.png')}
            buttonName={strings('menuPage.label_button_legal')}
          />
          <MenuScreenButton
            buttonClickEvent={this._signOutButtonPressed}
            imageLink={require('../../assets/menu.signout.icon.png')}
            buttonName={strings('menuPage.label_button_logout')}
          />
        </ScrollView>
      </View>
    );
  }
}
