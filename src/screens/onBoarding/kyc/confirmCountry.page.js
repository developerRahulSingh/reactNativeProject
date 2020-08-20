import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { LightText, ScreenTitleImage, StandardButton, StandardLabel } from '../../common/components';
import { pageStyle } from './confirmCountry.page.style';

export default class ConfirmCountryPage extends BasePage {
  constructor(props) {
    super(props, {
      selectedCountry: {},
    }, true);

    this._onCountrySelected = this._onCountrySelected.bind(this);
    this._onNextBtnClick = this._onNextBtnClick.bind(this);
  }

  componentDidMount = async () => {
    this.setState({selectedCountry: this.props.Countries[0]});
  };

  _backButtonHandler = async () => {
    return this._navCloseButtonClick();
  };

  _onNextBtnClick = async () => {
    await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.CollectAddressPage, {
      selectedCountry: this.state.selectedCountry,
    });
  };

  _openCountrySelector = async () => {
    await NavigationUtil.showOverlay(screenId.Overlays.CountrySelector, {
      itemData: {CountryFlagBaseURL: this.props.CountryFlagBaseURL, Countries: this.props.Countries},
      onItemSelected: this._onCountrySelected,
    });
  };

  _onCountrySelected = async (data) => {
    this.setState({
      selectedCountry: data,
    });
  };

  render() {
    const currentFlagImage = `${this.props.CountryFlagBaseURL}${this.state.selectedCountry.CountryCode}/flag.png`;
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <ScreenTitleImage title={strings('confirmCountryPage.title')} handleNotch={true} titleColor={commonTheme.COLOR_DARK + '7F'}
                          closeButtonEvent={this._navCloseButtonClick}
                          imageAsset={require('../../../assets/kyc_globe_icon.png')} imageAssetBackground={commonTheme.COLOR_TRANSPARENT}/>
        {!!this.state.selectedCountry ?
          <View style={pageStyle.contentContainerStyle}>
            <StandardLabel color={commonTheme.COLOR_BRIGHT} text={strings('confirmCountryPage.label_country')}/>
            <TouchableOpacity
              style={pageStyle.selectedCountryButtonContainerStyle}
              onPress={this._openCountrySelector}>
              <View style={pageStyle.selectedCountryFlagContainerStyle}>
                <Image style={pageStyle.countryFlagImageStyle} source={{uri: currentFlagImage}}/>
                <Image style={pageStyle.dropDownImageStyle} resizeMode={'contain'} source={require('../../../assets/dropBtnSolid.png')}/>
              </View>
              <LightText style={pageStyle.selectedCountryNameTextStyle}>
                {this.state.selectedCountry.CountryName}
              </LightText>
            </TouchableOpacity>
          </View>
          : null
        }
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextBtnClick}
            color={commonTheme.COLOR_DARK}
            labelText={strings('confirmCountryPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
