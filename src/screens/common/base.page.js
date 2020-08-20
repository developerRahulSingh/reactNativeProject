import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { strings, switchLanguage } from '../../config/i18/i18n';
import { store } from '../../config/reduxStore/configure.store';
import { removeComponentID, storeGoalAllocation } from '../../config/reduxStore/reducers';
import screenId from '../../constants/screen.id.enum';
import stringConstant from '../../constants/string.constant';
import interfaces from '../../interfaces';
import commonTheme from '../../themes/common.theme';
import AsyncStorageUtil from '../../utils/asyncstorage.util';
import NavigationUtil from '../../utils/navigation.util';

class BasePage extends Component {
  SUAuthenticationToken: string;
  _isMounted = false;
  _handleBackButton: boolean;
  _backButtonHandler: any = null;

  constructor(props, state = {}, handleBackButton: boolean = false) {
    super(props);
    this.state = {
      ...state,
    };
    this._isMounted = true;
    this._handleBackButton = handleBackButton;

    console.log(`%c${this.constructor.name}: %cReceiving Props`, 'color: ' + commonTheme.COLOR_PRIMARY + '; font-weight: bold',
      'color: ' + commonTheme.COLOR_SECONDARY + '; font-weight: bold', this.props);
    console.log(`%c${this.constructor.name}: %cCurrent Store`, 'color: ' + commonTheme.COLOR_PRIMARY + '; font-weight: bold',
      'color: ' + commonTheme.COLOR_SECONDARY + '; font-weight: bold', store.getState());

    // this is only required when we are required to listen to events like `componentDidAppear` and `componentDidDisappear`
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    if (this._handleBackButton && !!this._backButtonHandler) {
      BackHandler.addEventListener('hardwareBackPress', this._backButtonHandler);
    }
  }

  componentDidDisappear() {
    if (this._handleBackButton && !!this._backButtonHandler) {
      BackHandler.removeEventListener('hardwareBackPress', this._backButtonHandler);
    }
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    this._isMounted = false;
  }

  changeLanguage = async (selectedLanguage: string) => {
    return AsyncStorageUtil.storeStringItem(stringConstant.LANGUAGE_CODE, selectedLanguage)
      .then(() => {
        global['CULTURE_NAME'] = selectedLanguage;
        switchLanguage(selectedLanguage, this);
      });
  };

  getSpecialUserAuthenticationToken = async () => {
    return interfaces.specialUserAuthenticationToken()
      .then((result) => {
        this.SUAuthenticationToken = result.Token;
        return true;
      })
      .catch(() => {
        return false;
      });
  };

  _getBackToMainScreen = () => {
    let componentID = store.getState().commonDataStore.componentID;
    if (!!componentID) {
      return NavigationUtil.goBackToScreen(componentID);
    } else {
      return NavigationUtil.reset(this.props.componentId);
    }
  };

  _navCloseButtonClick = () => {
    return NavigationUtil.showAlert({
      messageText: strings('common.alert_close_process'),
      onRightButtonPress: async () => {
        this._getBackToMainScreen();
      },
      onLeftButtonPress: () => null,
    });
  };

  _showAggregateKycStatusErrorPopup = async (inBetween: boolean) => {//In between stack flow
    return NavigationUtil.showAlert({
      messageText: strings('common.alert_kyc_complete_required'),
      alertTitle: strings('common.title_alert_kyc_required'),
      leftButtonText: strings('common.label_alert_button_later'),
      rightButtonText: strings('common.label_alert_button_start'),
      onRightButtonPress: async () => {
        if (!inBetween) {
          store.dispatch(removeComponentID());
        }
        await NavigationUtil.onStartKYCProcess(this.props.componentId);
      },
      onLeftButtonPress: () => null,
    });
  };

  _showGoalAllocationErrorPopup = async (inBetween: boolean) => {//In between stack flow
    return NavigationUtil.showAlert({
      messageText: strings('common.alert_already_portfolio_allocation'),
      alertTitle: strings('common.title_alert_allocation_required'),
      leftButtonText: strings('common.label_alert_button_no'),
      rightButtonText: strings('common.label_alert_button_yes'),
      onRightButtonPress: async () => {
        if (!inBetween) {
          store.dispatch(removeComponentID());
        }
        await interfaces.getGoalAllocation()
          .then(async (result) => {
            store.dispatch(storeGoalAllocation(result));
            return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Investment.InvestmentAmountPage);
          })
          .catch(async () => {
            await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.BuildPortfolioPage);
          });
      },
      onLeftButtonPress: () => null,
    });
  };
}

export { BasePage };
