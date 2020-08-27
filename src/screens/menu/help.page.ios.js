import React from 'react';
import { Image, Linking, Platform, TouchableOpacity, View } from 'react-native';
import { Freshchat, FreshchatConfig, FreshchatUser } from 'react-native-freshchat-sdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../config/i18/i18n';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import AsyncStorageUtil from '../../utils/asyncstorage.util';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, MediumText, RegularText } from '../common/components';
import { pageStyle } from './help.page.style';


const BuildConfig = require('react-native-build-config');

export default class HelpPage extends BasePage {

  constructor(props) {
    super(props);
  }

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  //Support Mail button click event
  _supportMailClick = async () => {
    return Linking.openURL('mailto:support@b21.io?subject=Support App').catch(() => null);
  };

  componentDidMount = (): void => {
    //todo - Anant: we may have to disable this for android as it is not working in android
    (Platform.OS === 'ios') && this.initFreshChat();
  };

  componentWillUnmount() {
    super.componentWillUnmount();
    (Platform.OS === 'ios') && Freshchat.removeEventListeners(Freshchat.EVENT_USER_RESTORE_ID_GENERATED);
  }

  initFreshChat = () => {
    const APP_ID = `${BuildConfig.default['FRESH_CHAT_APP_ID']}`;
    const APP_KEY = `${BuildConfig.default['FRESH_CHAT_APP_KEY']}`;
    const freshChatConfig = new FreshchatConfig(APP_ID, APP_KEY);
    // freshChatConfig.domain = `${BuildConfig.default['FRESH_CHAT_DOMAIN']}`;
    freshChatConfig.teamMemberInfoVisible = false;
    freshChatConfig.cameraCaptureEnabled = false;
    freshChatConfig.gallerySelectionEnabled = false;
    freshChatConfig.responseExpectationEnabled = false;
    freshChatConfig.showNotificationBanner = false; //iOS only
    freshChatConfig.notificationSoundEnabled = false; //iOS only
    // freshChatConfig.themeName = "CustomTheme.plist"; //iOS only
    freshChatConfig.stringsBundle = Platform.OS === 'ios' ? `${BuildConfig.default['CFBundleIdentifier']}` : `${BuildConfig.default['APPLICATION_ID']}`; //iOS only
    Freshchat.init(freshChatConfig);
  };

  _showConversation = async () => {
    let userPhone = this.props.User.Phone;
    // userPhone = userPhone.replace(this.props.PhonePrefixes, '');

    let userKey = this.props.User.Email;
    const userRestoreID = await AsyncStorageUtil.getItem(userKey);

    if (!!userRestoreID) {
      // Stored Restore id passed
      Freshchat.identifyUser(this.props.User.UserID, userRestoreID, (error) => {
        console.log(error);
        return NavigationUtil.showAlert({messageText: strings('common.alert_something_wrong')});
      });
      Freshchat.showConversations();

    } else {//New User
      const freshChatUser = new FreshchatUser();
      freshChatUser.firstName = this.props.User.FirstName;
      freshChatUser.lastName = this.props.User.LastName;
      freshChatUser.email = this.props.User.Email;
      // freshChatUser.phoneCountryCode = this.props.PhonePrefixes;
      freshChatUser.phone = userPhone;
      Freshchat.setUser(freshChatUser, (error) => {
        console.log(error);
        return NavigationUtil.showAlert({messageText: strings('common.alert_something_wrong')});
      });
      Freshchat.identifyUser(this.props.User.UserID, null, (error) => {
        console.log(error);
        return NavigationUtil.showAlert({messageText: strings('common.alert_something_wrong')});
      });
      // This is used to store restore ID and based on restore id get previous chat
      Freshchat.addEventListener(
        Freshchat.EVENT_USER_RESTORE_ID_GENERATED,
        () => {
          Freshchat.getUser(async (user) => {
            const restoreId = user.restoreId;
            const externalId = user.externalId;
            // Store Restore ID using email and phone number key
            await AsyncStorageUtil.storeStringItem(userKey, restoreId);
            Freshchat.identifyUser(externalId, restoreId, (error) => {
              console.log(error);
              return NavigationUtil.showAlert({messageText: strings('common.alert_something_wrong')});
            });
          });
        },
      );
      Freshchat.showConversations();
    }
  };

  _buttonRender = (title: string, subTitle: string, iconImage: any, clickEvent: any) => {
    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={clickEvent}
        style={pageStyle.supportMailButtonContainer}
      >
        <View style={pageStyle.selectFillContainer}/>
        <View style={pageStyle.supportMailButtonSubContainer}>
          <Image style={pageStyle.emailImageStyle} resizeMode={'contain'} source={iconImage}/>
          <View>
            <MediumText style={pageStyle.supportMailTextStyle}>
              {title}
            </MediumText>
            <RegularText style={[pageStyle.supportMailTextStyle, pageStyle.supportEmailAddressTextStyle]}>
              {subTitle}
            </RegularText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('helpPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView
          bounces={false}
          extraScrollHeight={0}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={pageStyle.keyboardScrollViewContentStyle}
        >
          {this._buttonRender(strings('helpPage.label_support_mail'), strings('helpPage.label_support_b21'), require('../../assets/email.png'), this._supportMailClick)}

          {/* Comment:- Chat button section */}
          {Platform.OS === 'ios' ? this._buttonRender(strings('helpPage.label_chat'), strings('helpPage.label_chat_with_support'), require('../../assets/email.png'), this._showConversation) : null}

        </KeyboardAwareScrollView>
      </View>
    );
  }
}
