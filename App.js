import NetInfo from '@react-native-community/netinfo';
import { Dimensions, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { detectLanguage, switchLanguage } from './src/config/i18/i18n';
import { store } from './src/config/reduxStore/configure.store';
import screenId from './src/constants/screen.id.enum';
import stringConstant from './src/constants/string.constant';
import { AlternateLoginPageWithRedux, ForgotPasswordPageWithRedux, LoginPageWithRedux, ResetPasswordPageWithRedux } from './src/screens/auth';
import {
  ActionModel,
  CommonAlert,
  CountrySelector,
  LanguageSelector,
  ProgressIndicator,
  SimpleSelector,
  StateSelector,
  TransactionInstructions,
  YearSelector,
} from './src/screens/common/modals';
import { AppUpdatePageWithRedux, UpgradeToVIPPageWithRedux } from './src/screens/common/pages';
import { DashboardPageWithRedux } from './src/screens/dashboard';
import { CashBalanceInfoPageWithRedux } from './src/screens/depositTab';
import { EarnPageWithRedux } from './src/screens/earn';
import {
  ChangePasswordPageWithRedux,
  ChangePasswordVerificationPageWithRedux,
  HelpPageWithRedux,
  LegalPageWithRedux,
  ManageInvestmentAllocationPageWithRedux,
  MenuPageWithRedux,
  ProfitLossReportPageWithRedux,
  TransactionDetailPageWithRedux,
  TransactionHistoryPageWithRedux,
  UpdateEmailPageWithRedux,
  UpdateMobilePageWithRedux,
  UserProfilePageWithRedux,
  VerifyUpdateEmailPageWithRedux,
  VerifyUpdateMobilePageWithRedux,
} from './src/screens/menu';
import {
  AddMobilePageWithRedux,
  BuildPortfolioPageWithRedux,
  BuildPortfolioStatusPageWithRedux,
  CollectAdditionalInformationPageWithRedux,
  CollectAddressPageWithRedux,
  CollectDoBPageWithRedux,
  CollectUniqueIDPageWithRedux,
  ConfirmCountryPageWithRedux,
  ConfirmNamePageWithRedux,
  CountryNotSupportedPageWithRedux,
  CustomizeAllocationPageWithRedux,
  DeclareSourceOfFundsPageWithRedux,
  EmailConfirmationPageWithRedux,
  EmailEditConfirmationPageWithRedux,
  EmailEditPageWithRedux,
  PortfolioAllocationSummaryPageWithRedux,
  RegistrationStatusPageWithRedux,
  SetPasswordPageWithRedux,
  SignUpPageWithRedux,
  TermsAndConditionsPageWithRedux,
  UploadDocumentPageWithRedux,
  VerifyMobilePageWithRedux,
  WelcomePageWithRedux,
} from './src/screens/onBoarding';
import {
  AddPaymentInstrumentDynamicFieldsPageWithRedux,
  AddPaymentInstrumentWebViewPageWithRedux,
  AddPaymentInstrumentWidgetPageWithRedux,
  BuySingleAssetPageWithRedux,
  CashBalanceActionsPageWithRedux,
  CoinInfoPageWithRedux,
  ConfirmTransactionPageWithRedux,
  DepositAmountPageWithRedux,
  DepositCoinPageWithRedux,
  InvestmentAmountPageWithRedux,
  SelectPaymentInstrumentPageWithRedux,
  SelectPaymentInstrumentTypePageWithRedux,
  SelectSellAssetsOptionPageWithRedux,
  SelectTransferServiceTypePageWithRedux,
  SellAssetsAdvancedPageWithRedux,
  SellAssetsAmountPageWithRedux,
  SellSingleAssetPageWithRedux,
  TransactionInstructionsPageWithRedux,
  TransactionStatusPageWithRedux,
  WithdrawAmountPageWithRedux,
} from './src/screens/transactional';

import AsyncStorageUtil from './src/utils/asyncstorage.util';
import NavigationUtil from './src/utils/navigation.util';

const publicIp = require('public-ip');

export class App {
  constructor() {
    this._registerComponents();

    // this must be the first action in the application lifecycle initiation
    Navigation.events()
      .registerAppLaunchedListener(async () => { //Change default launcher screen to login
        await this._setGlobalProperties();
        NavigationUtil.setDefaultOptions();
        await NavigationUtil.showLoginPageAtStartUp();
      });
  }

  _registerComponents() {
    // this is the first screen component, so registering it first so that the app screen can be launched
    Navigation.registerComponentWithRedux(screenId.Auth.Login.AlternateLoginPage, () => AlternateLoginPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Auth.Login.LoginPage, () => LoginPageWithRedux, Provider, store);

    Navigation.registerComponentWithRedux(screenId.Auth.ForgotPassword.ForgotPasswordPage, () => ForgotPasswordPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Auth.ForgotPassword.ResetPasswordPage, () => ResetPasswordPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Common.AppUpdatePage, () => AppUpdatePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Common.UpgradeToVIPPage, () => UpgradeToVIPPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Dashboard.Page, () => DashboardPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.DepositTab.Page, () => CashBalanceInfoPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Earn.Page, () => EarnPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.ChangePasswordPage, () => ChangePasswordPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.ChangePasswordVerificationPage, () => ChangePasswordVerificationPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.HelpPage, () => HelpPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.LegalPage, () => LegalPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.ManageInvestmentAllocationPage, () => ManageInvestmentAllocationPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.Page, () => MenuPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.ProfitLossReportPage, () => ProfitLossReportPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.TransactionDetailPage, () => TransactionDetailPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.TransactionHistoryPage, () => TransactionHistoryPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.UserProfile.Page, () => UserProfilePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.UserProfile.UpdateEmailPage, () => UpdateEmailPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.UserProfile.UpdateMobilePage, () => UpdateMobilePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.UserProfile.VerifyUpdateEmailPage, () => VerifyUpdateEmailPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Menu.UserProfile.VerifyUpdateMobilePage, () => VerifyUpdateMobilePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.AddMobile.AddMobilePage, () => AddMobilePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.AddMobile.VerifyMobilePage, () => VerifyMobilePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.EmailConfirmation.EmailConfirmationPage, () => EmailConfirmationPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.EmailConfirmation.EmailEditConfirmationPage, () => EmailEditConfirmationPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.EmailConfirmation.EmailEditPage, () => EmailEditPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.CollectAdditionalInformationPage, () => CollectAdditionalInformationPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.CollectAddressPage, () => CollectAddressPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.CollectDoBPage, () => CollectDoBPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.CollectUniqueIDPage, () => CollectUniqueIDPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.ConfirmCountryPage, () => ConfirmCountryPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.ConfirmNamePage, () => ConfirmNamePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.DeclareSourceOfFundsPage, () => DeclareSourceOfFundsPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.RegistrationStatusPage, () => RegistrationStatusPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.KYC.UploadDocumentPage, () => UploadDocumentPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.Portfolio.BuildPortfolioPage, () => BuildPortfolioPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.Portfolio.BuildPortfolioStatusPage, () => BuildPortfolioStatusPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.Portfolio.CustomizeAllocationPage, () => CustomizeAllocationPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.Portfolio.PortfolioAllocationSummaryPage, () => PortfolioAllocationSummaryPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.SignUp.CountryNotSupportedPage, () => CountryNotSupportedPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.SignUp.SetPasswordPage, () => SetPasswordPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.SignUp.SignUpPage, () => SignUpPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.SignUp.TermsAndConditionsPage, () => TermsAndConditionsPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.OnBoarding.SignUp.WelcomePage, () => WelcomePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.BuySingleAssetPage, () => BuySingleAssetPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.CoinInfoPage, () => CoinInfoPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.DepositCoinPage, () => DepositCoinPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.SelectSellAssetsOptionPage, () => SelectSellAssetsOptionPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.SellAssetsAdvancedPage, () => SellAssetsAdvancedPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.SellAssetsAmountPage, () => SellAssetsAmountPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.BuySellAssets.SellSingleAssetPage, () => SellSingleAssetPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.AddPaymentInstrumentDynamicFieldsPage, () => AddPaymentInstrumentDynamicFieldsPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.AddPaymentInstrumentWebViewPage, () => AddPaymentInstrumentWebViewPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.AddPaymentInstrumentWidgetPage, () => AddPaymentInstrumentWidgetPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.CashBalanceActionsPage, () => CashBalanceActionsPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.ConfirmTransactionPage, () => ConfirmTransactionPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.SelectPaymentInstrumentPage, () => SelectPaymentInstrumentPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.SelectPaymentInstrumentTypePage, () => SelectPaymentInstrumentTypePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.SelectTransferServiceTypePage, () => SelectTransferServiceTypePageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.TransactionInstructionsPage, () => TransactionInstructionsPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Common.TransactionStatusPage, () => TransactionStatusPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Deposit.DepositAmountPage, () => DepositAmountPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Investment.InvestmentAmountPage, () => InvestmentAmountPageWithRedux, Provider, store);
    Navigation.registerComponentWithRedux(screenId.Transactional.Withdraw.WithdrawAmountPage, () => WithdrawAmountPageWithRedux, Provider, store);

    Navigation.registerComponent(screenId.Overlays.ActionModel, () => ActionModel);
    Navigation.registerComponent(screenId.Overlays.CommonAlert, () => CommonAlert);
    Navigation.registerComponent(screenId.Overlays.CountrySelector, () => CountrySelector);
    Navigation.registerComponent(screenId.Overlays.LanguageSelector, () => LanguageSelector);
    Navigation.registerComponent(screenId.Overlays.ProgressIndicator, () => ProgressIndicator);
    Navigation.registerComponent(screenId.Overlays.SimpleSelector, () => SimpleSelector);
    Navigation.registerComponent(screenId.Overlays.StateSelector, () => StateSelector);
    Navigation.registerComponent(screenId.Overlays.TransactionInstructions, () => TransactionInstructions);
    Navigation.registerComponent(screenId.Overlays.YearSelector, () => YearSelector);
  }

  _setGlobalProperties = async (): void => {
    // log screen dimensions
    console.log(`Screen Dimensions: ${parseFloat(Dimensions.get('window').width).toFixed(0)} x ${parseFloat(Dimensions.get('window').height).toFixed(0)}`);

    // hide status bar
    StatusBar.setHidden(true);

    // get device locale
    let deviceLocalLanguage = detectLanguage();

    console.log(`Device Locale: ${deviceLocalLanguage}`);

    // language options
    let strEN = 'en'; //English
    let strJA = 'ja'; //Japanese
    let strKO = 'ko'; //Korean
    let strRU = 'ru'; //Russian
    let strES = 'es'; //Spanish

    // identifying the device language
    let strDeviceLocalLanguageCode = strEN;
    if (deviceLocalLanguage.includes(strEN.toUpperCase())) {
      strDeviceLocalLanguageCode = strEN;
    } else if (deviceLocalLanguage.includes(strJA.toUpperCase())) {
      strDeviceLocalLanguageCode = strJA;
    } else if (deviceLocalLanguage.includes(strKO.toUpperCase())) {
      strDeviceLocalLanguageCode = strKO;
    } else if (deviceLocalLanguage.includes(strRU.toUpperCase())) {
      strDeviceLocalLanguageCode = strRU;
    } else if (deviceLocalLanguage.includes(strES.toUpperCase())) {
      strDeviceLocalLanguageCode = strES;
    }

    // get users last selected language code from local storage
    let lang_code = await AsyncStorageUtil.getItem(stringConstant.LANGUAGE_CODE);

    // if the value is found
    if (!lang_code) {
      lang_code = strDeviceLocalLanguageCode;
      await AsyncStorageUtil.storeStringItem(stringConstant.LANGUAGE_CODE, lang_code);
    }

    console.log(`Selected Language: ${lang_code}`);

    switchLanguage(lang_code);

    // let deviceIP = await DeviceInfo.getIpAddress();
    global['CLIENT_IP_ADDRESS'] = await publicIp.v4().catch(() => '0.0.0.0');

    NetInfo.addEventListener(async state => {
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        global['CLIENT_IP_ADDRESS'] = await publicIp.v4().catch(() => global['CLIENT_IP_ADDRESS']);
        // global['CLIENT_IP_ADDRESS'] = state.details.ipAddress;
      }
    });

    global['APP_VERSION'] = DeviceInfo.getVersion();
    global['CLIENT_DEVICE_SERIAL_NUMBER'] = DeviceInfo.getUniqueId();
    global['CLIENT_USER_AGENT'] = await DeviceInfo.getUserAgent();
    global['CULTURE_NAME'] = lang_code;
    global['DEVICE_TYPE'] = Platform.OS;

    store.subscribe(async () => {
      let state = store.getState();
      if (state.commonDataStore.progressIndicator === 1 && !state.commonDataStore.showingProgressIndicator) {
        return NavigationUtil.showProgressIndicator();
      }
    });
  };
}
