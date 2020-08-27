import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../config/i18/i18n';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import fontFamilyStyles from '../../styles/font.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, BoldText, DecimalMaskedTextInput, LabeledInfoBlockComponent, MediumText, RegularText, ScreenTitleImage, StandardButton } from '../common/components';
import { pageStyle } from './transactionAssetsEdit.page.style';

const moment = require('moment');

export default class TransactionAssetsEditPage extends BasePage {
  constructor(props) {
    super(props, {
      selectedDateFormat: '',
      dateValue: new Date(),
      enableNextBtn: false,
      isDateTimePickerVisible: false,
      enteredAmount: '',
    });
  }

  componentDidMount = async () => {
    this.setState({
      selectedDateFormat: moment(new Date()).format('MM/DD/YYYY'),
      enteredAmount: this.props.navigationProps.assetData.CostBasisInUSD <= 0 ? '' : this.props.navigationProps.assetData.CostBasisInUSD.toFixed(2),
    });
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _onChange = (event, selectedDate) => {
    this._valueFromPicker(selectedDate);
  };

  _onChangeAndroid = (event, selectedDate) => {
    this._hideDateTimePicker();
    this._valueFromPicker(selectedDate);
  };

  _valueFromPicker = (selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      dateValue: currentDate,
      selectedDateFormat: moment(currentDate).format('MM/DD/YYYY'),
      enableNextBtn: true,
    });
  };

  _checkEnteredAmount = (amount) => {
    this.setState({
      enteredAmount: amount,
      enableNextBtn: amount > 0,
    });
  };

  _onDoneButtonPressed = async () => {
    if (this.state.enteredAmount === '') {
      return NavigationUtil.showAlert({messageText: strings('transactionAssetsEditPage.error_amount')});
    } else {
      return interfaces.updateAssetTransferTransactionAcquisitionInfo(this.props.navigationProps.assetData.AssetTransferTransactionID, parseFloat(this.state.enteredAmount), this.state.selectedDateFormat)
        .then(async (result) => {
          if (this.props.navigationProps.onRefresh) {
            await this.props.navigationProps.onRefresh(this.props.navigationProps.assetData.CurrencyCode).then(() => {
              this._backButton();
            });
          }
        })
        .catch(() => null);
    }
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('transactionAssetsEditPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={pageStyle.scrollViewContentContainer}>
          <ScreenTitleImage
            imageAsset={{uri: `${this.props.CurrencyImageBaseURL}${this.props.navigationProps.assetData.CurrencyCode}/symbol.png`}}
            imageAssetBackground={this.props.navigationProps.selectedCurrency.HexCode}
            descriptionText={strings('transactionAssetsEditPage.description')}
          />
          <View style={pageStyle.contentMainContainer}>
            <View style={[pageStyle.infoContainer]}>
              <View style={pageStyle.idContainer}>
                <RegularText>
                  {strings('transactionAssetsEditPage.label_id') + this.props.navigationProps.assetData.AssetTransferTransactionID}
                </RegularText>
                <BoldText style={[fontFamilyStyles.largeText]}>
                  {this.props.navigationProps.assetData.CurrencyCode}
                </BoldText>
              </View>
              <View style={pageStyle.dateAmountInfoContainer}>
                <MediumText>
                  {this.props.GoalCurrency.CurrencySymbol + this.props.navigationProps.assetData.Amount.toFixed(2)}
                </MediumText>
                <RegularText style={[fontFamilyStyles.smallText]}>
                  {this.props.navigationProps.assetData.AcquisitionDate}
                </RegularText>
              </View>
            </View>
            <TouchableOpacity activeOpacity={.8} onPress={this._showDateTimePicker}>
              <LabeledInfoBlockComponent
                showAsDropdown
                title={strings('transactionAssetsEditPage.label_select_date')}
                titleColor={commonTheme.COLOR_DARK}
                value={this.state.selectedDateFormat}/>
            </TouchableOpacity>
            <DecimalMaskedTextInput
              onSubmitEditing={this._onDoneButtonPressed}
              // decimalPoint={8}
              currencySymbol={this.props.GoalCurrency.CurrencySymbol}
              onValidAmountAvailable={(amount) => {
                this._checkEnteredAmount(amount);
              }}
              value={this.state.enteredAmount}
              placeHolderText={strings('transactionAssetsEditPage.placeholder_enter_amount')}
            />
          </View>
          <View style={commonStyle.bottomButtonContainer}>
            <StandardButton
              onPress={this._onDoneButtonPressed}
              color={commonTheme.COLOR_PRIMARY_DARK}
              disabled={!this.state.enableNextBtn}
              labelText={strings('transactionAssetsEditPage.label_button_done')}
            />
          </View>
        </KeyboardAwareScrollView>
        <>
          {Platform.OS === 'ios' && this.state.isDateTimePickerVisible &&
          <Modal transparent animationType="none" visible={this.state.isDateTimePickerVisible}>
            {this.state.isDateTimePickerVisible && (
              <View style={pageStyle.dateTimePickerContainerStyle}>
                <View style={[pageStyle.dateTimePickerBGColor, pageStyle.dateTimePickerDoneButtonContainerStyle]}>
                  <TouchableOpacity onPress={this._hideDateTimePicker}>
                    <RegularText>{strings('transactionAssetsEditPage.label_button_done')}</RegularText>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={this.state.dateValue}
                  textColor={commonTheme.COLOR_DARK}
                  mode={'date'}
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
            onChange={this._onChangeAndroid}
          />}
        </>
      </View>
    );
  }
}
