import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PlaidLink from 'react-native-plaid-link-sdk';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDisplayName from '../../../constants/payment.instrument.display.name.enum';
import interfaces from '../../../interfaces';
import { NameValuePairEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './addPaymentInstrumentWidget.page.style';

export default class AddPaymentInstrumentWidgetPage extends BasePage {
  constructor(props) {
    super(props, {
      accountName: '',
      enableNextBtn: false,
      isSuccess: false,
    });
  }

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  getObjectFromNameValue(dataArray: Array<NameValuePairEntity>) {
    if (!!dataArray) {
      return dataArray.reduce((previousValue, currentValue) => {
        previousValue[currentValue.Name] = currentValue.Value;
        return previousValue;
      }, {});
    } else {
      return {};
    }
  }

  checkIfFieldsAreNotEmpty = (value) => {
    this.setState({accountName: value}, () => {
      this.changeNextBtnState();
    });
  };

  changeNextBtnState = () => {
    if (this.state.accountName && this.state.accountName.length >= 6 && this.state.accountName.length <= 20) {
      this.setState({
        enableNextBtn: true,
      });
    } else {
      this.setState({
        enableNextBtn: false,
      });
    }
  };

  createPlaidPaymentInstrument = async (data) => {
    const selectedTSType = this.props.navigationProps.piType?.PITransferServiceTypes.find(tsType => tsType.Selected);
    const piRequiredFieldValues = [{Name: 'PlaidPublicToken', Value: data.public_token}, {
      Name: 'PlaidAccountID',
      Value: !!data.account_id ? data.account_id : data.link_connection_metadata.raw_data.account_id,
    }];

    return interfaces.createUserPaymentInstruments(this.props.navigationProps.direction, this.props.navigationProps.piType.PIType.PITypeName, selectedTSType.TSTypeName, this.state.accountName.trim(), piRequiredFieldValues)
      .then((result) => {
        this.setState({isSuccess: !!result});
      })
      .catch(() => null);
  };

  render() {
    const fields = this.getObjectFromNameValue(this.props.navigationProps.generateCreatePaymentInstrumentHTML?.ThirdPartyWidgetInitializationParameters);
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('addPaymentInstrumentWidgetPage.title', {piTypeName: this.props.navigationProps.piType.PIType.PITypeName === paymentInstrumentDisplayName.BankTransfer ? strings('common.label_bank_account') : this.props.navigationProps.piType.PIType.PITypeDisplayName})}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        {fields?.ThirdPartyWidgetName === 'Plaid' ?
          !this.state.isSuccess ? <>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}
                                     contentContainerStyle={pageStyle.keyboardScrollViewContainerStyle}
                                     bounces={false}>
              <ScreenTitleImage imageAsset={require('../../../assets/withdraw-total-icon.png')}
                                descriptionText={strings('addPaymentInstrumentWidgetPage.description', {provider: fields?.ThirdPartyWidgetName})}/>
              <IconBasedTextInput
                value={this.state.accountName}
                placeholderText={strings('addPaymentInstrumentWidgetPage.placeholder_account_name')}
                returnKeyType={'next'}
                onChangeText={(accountName) => this.checkIfFieldsAreNotEmpty(accountName)}
                title={strings('addPaymentInstrumentWidgetPage.label_account_name')}/>
            </KeyboardAwareScrollView>
            <View style={commonStyle.bottomButtonContainer}>
              <PlaidLink
                selectAccount={true}
                accountSubtypes={{depository: ['checking', 'savings']}}
                publicKey={fields?.PlaidPublicKey}
                clientName={fields?.PlaidClientName}
                env={fields?.PlaidEnvironment}  // 'sandbox' or 'development' or 'production'
                product={[fields?.PlaidProducts]}
                component={StandardButton}
                componentProps={{disabled: !this.state.enableNextBtn, labelText: strings('addPaymentInstrumentWidgetPage.label_start_process')}}
                onSuccess={this.createPlaidPaymentInstrument}
                countryCodes={[fields?.PlaidCountryCodes]}/>
            </View>
          </> : <View style={[pageStyle.keyboardScrollViewContainerStyle, pageStyle.notSupportedContainerStyle]}>
            <RegularText style={pageStyle.textAlignStyle}>{strings('addPaymentInstrumentWidgetPage.label_process_complete')}</RegularText>
          </View> :
          <View style={pageStyle.notSupportedContainerStyle}>
            <RegularText>{strings('addPaymentInstrumentWidgetPage.label_not_supported')}</RegularText>
          </View>}
      </View>
    );
  }
}
