import React from 'react';
import { Image, NativeModules, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { UserInfoBO } from '../../../models/businessObjects';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, LabeledInfoBlockComponent, RegularText, StandardButton, StandardLabel } from '../../common/components';
import { pageStyle } from './uploadDocument.page.style';

const ImagePicker = NativeModules.ImageCropPicker;

const imagePickerConfig = {
  mediaType: 'photo',
  includeBase64: true,
  includeExif: true,
  compressImageQuality: 0.7,
};

// const governmentDocuments = [
//   {
//     key: 'Passport',
//     label: strings('uploadDocumentPage.label_passport'),
//   },
//   {
//     key: 'ID Card',
//     label: strings('uploadDocumentPage.label_id_card'),
//   },
//   {
//     key: 'Drivers License',
//     label: strings('uploadDocumentPage.label_driver_license'),
//   },
// ];

export default class UploadDocumentPage extends BasePage {
  constructor(props) {
    super(props, {
      governmentDocuments: [],
      governmentIDType: '',
      governmentIDNumber: null,
      governmentIDImage: null,
      utilityBillImage: null,
      utilityBillImageBinary: null,
      governmentIDImageBinary: null,
    });
  }

  componentDidMount = async (): void => {
    await interfaces.GetProofOfIdentityTypes()
      .then((result) => {
        this.setState({
          governmentIDType: result.DefaultSelectedItem,
          governmentDocuments: result.ProofOfIdentityTypes,
        });
      })
      .catch(() => null);
  };

  _selectImage = (imageType) => {
    let items = [
      {
        image: require('../../../assets/camera-icon-21.png'),
        label: strings('uploadDocumentPage.label_camera'),
        tintColor: commonTheme.COLOR_PRIMARY_DARK,
      },
      {
        image: require('../../../assets/gallary.png'),
        label: strings('uploadDocumentPage.label_gallery'),
        tintColor: commonTheme.COLOR_SECONDARY,
      },
    ];
    return NavigationUtil.showOverlay(screenId.Overlays.ActionModel, {
      items,
      onItemSelected: (selectedItem) => {
        if (selectedItem.label === strings('uploadDocumentPage.label_camera')) {
          ImagePicker.openCamera(imagePickerConfig)
            .then(image => {
              this._setImageValues(imageType, image);
            })
            .catch(e => console.log(e));
        } else if (selectedItem.label === strings('uploadDocumentPage.label_gallery')) {
          ImagePicker.openPicker(imagePickerConfig)
            .then(image => {
              this._setImageValues(imageType, image);
            })
            .catch(e => console.log(e));
        }
      },
    });
  };

  _setImageValues = (imageType, image) => {
    if (imageType === 'GovernmentID') {
      this.setState({
        governmentIDImage: {uri: `data:${image.mime};base64,` + image.data},
        governmentIDImageBinary: image.data,
      }, () => {
        this._checkNextButtonStatus();
      });
    } else {
      this.setState({
        utilityBillImage: {uri: `data:${image.mime};base64,` + image.data},
        utilityBillImageBinary: image.data,
      }, () => {
        this._checkNextButtonStatus();
      });
    }

  };

  _checkNextButtonStatus = () => {
    this.setState({
      enableNextBtn: !!this.state.governmentIDImage && !!this.state.utilityBillImage && !!this.state.governmentIDNumber,
    });
  };

  _onNextButtonClick = async () => {
    const governmentIDNumber = this.state.governmentIDNumber.trim();
    const governmentIDType = this.state.governmentIDType;
    const passportImage = this.state.governmentIDImageBinary;
    const utilityBillImage = this.state.utilityBillImageBinary;

    if (this.props.UserCountry.EVerifySupported) {
      const consents = this.props.navigationProps.registerUserFieldRequirements?.Consents;
      const dataFields = Object.keys(this.props.navigationProps.createUserFieldRequirementsData)
        .map(fieldName => ({Name: fieldName, Value: this.props.navigationProps.createUserFieldRequirementsData[fieldName].trim()}));
      const nationalIDs = !!this.props.navigationProps.nationalIDsData ?
        Object.keys(this.props.navigationProps.nationalIDsData)
          .map(fieldName => ({Name: fieldName, Value: this.props.navigationProps.nationalIDsData[fieldName].trim()})) : [];

      return interfaces.registerUser(this.props.User.UserID, consents, dataFields, nationalIDs, governmentIDNumber, governmentIDType, passportImage, utilityBillImage)
        .then((result) => {
          return this._navigation(result);
        })
        .catch(() => null);

    } else {
      return interfaces.registerUserByDocument(governmentIDNumber, governmentIDType, passportImage, utilityBillImage)
        .then((result) => {
          return this._navigation(result);
        })
        .catch(() => null);
    }
  };

