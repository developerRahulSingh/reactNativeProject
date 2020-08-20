import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, LabeledInfoBlockComponent, RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './collectDoB.page.style';

const moment = require('moment');

export default class CollectDoBPage extends BasePage {
  constructor(props) {
    super(props, {
      selectedGoalDateLongFormat: strings('collectDoBPage.placeholder_select_dob'),
      dateValue: new Date(),
      createUserFieldRequirementsData: {},
      enableNextBtn: false,
      isDateTimePickerVisible: false,
    });
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _updateRegisterUserRequest = async () => {
    let addressParts = this.props.User.Address1.split(';');
    let createUserFieldRequirementsData: any = {...this.props.navigationProps.createUserFieldRequirementsData, ...this.state.createUserFieldRequirementsData};

    this.props.navigationProps.registerUserFieldRequirements?.CreateUserFieldRequirements.forEach((field) => {
      if (field.Name === 'BuildingNumber') {
        createUserFieldRequirementsData[field.Name] = addressParts[0] === undefined ? '' : addressParts[0].trim();
      }
      if (field.Name === 'City') {
        createUserFieldRequirementsData[field.Name] = this.props.User.City === undefined ? '' : this.props.User.City.trim();
      }
      if (field.Name === 'CountryCode') {
        createUserFieldRequirementsData[field.Name] = this.props.User.CountryCode === undefined ? '' : this.props.User.CountryCode.trim();
      }
      if (field.Name === 'LocationAdditionalFieldsAddress1') {
        createUserFieldRequirementsData[field.Name] = this.props.User.Address1 === undefined ? '' : this.props.User.Address1.trim();
      }
      if (field.Name === 'PostalCode') {
        createUserFieldRequirementsData[field.Name] = this.props.User.PostalCode === undefined ? '' : this.props.User.PostalCode.trim();
      }
      if (field.Name === 'StateProvinceCode') {
        createUserFieldRequirementsData[field.Name] = this.props.User.StateCode === undefined ? '' : this.props.User.StateCode.trim();
      }
      if (field.Name === 'StreetName') {
        createUserFieldRequirementsData[field.Name] = addressParts[1] === undefined ? '' : addressParts[1].trim();
      }
      if (field.Name === 'StreetType') {
        createUserFieldRequirementsData[field.Name] = addressParts[2] === undefined ? '' : addressParts[2].trim();
      }
      if (field.Name === 'Suburb') {
        createUserFieldRequirementsData[field.Name] = this.props.User.Suburb === undefined ? '' : this.props.User.Suburb.trim();
      }
      if (field.Name === 'UnitNumber') {
        createUserFieldRequirementsData[field.Name] = addressParts[3] === undefined ? '' : addressParts[3].trim();
      }
      if (field.Name === 'MobileNumber') {
        createUserFieldRequirementsData[field.Name] = this.props.User.Phone === undefined ? '' : this.props.User.Phone.trim();
      }
    });
    let dataFields = Object.keys(createUserFieldRequirementsData);
    let hasUnfilledDataFields = this.props.navigationProps.registerUserFieldRequirements?.CreateUserFieldRequirements
      .some(field => !dataFields.includes(field.Name));
    return this._navigationToNextScreen(createUserFieldRequirementsData, hasUnfilledDataFields);
  };

  _navigationToNextScreen = async (createUserFieldRequirementsData, hasUnfilledDataFields) => {
    let navigationProps = {
      registerUserFieldRequirements: this.props.navigationProps.registerUserFieldRequirements,
      createUserFieldRequirementsData: createUserFieldRequirementsData,
    };
    // if (hasUnfilledDataFields) {
    //   return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.CollectAdditionalInformationPage, navigationProps);
    // } else if ((this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.length) || this.props.navigationProps.registerUserFieldRequirements?.Consents.length) {
    //   return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.CollectUniqueIDPage, navigationProps);
    // } else {
    //   return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.UploadDocumentPage, navigationProps);
    // }

    if (hasUnfilledDataFields) {
      return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.CollectAdditionalInformationPage, navigationProps);
    } else if ((this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.length) || this.props.navigationProps.registerUserFieldRequirements?.Consents.length) {
      return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.CollectUniqueIDPage, navigationProps);
    } else {
      return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.UploadDocumentPage, navigationProps);
    }
  };

  _updatePersonInformation = async () => {
    // FirstName
    const firstName = this.props.navigationProps.createUserFieldRequirementsData['FirstGivenName'] === undefined ? '' : this.props.navigationProps.createUserFieldRequirementsData['FirstGivenName'].trim();
    // LastName
    const lastName = this.props.navigationProps.createUserFieldRequirementsData['FirstSurName'] === undefined ? '' : this.props.navigationProps.createUserFieldRequirementsData['FirstSurName'].trim();
    // MiddleName
    const middleName = this.props.navigationProps.createUserFieldRequirementsData['MiddleName'] === undefined ? '' : this.props.navigationProps.createUserFieldRequirementsData['MiddleName'].trim();
    // SecondLastName
    const secondLastName = this.props.navigationProps.createUserFieldRequirementsData['SecondSurname'] === undefined ? '' : this.props.navigationProps.createUserFieldRequirementsData['SecondSurname'].trim();
    // FullName
    const fullName = this.props.navigationProps.createUserFieldRequirementsData['PersonInfoAdditionalFieldsFullName'] === undefined ? '' : this.props.navigationProps.createUserFieldRequirementsData['PersonInfoAdditionalFieldsFullName'].trim();
    // Date of Birth
    const dayOfBirth = this.state.createUserFieldRequirementsData.DayOfBirth;
    const monthOfBirth = this.state.createUserFieldRequirementsData.MonthOfBirth;
    const yearOfBirth = this.state.createUserFieldRequirementsData.YearOfBirth;

    return interfaces.updatePerson(firstName, lastName, middleName, secondLastName, fullName, dayOfBirth, monthOfBirth, yearOfBirth)
      .then((result) => {
        this.props.storeUserData(result);
        return this._updateRegisterUserRequest();
      })
      .catch(() => null);
  };

  _onNextBtnCLick = async () => {
    let selectedDateValue = moment(this.state.dateValue);
    let _18YearsBefore = moment(new Date()).subtract(18, 'year');
    let _110YearsBefore = moment(new Date()).subtract(110, 'year');
    let currentDate = moment(new Date());
    if (selectedDateValue.diff(_18YearsBefore, 'days') >= 0 && selectedDateValue.diff(currentDate) < 0) {
      this.setState({
        errorMessages: strings('collectDoBPage.error_olderThan18'),
      });
    } else if (selectedDateValue.diff(_110YearsBefore, 'year') < 0) {
      this.setState({
        errorMessages: strings('collectDoBPage.error_youngerThan110'),
      });
    } else if (selectedDateValue.diff(currentDate) >= 0) {
      this.setState({
        errorMessages: strings('collectDoBPage.error_cannotSelectFutureDate'),
      });
    } else {
      return this._updatePersonInformation();
    }
  };

  _onChange = (event, selectedDate) => {
    this._valueFromPicker(selectedDate);
  };

  _onChangeAndroid = (event, selectedDate) => {
    this._hideDateTimePicker();
    this._valueFromPicker(selectedDate);
  };

  _valueFromPicker = (selectedDate) => {
    const currentDate = selectedDate;
    const createUserFieldRequirementsData = {
      DayOfBirth: moment(currentDate).format('DD'),
      MonthOfBirth: moment(currentDate).format('MM'),
      YearOfBirth: moment(currentDate).format('YYYY'),
    };
    this.setState({
      dateValue: currentDate,
      selectedGoalDateLongFormat: moment(currentDate).format('MMMM DD, YYYY'),
      createUserFieldRequirementsData,
      enableNextBtn: true,
    });
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <BackNavTitle
          title={strings('collectDoBPage.title')}
          onPressEvent={this._backButton}
          onPressCloseEvent={this._navCloseButtonClick}
          titleColor={commonTheme.SECONDARY_TEXT_COLOR_LIGHT}/>
        <ScreenTitleImage imageAssetBackground={commonTheme.COLOR_TRANSPARENT} imageAsset={require('../../../assets/dobKYC.png')}/>
        <View style={pageStyle.selectDOBContainerStyle}>
          <TouchableOpacity activeOpacity={.8} onPress={this._showDateTimePicker}>
            <LabeledInfoBlockComponent icon={require('../../../assets/dob_icon.png')}
                                       value={this.state.selectedGoalDateLongFormat}/>
          </TouchableOpacity>
          <RegularText style={pageStyle.errorTextColor}>
            {this.state.errorMessages}
          </RegularText>
        </View>
        <>
          {Platform.OS === 'ios' && this.state.isDateTimePickerVisible &&
          <Modal transparent animationType="none" visible={this.state.isDateTimePickerVisible}>
            {this.state.isDateTimePickerVisible && (
              <View style={pageStyle.dateTimePickerContainerStyle}>
                <View style={[pageStyle.dateTimePickerBGColor, pageStyle.dateTimePickerDoneButtonContainerStyle]}>
                  <TouchableOpacity onPress={this._hideDateTimePicker}>
                    <RegularText>{strings('collectDoBPage.label_button_done')}</RegularText>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={this.state.dateValue}
                  textColor={commonTheme.COLOR_DARK}
                  mode={'date'}
                  // maximumDate={new Date()}
                  onChange={this._onChange}
                  style={pageStyle.dateTimePickerBGColor}
                />
              </View>
            )}
          </Modal>}
          {Platform.OS === 'android' && this.state.isDateTimePickerVisible &&
          <DateTimePicker
            value={this.state.dateValue}
            mode={'date'}
            display="spinner"
            // maximumDate={new Date()}
            onChange={this._onChangeAndroid}
          />}
        </>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextBtnCLick}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('collectDoBPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
