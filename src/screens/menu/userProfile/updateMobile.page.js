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
import { BackNavTitle, LightText, StandardButton, StandardLabel, StandardTextInput } from '../../common/components';
import { pageStyle } from './updateMobile.page.style';

export default class UpdateMobilePage extends BasePage {
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

  _verifyMobileNumber = async () => {
    if (!this.state.enableNextBtn) {
      return NavigationUtil.showAlert({messageText: strings('updateMobilePage.alert_enter_mobile_number')});
    } else {
      let fullMobileNumber = this.state.selectedCountry.PhonePrefixes[0] + this.state.mobileNumber;
      return interfaces.sendMobileNumberVerificationCode(fullMobileNumber, this.state.selectedCountry.CountryCode)
        .then(() => {
          return NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.UserProfile.VerifyUpdateMobilePage, {
            fullMobileNumber: fullMobileNumber,
            selectedCountryCode: this.state.selectedCountry.CountryCode,
          });
        })
        .catch(() => null);
    }
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    const currentFlagImage = `${this.props.countries.CountryFlagBaseURL}${this.state.selectedCountry?.CountryCode}/flag.png`;
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('updateMobilePage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={pageStyle.contentContainer}>
          <StandardLabel text={strings('updateMobilePage.label_new_phone')}/>
          <View style={pageStyle.countryCodeWithMobileContainer}>
            <TouchableOpacity style={pageStyle.flagButtonContainer} onPress={this._openCountrySelector}>
              <Image style={pageStyle.imageFlagStyle} source={{uri: currentFlagImage}}/>
              <Image style={pageStyle.imageDropSolidStyle} resizeMode={'contain'} source={require('../../../assets/dropBtnSolid.png')}/>
            </TouchableOpacity>
            <View style={pageStyle.mobileNumberContainer}>
              <LightText style={pageStyle.mobileNumberPrefixTextStyle}>
                {this.state.selectedCountry?.PhonePrefixes[0]}
              </LightText>
              <StandardTextInput
                keyboardType='phone-pad'
                returnKeyType='done'
                placeholder={strings('updateMobilePage.placeholder_phone_number')}
                placeholderTextColor={commonTheme.COLOR_HINT}
                onChangeText={(mobileNumber) => {
                  this.setState({
                    mobileNumber,
                    enableNextBtn: mobileNumber.length >= commonConstant.MIN_MOBILE_NUMBER,
                  });
                }}
                maxLength={commonConstant.MAX_MOBILE_NUMBER}
                onSubmitEditing={this._verifyMobileNumber}
                value={this.state.mobileNumber}/>
            </View>
          </View>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._verifyMobileNumber}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('updateMobilePage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
