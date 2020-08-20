import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { ScreenTitleImage, StandardButton, StandardLabel, StandardTextInput } from '../../common/components';
import { LightText } from '../../common/components/lightText/lightText.component';
import { pageStyle } from './addMobile.page.style';

export default class AddMobilePage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
    });

    this._onCountrySelected = this._onCountrySelected.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      selectedCountry: this.props.countries.Countries[0],
    });
  };

  _openCountrySelector = async () => {
    await NavigationUtil.showOverlay(screenId.Overlays.CountrySelector, {
      itemData: this.props.countries,
      onItemSelected: this._onCountrySelected,
    });
  };

  _onCountrySelected = async (data) => {
    this.setState({
      selectedCountry: data,
    });
  };

  // Next Button Click Event - Sent Mobile Verification API Call Based on Entered Mobile Number
  _verifyMobileNumber = async () => {
    if (!this.state.enableNextBtn) {
      return NavigationUtil.showAlert({messageText: strings('addMobilePage.alert_enter_mobile_number')});
    } else {
      let fullMobileNumber = this.state.selectedCountry.PhonePrefixes[0] + this.state.mobileNumber;
      return interfaces.sendMobileNumberVerificationCode(fullMobileNumber, this.state.selectedCountry.CountryCode)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.AddMobile.VerifyMobilePage, {
            FullMobileNumber: fullMobileNumber,
            SelectedCountry: this.state.selectedCountry,
          });
        })
        .catch(() => null);
    }
  };

  _checkIfFieldsAreNotEmpty = (value) => {
    this.setState({
      mobileNumber: value,
      enableNextBtn: value.length >= commonConstant.MIN_MOBILE_NUMBER,
    });
  };

  render() {
    const currentFlagImage = `${this.props.countries.CountryFlagBaseURL}${this.state.selectedCountry?.CountryCode}/flag.png`;
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage title={strings('addMobilePage.title')}
                          imageAsset={require('../../../assets/mobileCircle.png')}
                          descriptionText={strings('addMobilePage.description')} handleNotch={true}/>
        <View style={pageStyle.mainContainer}>
          <StandardLabel text={strings('addMobilePage.label_phone_number')}/>
          <View style={pageStyle.subContainer}>
            <TouchableOpacity style={pageStyle.flagButtonContainer} onPress={this._openCountrySelector}>
              <Image style={pageStyle.flagImageStyle} source={{uri: currentFlagImage}}/>
              <Image style={pageStyle.dropImageStyle} resizeMode={'contain'} source={require('../../../assets/dropBtnSolid.png')}/>
            </TouchableOpacity>
            <View style={pageStyle.phonePrefixContainer}>
              <LightText style={pageStyle.phonePrefixTextStyle}>
                {this.state.selectedCountry?.PhonePrefixes[0]}
              </LightText>
            </View>
            <StandardTextInput style={pageStyle.textInputStyle}
                               keyboardType='phone-pad'
                               returnKeyType='done'
                               placeholder={strings('addMobilePage.placeholder_phone_number')}
                               placeholderTextColor={commonTheme.COLOR_HINT}
                               onSubmitEditing={async () => {
                                 await this._verifyMobileNumber();
                               }}
                               onChangeText={(mobileNumber) => this._checkIfFieldsAreNotEmpty(mobileNumber)}
                               maxLength={commonConstant.MAX_MOBILE_NUMBER}
                               value={this.state.mobileNumber}/>
          </View>
        </View>
        <StandardButton
          onPress={this._verifyMobileNumber}
          color={commonTheme.COLOR_PRIMARY_DARK}
          disabled={!this.state.enableNextBtn}
          labelText={strings('addMobilePage.label_button_next')}
          isBottomButton={true}
        />
      </View>
    );
  }
}
