import React from 'react';
import { ScrollView, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDisplayName from '../../../constants/payment.instrument.display.name.enum';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, LightText, MediumText, RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './selectPaymentInstrument.page.style';

export default class SelectPaymentInstrumentPage extends BasePage {
  selectedTSType: TSTypeEntity;

  constructor(props) {
    super(props, {
      paymentInstrumentsArr: [],
    });
    this.selectedTSType = this.props.navigationProps.piType?.PITransferServiceTypes.find(tsType => tsType.Selected);
  }

  componentDidAppear = async () => {
    super.componentDidAppear();
    return interfaces.getUserPaymentInstruments(this.props.navigationProps.direction, this.props.navigationProps.piType?.PIType.PITypeName, this.selectedTSType.TSTypeName)
      .then((result) => {
        this.setState({
          paymentInstrumentsArr: result.PaymentInstruments,
        });
      })
      .catch(() => null);
  };

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Use this card/use this bank Button Click Event
  _onPaymentInstrumentSelected = async (selectedItem) => {
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.ConfirmTransactionPage, {
      ...this.props.navigationProps,
      paymentInstrument: selectedItem,
    });
  };

  _addNewClick = async () => {
    if (this.props.navigationProps.paymentInstrumentRequirements?.GenerateCreatePaymentInstrumentHTMLRequired) {
      return interfaces.generateCreatePaymentInstrumentHTML(this.props.navigationProps.direction, this.props.navigationProps.piType?.PIType.PITypeName, this.selectedTSType.TSTypeName)
        .then((result) => {
          let nextScreenID = '';
          if (!!result.HTML) {
            nextScreenID = screenId.Transactional.Common.AddPaymentInstrumentWebViewPage;
          } else if (result.ThirdPartyWidgetInitializationParameters && result.ThirdPartyWidgetInitializationParameters.length > 0) {
            nextScreenID = screenId.Transactional.Common.AddPaymentInstrumentWidgetPage;
          } else {
            return NavigationUtil.showAlert({messageText: strings('selectPaymentInstrumentPage.error_not_supported')});
          }
          return NavigationUtil.gotoScreen(this.props.componentId, nextScreenID, {
            ...this.props.navigationProps,
            generateCreatePaymentInstrumentHTML: result,
          });
        })
        .catch(() => null);
    } else {
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.AddPaymentInstrumentDynamicFieldsPage, {...this.props.navigationProps});
    }
  };

  _paymentInstrumentsItems = () => {
    if (this.state.paymentInstrumentsArr.length > 0) {
      return this.state.paymentInstrumentsArr.map((item, index) => {
        return (
          <View key={index} style={pageStyle.paymentInstrumentListContainerStyle}>
            <RegularText
              style={pageStyle.displayNameLabelStyle}>
              {item.AcctDisplayName}
            </RegularText>
            <StandardButton
              width={'50%'}
              showCompact
              onPress={this._onPaymentInstrumentSelected.bind(this, item)}
              color={commonTheme.COLOR_PRIMARY_DARK}
              labelText={strings('selectPaymentInstrumentPage.label_use_this')}
            />
          </View>
        );
      });
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('selectPaymentInstrumentPage.title', {title: this.props.navigationProps.piType?.PIType.PITypeDisplayName})}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={pageStyle.subContainerStyle}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <ScreenTitleImage imageAsset={require('../../../assets/card_circle_blue.png')}/>
            <MediumText style={pageStyle.savedLabelStyle}>
              {strings('selectPaymentInstrumentPage.label_saved', {piTypeName: this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.BankTransfer ? strings('common.label_bank_account') : this.props.navigationProps.piType?.PIType.PITypeDisplayName})}
            </MediumText>
            {this.state.paymentInstrumentsArr && this.state.paymentInstrumentsArr.length > 0 ?
              this._paymentInstrumentsItems() :
              <View style={pageStyle.paymentInstrumentContainerStyle}>
                <LightText>{strings('selectPaymentInstrumentPage.label_nothing_saved', {piTypeName: this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.BankTransfer ? strings('common.label_bank_account') : this.props.navigationProps.piType?.PIType.PITypeDisplayName})}</LightText>
              </View>
            }
          </ScrollView>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            disabled={this.props.navigationProps.paymentInstrumentRequirements.MaximumPaymentInstruments <= this.state.paymentInstrumentsArr?.length}
            onPress={this._addNewClick}
            color={commonTheme.COLOR_SECONDARY}
            labelText={strings('selectPaymentInstrumentPage.label_add_new_debit_card', {piTypeName: this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.BankTransfer ? strings('common.label_bank_account') : this.props.navigationProps.piType?.PIType.PITypeDisplayName})}
          />
        </View>
      </View>
    );
  }
}