  _navigation = (userData: UserInfoBO) => {
    this.props.storeUserData(userData);
    // return NavigationUtil.resetTo(stackName.InvestmentNowStack, screenId.OnBoarding.KYC.RegistrationStatusPage);
    return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.RegistrationStatusPage);
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _showDocumentTypeSelector = async () => {
    return NavigationUtil.showOverlay(screenId.Overlays.SimpleSelector, {
      items: this.state.governmentDocuments.map(item => ({
        label: item,
        key: item,
        selected: item === this.state.governmentIDType,
      })),
      onItemSelected: (selectedItem) => {
        this.setState({
          governmentIDType: selectedItem.label,
        });
      },
    });
  };

  _renderUploadFunctionality = (title: string, displayStatus: string, uploadImage: any, iconImage: any, imageType: string, labelText: string, description: string) => {
    return (
      <>
        <View style={pageStyle.marginBottomStyle}>
          <StandardLabel color={commonTheme.COLOR_BRIGHT} text={title}/>
        </View>
        <View style={[pageStyle.uploadImageContainerStyle, pageStyle.marginBottomStyle, {display: displayStatus}]}>
          <Image resizeMode={'contain'} style={[pageStyle.uploadImageStyle, {display: displayStatus}]}
                 source={uploadImage}/>
        </View>
        <StandardButton icon={iconImage} color={commonTheme.COLOR_BRIGHT}
                        labelColor={commonTheme.COLOR_DEFAULT_LIGHT}
                        onPress={() => this._selectImage(imageType)}
                        labelText={labelText}/>
        <RegularText style={pageStyle.uploadDocumentDescriptionTextStyle}>
          {description}
        </RegularText>
      </>
    );
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <BackNavTitle
          title={strings('uploadDocumentPage.title')}
          onPressEvent={this._backButton}
          onPressCloseEvent={this._navCloseButtonClick}
          titleColor={commonTheme.SECONDARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={pageStyle.paddingHorizontalStyle}>
          <TouchableOpacity activeOpacity={.8} onPress={this._showDocumentTypeSelector} style={{marginBottom: 24}}>
            <LabeledInfoBlockComponent title={strings('uploadDocumentPage.label_choose_your_government_id')}
                                       borderColor={commonTheme.COLOR_DEFAULT_LIGHT}
                                       titleColor={commonTheme.COLOR_BRIGHT}
                                       showAsDropdown value={this.state.governmentIDType}/>
          </TouchableOpacity>
          <IconBasedTextInput
            titleColor={commonTheme.COLOR_BRIGHT}
            borderColor={commonTheme.COLOR_DEFAULT_LIGHT}
            iconColor={commonTheme.COLOR_DARK}
            title={strings('uploadDocumentPage.label_enter_government_id_number')}
            icon={require('../../../assets/kyc_gov_id_icon.png')}
            returnKeyType={'default'}
            onChangeText={(text) => {
              this.setState({governmentIDNumber: text}, () => {
                this._checkNextButtonStatus();
              });
            }}
            onSubmitEditing={() => {
              if (!this.state.enableNextBtn) {
                return NavigationUtil.showAlert({messageText: strings('uploadDocumentPage.alert_fill_data')});
              } else {
                return this._onNextButtonClick();
              }
            }}
          />
          {this._renderUploadFunctionality(
            strings('uploadDocumentPage.label_government_issued_id'),
            this.state.governmentIDImage ? 'flex' : 'none',
            this.state.governmentIDImage,
            require('../../../assets/kyc_gov_id_icon.png'),
            'GovernmentID',
            strings('uploadDocumentPage.label_add_photo_id'),
            strings('uploadDocumentPage.description_add_photo_id'),
          )}
          {this._renderUploadFunctionality(
            strings('uploadDocumentPage.label_upload_utility_bill'),
            this.state.utilityBillImage ? 'flex' : 'none',
            this.state.utilityBillImage,
            require('../../../assets/address_proof_id_icon.png'),
            'UtilityBill',
            strings('uploadDocumentPage.label_button_upload_utility_bill'),
            strings('uploadDocumentPage.description_upload_utility_bill'),
          )}
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClick}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('uploadDocumentPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
