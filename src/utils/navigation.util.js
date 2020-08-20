import { Dimensions, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { strings } from '../config/i18/i18n';
import { store } from '../config/reduxStore/configure.store';
import { addCountry, storeCurrencies, storeUserData } from '../config/reduxStore/reducers';
import screenId from '../constants/screen.id.enum';
import stackName from '../constants/stack.name.enum';
import interfaces from '../interfaces';
import { UserBO } from '../models/businessObjects';
import commonTheme from '../themes/common.theme';
import { isPINCodeSecurityEnabled } from './security.util';

const NavigationUtil = {
  setDefaultOptions: () => {
    const screenWidth = parseInt(parseFloat(Dimensions.get('window').width).toFixed(0));
    Navigation.setDefaultOptions({
      popGesture: false,
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
        height: 0,
      },
      layout: {
        orientation: 'portrait',
        backgroundColor: commonTheme.COLOR_BRIGHT,
        componentBackgroundColor: commonTheme.COLOR_BRIGHT,
      },
      animations: {
        setRoot: {
          alpha: {from: 0, to: 1, duration: 250, interpolation: 'decelerate'},
          translationX: {from: screenWidth, to: 0, duration: 350, interpolation: 'decelerate'},
          waitForRender: true,
        },
        setStackRoot: {
          alpha: {from: 0, to: 1, duration: 250, interpolation: 'decelerate'},
          translationX: {from: screenWidth, to: 0, duration: 350, interpolation: 'decelerate'},
          waitForRender: true,
        },
        pop: {
          content: {
            alpha: {from: 1, to: 0.2, duration: 250, interpolation: 'decelerate'},
            translationX: {from: 0, to: screenWidth, duration: 350, interpolation: 'decelerate'},
            waitForRender: true,
          },
        },
        push: {
          content: {
            alpha: {from: 0, to: 1, duration: 250, interpolation: 'decelerate'},
            translationX: {from: screenWidth, to: 0, duration: 350, interpolation: 'decelerate'},
            waitForRender: true,
          },
        },
        // these animations will not used as of now as the popups are not using the modal as of now
        showModal: {
          enabled: true,
          alpha: {from: 0, to: 1, duration: 250, interpolation: 'decelerate'},
          scaleX: {from: 0.7, to: 1, duration: 350, interpolation: 'decelerate'},
          scaleY: {from: 0.7, to: 1, duration: 350, interpolation: 'decelerate'},
          waitForRender: true,
        },
        dismissModal: {
          enabled: true,
          alpha: {from: 1, to: 0, duration: 250, interpolation: 'decelerate'},
          scaleX: {from: 1, to: 0.6, duration: 350, interpolation: 'decelerate'},
          scaleY: {from: 1, to: 0.6, duration: 350, interpolation: 'decelerate'},
          waitForRender: true,
        },
      },
    });
  },
  onStartKYCProcess: async (currentComponentID) => {
    let currentState = store.getState();
    if (!currentState.userDataStore.UserSignupRegistrationInfo.ValidAddress) {
      await NavigationUtil.gotoScreenWithHideBottomTabs(currentComponentID, screenId.OnBoarding.KYC.ConfirmCountryPage);
    } else if (currentState.userDataStore.UserSignupRegistrationInfo.SourceOfFunds === null) {
      await NavigationUtil.gotoScreenWithHideBottomTabs(currentComponentID, screenId.OnBoarding.KYC.DeclareSourceOfFundsPage);
    } else if (currentState.userDataStore.UserSignupRegistrationInfo.KYCType === 'Not Defined') {
      await NavigationUtil.gotoScreenWithHideBottomTabs(currentComponentID, screenId.OnBoarding.KYC.ConfirmNamePage);
    } else if (currentState.userDataStore.UserSignupRegistrationInfo.KYCStatus !== 'N' && currentState.userDataStore.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return NavigationUtil.showAlert({messageText: strings('userProfilePage.alert_kyc_error')});
    } else {
      return NavigationUtil.showAlert({messageText: strings('common.alert_already_kyc')});
    }
  },
  onSuccessfulLogin: async (userInfo: UserBO) => {
    store.dispatch(storeUserData(userInfo));
    let continueProcess = true;
    // Step 1: get the supported currencies for user
    await interfaces.getCurrencies()
      .then((result) => {
        store.dispatch(storeCurrencies(result));
      })
      .catch((response) => {
        if (!response) {
          continueProcess = false;
        }
      });

    if (!continueProcess) {
      return null;
    }

    // Step 2: get the supported countries for user
    await interfaces.getCountries()
      .then((result) => {
        store.dispatch(addCountry(result));
      })
      .catch((response) => {
        if (!response) {
          continueProcess = false;
        }
      });

    if (!continueProcess) {
      return null;
    }

    /**
     * before user can land to the dashboard, it required to validate:
     * 1. if the phone country is supported for the sign up process, if not, show the screen to tell users
     *    that their country is not yet supported
     * 2. if the mobile phone verified, if not, start mobile phone verification process
     * 3. if the user has accepted the terms and conditions, if not, show the terms and conditions screen
     * 4. check if the user has defined a goal, if not, start the goal definition process, like allocation etc
     * 5. confirm the country of residence and complete the KYC process if not done already
     * 6. complete user profile by asking the address and name of the user
     */
    if (userInfo.UserSignupRegistrationInfo.PhoneCountryCodeSignupSupported === 'F') {
      await NavigationUtil.resetTo(stackName.AuthenticationStack, screenId.OnBoarding.SignUp.CountryNotSupportedPage);
    } else if (userInfo.UserSignupRegistrationInfo.EmailVerified === false) {
      await NavigationUtil.resetTo(stackName.EmailVerificationStack, screenId.OnBoarding.EmailConfirmation.EmailConfirmationPage);
    } else if (userInfo.UserSignupRegistrationInfo.MobilePhoneVerified === false) {
      await NavigationUtil.resetTo(stackName.MobileVerificationStack, screenId.OnBoarding.AddMobile.AddMobilePage);
    } else if (userInfo.UserSignupRegistrationInfo.TermsAndConditionsAccepted === false) {
      await NavigationUtil.resetTo(stackName.TermsAndConditionsStack, screenId.OnBoarding.SignUp.TermsAndConditionsPage);
    } else if (userInfo.GoalDashboard.GoalID === null) {
      await NavigationUtil.resetTo(stackName.GoalCreationStack, screenId.OnBoarding.SignUp.WelcomePage);
      // } else if (userInfo.User.Address1 === null) {
      //   await NavigationUtil.resetTo(stackName.KYCScreenStack, screenId.OnBoarding.KYC.ConfirmCountryPage);
      // } else if (userInfo.UserSignupRegistrationInfo.SourceOfFunds === null) {
      //   await NavigationUtil.resetTo(stackName.KYCScreenStack, screenId.OnBoarding.KYC.DeclareSourceOfFundsPage);
      // } else if (userInfo.UserSignupRegistrationInfo.KYCType === 'Not Defined') {
      //   await NavigationUtil.resetTo(stackName.KYCScreenStack, screenId.OnBoarding.KYC.ConfirmNamePage);
    } else {
      // Step 3: store goal allocation
      // await interfaces.getGoalAllocation()
      //   .then((result) => {
      //     store.dispatch(storeGoalAllocation(result));
      return NavigationUtil.gotoBottomTabsNavigation();
      // })
      // .catch(() => null);
    }
  },
  showLoginPageAtStartUp: async () => {
    // let isSuccess = await removePINCodeSecurity();
    let isPinSetup = await isPINCodeSecurityEnabled();
    if (isPinSetup) {
      return Navigation.setRoot({
        root: {
          stack: {
            id: stackName.AuthenticationStack,
            children: [
              {
                component: {
                  name: screenId.Auth.Login.AlternateLoginPage,
                  passProps: {
                    navigationProps: {
                      isPinSetup,
                    },
                  },
                  options: {
                    statusBar: {
                      visible: false,
                    },
                    animations: {
                      setRoot: {
                        alpha: {from: 0, to: 1, duration: 250, interpolation: 'decelerate'},
                        waitForRender: true,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      });
    } else {
      return Navigation.setRoot({
        root: {
          stack: {
            id: stackName.AuthenticationStack,
            children: [
              {
                component: {
                  name: screenId.Auth.Login.LoginPage,
                  passProps: {
                    navigationProps: {}, // we are intentionally passing the empty object here so that the null check can be avoided
                  },
                  options: {
                    statusBar: {
                      visible: false,
                    },
                    animations: {
                      setRoot: {
                        alpha: {from: 0, to: 1, duration: 250, interpolation: 'decelerate'},
                        waitForRender: true,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      });
    }
  },
  reset: async (currentScreenID) => {
    return Navigation.popToRoot(currentScreenID);
  },
  resetTo: async (stackID: string, screenID: string, navigationProps: any = {}) => {
    return Navigation.setRoot({
      root: {
        stack: {
          id: stackID,
          children: [
            {
              component: {
                name: screenID,
                options: {
                  statusBar: {
                    visible: false,
                  },
                },
                passProps: {
                  navigationProps: navigationProps,
                },
              },
            },
          ],
        },
      },
    });
  },
  resetToStackRoot: async (currentScreenID: string, screenID: string, navigationProps: any = {}) => {
    return Navigation.setStackRoot(currentScreenID, {
      component: {
        name: screenID,
        options: {
          statusBar: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  goBack: async (currentScreenID) => {
    return Navigation.pop(currentScreenID);
  },
  goBackToScreen: async (currentScreenID) => {
    return Navigation.popTo(currentScreenID);
  },
  gotoLogin: async (isCredentialsExpired: boolean = false) => {
    if (isCredentialsExpired) {
      await NavigationUtil.showAlert({
        messageText: strings('common.alert_session_expire'),
        alertTitle: strings('common.title_session_expire'),
      });
    }

    let isPinSetup = await isPINCodeSecurityEnabled();
    if (isPinSetup) {
      return NavigationUtil.resetTo(stackName.AuthenticationStack, screenId.Auth.Login.AlternateLoginPage, {isPinSetup});
    } else {
      return NavigationUtil.resetTo(stackName.AuthenticationStack, screenId.Auth.Login.LoginPage);
    }
  },
  gotoScreen: async (currentScreenID: string, nextScreenID: string, navigationProps: any = {}) => {
    return Navigation.push(currentScreenID, {
      component: {
        name: nextScreenID,
        options: {
          statusBar: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  gotoScreenWithHideBottomTabs: async (currentScreenID: string, nextScreenID: string, navigationProps: any = {}) => {
    return Navigation.push(currentScreenID, {
      component: {
        name: nextScreenID,
        options: {
          statusBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  showOverlay: async (overlayID: string, passProps: any = null) => {
    return Navigation.showOverlay({
      component: {
        name: overlayID,
        passProps: passProps,
        options: {
          layout: {
            backgroundColor: commonTheme.COLOR_TRANSPARENT,
            componentBackgroundColor: commonTheme.COLOR_TRANSPARENT,
          },
          statusBar: {
            visible: false,
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    });
  },
  showProgressIndicator: async () => {
    return NavigationUtil.showOverlay(screenId.Overlays.ProgressIndicator);
  },
  showAlert: async (props) => {
    return NavigationUtil.showOverlay(screenId.Overlays.CommonAlert, props);
  },
  gotoDashboardTab: async (componentID) => {
    Navigation.mergeOptions(componentID, {
      bottomTabs: {
        currentTabIndex: 2,
      },
    });
  },
  gotoBottomTabsNavigation: async () => {
    await Navigation.setRoot({
        root: {
          bottomTabs: {
            id: stackName.HomeBottomTab,
            options: {
              bottomTabs: {
                visible: true,
                animate: true,
                drawBehind: false,
                titleDisplayMode: 'alwaysHide',
                backgroundColor: commonTheme.COLOR_BOTTOM_TAB_BG,
                currentTabIndex: 2,
                preferLargeIcons: true,
              },
              statusBar: {
                visible: false,
              },
            },
            children: [
              {
                stack: {
                  id: stackName.EarnScreenStack,
                  children: [
                    {
                      component: {
                        name: screenId.Earn.Page,
                        options: {
                          statusBar: {
                            visible: false,
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: require('../assets/icon_nav_earn_normal.png'),
                      selectedIcon: require('../assets/icon_nav_earn_selected.png'),
                      // iconInsets: {top: 5, left: 0, bottom: -5, right: 0},
                    },
                    statusBar: {
                      visible: false,
                    },
                  },
                },
              },
              {
                stack: {
                  id: stackName.DepositScreenStack,
                  children: [
                    {
                      component: {
                        name: screenId.DepositTab.Page,
                        options: {
                          statusBar: {
                            visible: false,
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: require('../assets/icon_nav_deposit_normal.png'),
                      selectedIcon: require('../assets/icon_nav_deposit_selected.png'),
                      iconInsets: {top: 5, left: 0, bottom: -5, right: 0},
                    },
                    statusBar: {
                      visible: false,
                    },
                  },
                },
              },
              {
                stack: {
                  id: stackName.GoalScreenStack,
                  children: [
                    {
                      component: {
                        name: screenId.Dashboard.Page,
                        options: {
                          statusBar: {
                            visible: false,
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: require('../assets/icon_nav_goal_normal.png'),
                      selectedIcon: require('../assets/icon_nav_goal_selected.png'),
                      iconInsets: {top: 5, left: 0, bottom: -5, right: 0},
                    },
                    statusBar: {
                      visible: false,
                    },
                  },
                },
              },
              {
                stack: {
                  id: stackName.MenuScreenStack,
                  children: [
                    {
                      component: {
                        name: screenId.Menu.Page,
                        options: {
                          statusBar: {
                            visible: false,
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: require('../assets/icon_nav_menu_normal.png'),
                      selectedIcon: require('../assets/icon_nav_menu_selected.png'),
                      iconInsets: {top: 5, left: 0, bottom: -5, right: 0},
                    },
                    statusBar: {
                      visible: false,
                    },
                  },
                },
              },
            ],
          },
        },
      })
      .then(() => {
        if (Platform.OS === 'android') {
          console.log(`registering the tab change event for ${Platform.OS}`);
          Navigation.events().registerBottomTabSelectedListener(
            async ({selectedTabIndex, unselectedTabIndex}) => {
              console.log(`tab change event detected from tab ${unselectedTabIndex} to ${selectedTabIndex}`);
              if (selectedTabIndex === unselectedTabIndex) {
                if (selectedTabIndex === 0) {
                  await Navigation.popToRoot(stackName.EarnScreenStack).catch(() => {
                    console.log('already at the root');
                  });
                }
                if (selectedTabIndex === 1) {
                  await Navigation.popToRoot(stackName.DepositScreenStack).catch(() => {
                    console.log('already at the root');
                  });
                }
                if (selectedTabIndex === 2) {
                  await Navigation.popToRoot(stackName.GoalScreenStack).catch(() => {
                    console.log('already at the root');
                  });
                }
                if (selectedTabIndex === 3) {
                  await Navigation.popToRoot(stackName.MenuScreenStack).catch(() => {
                    console.log('already at the root');
                  });
                }
              }
            },
          );
        }
      });
  },
};

export default NavigationUtil;
