import React from 'react';
import { Image, NativeModules, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Share from 'react-native-share';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, ButtonWithIconAndArrow } from '../common/components';
import { pageStyle } from './userProfile.page.style';

const ImagePicker = NativeModules.ImageCropPicker;

const imagePickerConfig = {
  width: 1024,
  height: 1024,
  cropping: true,
  cropperCircleOverlay: true,
  compressImageMaxWidth: 1024,
  compressImageMaxHeight: 1024,
  compressVideoPreset: 'MediumQuality',
  mediaType: 'photo',
  includeBase64: true,
  includeExif: true,
  compressImageQuality: 0.7,
};

export default class UserProfilePage extends BasePage {
  constructor(props) {
    super(props, {
      user_profile_image: null,
    });
  }

  componentDidMount = async (): void => {
    this.props.setComponentID(this.props.componentId);
  };

  // componentWillUnmount = () => {
  //   super.componentWillUnmount();
  //   this.props.removeComponentID();
  // };

  componentDidAppear = async () => {
    super.componentDidAppear();
    await interfaces.getUserInfo()
      .then((result) => {
        this.props.storeUserData(result);
      })
      .catch(() => null);
    return this._getUserImage();
  };

  _getUserImage = async () => {
    return interfaces.getUserProfileImage()
      .then((result) => {
        if (!!result.Image && this._isMounted) {
          this.setState({
            user_profile_image: `data:image/png;base64,${result.Image}`,
          });
        }
      })
      .catch(() => null);
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onProfileImagePressed = async () => {
    let items = [
      {
        image: require('../../assets/camera-icon-21.png'),
        label: strings('userProfilePage.label_camera'),
        tintColor: commonTheme.COLOR_PRIMARY_DARK,
      },
      {
        image: require('../../assets/gallary.png'),
        label: strings('userProfilePage.label_gallery'),
        tintColor: commonTheme.COLOR_SECONDARY,
      },
    ];
    return NavigationUtil.showOverlay(screenId.Overlays.ActionModel, {
      items,
      onItemSelected: (selectedItem) => {
        if (selectedItem.label === strings('userProfilePage.label_camera')) {
          return this._ImagePickerFromCamera();
        } else if (selectedItem.label === strings('userProfilePage.label_gallery')) {
          return this._pickSingle();
        }
      },
    });
  };

  _onEditEmailPressed = async () => {
    this.props.setComponentID(this.props.componentId);
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.UserProfile.UpdateEmailPage);
  };

  _onEditMobilePressed = async () => {
    this.props.setComponentID(this.props.componentId);
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.UserProfile.UpdateMobilePage);
  };

  //image picker from gallery
  _pickSingle = () => {
    ImagePicker.openPicker(imagePickerConfig)
      .then(image => {
        return this._setProfilePicture(image.data);
      })
      .catch(() => {
      });
  };

  //image picker from camera
  _ImagePickerFromCamera() {
    ImagePicker.openCamera(imagePickerConfig)
      .then(image => {
        //converting image into base64
        return this._setProfilePicture(image.data);
      })
      .catch(() => {
      });
  }

  _setProfilePicture = async (userImage: string) => {
    return interfaces.addUserProfileImage(userImage)
      .then(() => {
        return this._getUserImage();
      })
      .catch(() => null);
  };

  _onReferAFriendPress = () => {
    return Share.open({
      subject: strings('common.label_app_name'),
      title: strings('common.label_app_name'),
      message: strings('common.label_share_content', {code: this.props.User.ReferralCode}),
      failOnCancel: false,
    }).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('userProfilePage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} extraScrollHeight={30} enableOnAndroid={true} showsVerticalScrollIndicator={false}
                                 contentContainerStyle={pageStyle.keyboardScrollViewContentContainer}>
          <View>
            <TouchableOpacity onPress={this._onProfileImagePressed} activeOpacity={0.8} style={pageStyle.profileImageMainContainer}>
              <View style={[pageStyle.profileImageContainer, {
                borderWidth: 5,
              }]}>
                {!this.state.user_profile_image ?
                  <Image style={pageStyle.profileUserImageStyle} source={require('../../assets/screen_image_profile.png')}/> :
                  <Image style={[pageStyle.profileUserImageStyle]} source={{uri: this.state.user_profile_image}}/>
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onProfileImagePressed} style={pageStyle.cameraImageMainContainer} activeOpacity={0.8}>
              <View style={pageStyle.cameraImageSubContainer}>
                <Image style={pageStyle.cameraImageStyle} source={require('../../assets/icon_camera.png')}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={pageStyle.buttonsContainer}>
            <ButtonWithIconAndArrow
              imageLink={require('../../assets/unlock_small.png')}
              titleDescription={strings('userProfilePage.label_button_kyc_status')}
              subTitle={this.props.UserSignupRegistrationInfo.AggregateKYCPassed === true ? strings('userProfilePage.label_complete') : strings('userProfilePage.label_incomplete')}
              buttonClickEvent={async () => NavigationUtil.onStartKYCProcess(this.props.componentId)}
            />
            <ButtonWithIconAndArrow
              disableButton={false}
              imageLink={require('../../assets/icon_user.png')}
              titleDescription={this.props.User && this.props.User.FirstName && this.props.User.LastName ? this.props.User.FirstName + ' ' + this.props.User.LastName : ''}
              displayArrow={this.props.User.Level === 'Standard'}
              subTitle={this.props.User.Level}
              subTitleAdditionalText={this.props.User.Level === 'Standard' ? ' ' + strings('common.label_upgrade_now') : ''}
              buttonClickEvent={() => {
                if (this.props.User.Level === 'Standard') {
                  // goto VIP program info screen
                  return NavigationUtil.gotoScreen(this.props.componentId, screenId.Common.UpgradeToVIPPage);
                } else {
                  return null;
                }
              }}
            />
            <ButtonWithIconAndArrow
              disableButton={false}
              imageLink={require('../../assets/icon_currency.png')}
              titleDescription={strings('userProfilePage.label_refer_friend')}
              subTitle={this.props.User.ReferralCode}
              buttonClickEvent={this._onReferAFriendPress}
            />
            <ButtonWithIconAndArrow
              imageLink={require('../../assets/icon_mail.png')}
              buttonClickEvent={this._onEditEmailPressed}
              titleDescription={this.props.User && this.props.User.Email}
            />
            <ButtonWithIconAndArrow
              imageLink={require('../../assets/icon_phone.png')}
              buttonClickEvent={this._onEditMobilePressed}
              titleDescription={this.props.User && this.props.User.Phone}
            />
            <ButtonWithIconAndArrow
              disableButton={false}
              imageLink={require('../../assets/icon_user_address.png')}
              titleDescription={this.props.User.Address1 === null && this.props.User.City === null && this.props.User.StateCode === null && this.props.User.CountryCode === null && this.props.User.PostalCode === null ? '' : this.props.User.Address1 + ',' + this.props.User.City + ', ' + this.props.User.StateCode + ', ' + this.props.User.CountryCode + '-' + this.props.User.PostalCode}
              displayArrow={false}
            />
            <ButtonWithIconAndArrow
              disableButton={false}
              imageLink={require('../../assets/icon_currency.png')}
              titleDescription={this.props.User && this.props.User.DefaultCurrencyCode}
              displayArrow={false}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
