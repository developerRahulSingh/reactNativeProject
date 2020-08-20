import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, LightText, StandardButton, StandardLabel } from '../../common/components';
import { pageStyle } from './collectAddress.page.style';

export default class CollectAddressPage extends BasePage {
  requiredFieldsData: any;

  constructor(props) {
    super(props, {
      statesList: '',
      requiredFields: '',
      selectedStateProvinceName: '',
      StateProvinceCode: '',
      enableNextBtn: false,
    });
    this.inputs = {};
    this._openStateSelector = this._openStateSelector.bind(this);
    this._onStateSelected = this._onStateSelected.bind(this);
  }

  componentDidMount = async () => {
    this.setState({
      CountryCode: this.props.navigationProps.selectedCountry.CountryCode,
    });
    await this._getSelectedCountryStateList();
    await this._getRegisterUserRequirementFields();
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _getSelectedCountryStateList = async () => {
    return interfaces.getCountryStates(this.props.navigationProps.selectedCountry?.CountryCode)
      .then((result) => {
        this.setState({
          statesList: result.States,
          selectedStateProvinceName: result.States[0].StateName,
          StateProvinceCode: result.States[0].StateCode,
        });
      })
      .catch(() => null);
  };

  _getRegisterUserRequirementFields = async () => {
    return interfaces.getRegisterUserFieldRequirements(this.props.navigationProps.selectedCountry?.CountryCode)
      .then((result) => {
        this.requiredFieldsData = result;
        this.setState({
          requiredFields: this.requiredFieldsData.CreateUserFieldRequirements.filter(field => field.Category === 'Location' && field.Name !== 'CountryCode'),
        });
      })
      .catch(() => null);
  };

  _mapIconFromTextFields = (fieldName) => {
    switch (fieldName) {
      case 'LocationAdditionalFieldsAddress1':
        return require('../../../assets/kyc_location_icon.png');
      case 'Suburb':
        return require('../../../assets/kyc_suburb_icon.png');
      case 'City':
        return require('../../../assets/kyc_city_icon.png');
      case 'StateProvinceCode':
        return require('../../../assets/kyc_state_icon.png');
      case 'PostalCode':
        return require('../../../assets/kyc_postal_code_icon.png');
      case 'CountryCode':
        return require('../../../assets/kyc_street_name_icon.png');
      case 'BuildingNumber':
        return require('../../../assets/kyc_building_icon.png');
      case 'StreetName':
        return require('../../../assets/kyc_street_name_icon.png');
      case 'StreetType':
        return require('../../../assets/kyc_street_type_icon.png');
      case 'UnitNumber':
        return require('../../../assets/kyc_unit_no_icon.png');
      default:
        return require('../../../assets/kyc_street_name_icon.png');
    }
  };

  _changeNextBtnState = () => {
    let resultData = this.state.requiredFields.some(field => (!this.state.hasOwnProperty(field.Name) || !this.state[field.Name]) && field.Name !== 'StateProvinceCode');
    this.setState({
      enableNextBtn: !resultData,
    });
  };

  _updatingValues = (type, value) => {
    let newState = {};
    newState[type] = value;
    this.setState(newState, () => {
      this._changeNextBtnState();
    });
  };

  _openStateSelector = async () => {
    if (this.state.statesList.length > 0) {
      const sortedStateList = this.state.statesList.sort((firstItem, secondItem) => firstItem.StateName.localeCompare(secondItem.StateName));

      await NavigationUtil.showOverlay(screenId.Overlays.StateSelector, {
        items: sortedStateList,
        onItemSelected: this._onStateSelected,
      });
    } else {
      return NavigationUtil.showAlert({messageText: strings('collectAddressPage.alert_retry_states_list_loading')});
    }
  };

  _onStateSelected = async (data) => {
    this.setState({
      selectedStateProvinceName: data.StateName,
      StateProvinceCode: data.StateCode,
    });
  };

  _onNextButtonClicked = async () => {
    if (this.state.requiredFields.some(field => !this.state.hasOwnProperty(field.Name) || !this.state[field.Name].trim())) {
      return NavigationUtil.showAlert({messageText: strings('collectAddressPage.error_fields_detail')});
    }

    let Address1;
    if (!!this.state.LocationAdditionalFieldsAddress1) {
      Address1 = this.state.LocationAdditionalFieldsAddress1;
    } else {
      Address1 = `${this.state.BuildingNumber};${this.state.StreetName};${this.state.StreetType};${this.state.UnitNumber}`;
    }

    let Address = Address1 === undefined ? '' : Address1.trim();
    let City = this.state.City === undefined ? '' : this.state.City.trim();
    let Suburb = this.state.Suburb === undefined ? '' : this.state.Suburb.trim();
    let CountryCode = this.state.CountryCode === undefined ? '' : this.state.CountryCode.trim();
    let StateProvinceCode = this.state.StateProvinceCode === undefined ? '' : this.state.StateProvinceCode.trim();
    let PostalCode = this.state.PostalCode === undefined ? '' : this.state.PostalCode.trim();

    if (!!this.props.User.Address1) {
      return interfaces.updateAddress(Address, City, Suburb, CountryCode, StateProvinceCode, PostalCode)
        .then(() => {
          return interfaces.getUserInfo();
        })
        .then((resultUserInfo) => {
          this.props.storeUserData(resultUserInfo);
          return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.DeclareSourceOfFundsPage);
        })
        .catch(() => null);
    } else {
      return interfaces.addAddress(Address, City, Suburb, CountryCode, StateProvinceCode, PostalCode)
        .then(() => {
          return interfaces.getUserInfo();
        })
        .then((resultUserInfo) => {
          this.props.storeUserData(resultUserInfo);
          return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.DeclareSourceOfFundsPage);
        })
        .catch(() => null);
    }
  };

  _focusNextInputField = async (nextField) => {
    let indexState = this.state.requiredFields.findIndex(field => field.Name === 'StateProvinceCode');
    if (this.state.requiredFields.length > indexState && nextField === indexState) {
      nextField = nextField + 1;
    }
    if (nextField === this.state.requiredFields.length) {
      return this._onNextButtonClicked();
    } else {
      this.inputs[nextField].focus();
    }
  };

  _dynamicFieldsRenderForState = () => {
    if (this.state.requiredFields.length > 0) {
      return this.state.requiredFields.filter(field => field.Name === 'StateProvinceCode').map((field, index) => {
        return (<View key={index} style={pageStyle.dynamicFieldsContainerStyle}>
          <StandardLabel color={commonTheme.COLOR_DARK} text={field.DisplayName}/>
          <TouchableOpacity activeOpacity={.8} onPress={this._openStateSelector} style={[pageStyle.dynamicFieldsButtonStyle]}>
            <Image resizeMode='contain' style={pageStyle.dynamicFieldsImageStyle} source={this._mapIconFromTextFields(field.Name)}/>
            <LightText style={pageStyle.dynamicFieldTextStyle}>{this.state.selectedStateProvinceName}</LightText>
          </TouchableOpacity>
        </View>);
      });
    }
  };

  _dynamicFieldsRender = () => {
    if (this.state.requiredFields.length > 0) {
      return this.state.requiredFields.map((field, index) => {
        let indexState = this.state.requiredFields.findIndex(field => field.Name === 'StateProvinceCode');
        if (field.Name !== 'StateProvinceCode') {
          return (<View key={index}>
            <IconBasedTextInput
              onRef={(ref) => {
                this.inputs[index] = ref;
              }}
              onSubmitEditing={() => this._focusNextInputField(index + 1)}
              titleColor={commonTheme.COLOR_DARK}
              borderColor={commonTheme.COLOR_DARK}
              iconColor={commonTheme.COLOR_DARK}
              title={field.DisplayName}
              icon={this._mapIconFromTextFields(field.Name)}
              maxLength={Number(field.MaxLen)}
              returnKeyType={index === this.state.requiredFields.length - 1 || (indexState === this.state.requiredFields.length - 1 && index === indexState - 1) ? 'done' : 'next'}
              onChangeText={(fieldValue) => this._updatingValues(field.Name, fieldValue)}
            />
          </View>);
        }
      });
    }
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <BackNavTitle
          title={strings('collectAddressPage.title')}
          onPressEvent={this._backButton}
          onPressCloseEvent={this._navCloseButtonClick}
          titleColor={commonTheme.COLOR_DARK}/>
        <KeyboardAwareScrollView
          contentContainerStyle={pageStyle.keyBoardScrollViewContentContainerStyle}
          enableOnAndroid={true} style={commonStyle.container}
          bounces={false} showsVerticalScrollIndicator={false}>
          {this._dynamicFieldsRenderForState()}
          {this._dynamicFieldsRender()}
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClicked}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('collectAddressPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
