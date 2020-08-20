import PropTypes from 'prop-types';
import React from 'react';
import { Clipboard, Image, ScrollView, TouchableHighlight, View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import { store } from '../../../../config/reduxStore/configure.store';
import fontFamilyStyles from '../../../../styles/font.style';
import commonTheme from '../../../../themes/common.theme';
import { BoldText, LabeledInfoBlockComponent, LightText, MediumText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../../components';
import { BaseModal } from '../base.modal';
import { componentStyle } from './transactionInstructions.style';

const _propTypes = {
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
  onPaid: PropTypes.func,
};
const _defaultProps = {
  onDone: () => null,
  onCancel: () => null,
  onPaid: () => null,
};

export default class TransactionInstructions extends BaseModal {
  constructor(props) {
    super(props, false);
    this.state = {
      isUPI: true,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    let currentState = store.getState();
    let transactionCurrency = !!this.props.depositResult.PaymentData ? currentState.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === this.props.depositResult.PaymentData.Transaction.CurrencyCode)) : undefined;
    let depositCurrency = !!this.props.depositResult.PaymentData ? currentState.currencyDataStore.currencies.Currencies.find((item => item.CurrencyCode === this.props.depositResult.PaymentData.Deposit.CurrencyCode)) : undefined;

    this.setState({
      transactionCurrency,
      depositCurrency,
    });
  }

  _togglePaymentMethod = () => {
    this.setState({
      isUPI: !this.state.isUPI,
    });
  };

  _renderInstructions = () => {
    return this.props.depositResult?.PaymentInstructions?.PaymentInstructionFields.map((instructionField, index) => (
      <View key={index}>
        <LabeledInfoBlockComponent title={instructionField.DisplayName}
                                   value={instructionField.Value}
                                   borderColor={commonTheme.COLOR_FADED}
                                   titleColor={commonTheme.COLOR_DARK}
                                   textColor={commonTheme.COLOR_DARK}
                                   style={componentStyle.labelInfoComponentStyle}
        />
      </View>
    ));
  };

  _onDone = async () => {
    return this.close()
      .then(async () => {
        return this.props.onDone?.();
      });
  };

  _onCancel = async () => {
    return this.close()
      .then(async () => {
        return this.props.onCancel?.();
      });
  };

  _onPaid = async () => {
    return this.close()
      .then(async () => {
        return this.props.onPaid?.();
      });
  };

  _renderURLFields = (staticLabel: string, value: string, onPressEvent: any = null) => {
    return (
      <View style={!!onPressEvent ? componentStyle.valueContainer : componentStyle.valueContainerWithoutCopy}>
        <RegularText style={[fontFamilyStyles.smallText]}>
          {staticLabel}
        </RegularText>
        <BoldText style={[fontFamilyStyles.smallText, componentStyle.valueTextStyle]}>
          {value}
        </BoldText>
        {!!onPressEvent ?
          <TouchableHighlight underlayColor={commonTheme.COLOR_SECONDARY}
                              activeOpacity={0.8}
                              style={componentStyle.valueCopyContainer}
                              onPress={onPressEvent}>
            <Image source={require('../../../../assets/icon_copy.png')} style={componentStyle.copyImageStyle}/>
          </TouchableHighlight>
          :
          null
        }
      </View>
    );
  };

  _buildURLs() {
    const separator = (<View style={componentStyle.separatorStyle}/>);
    if (!!this.props.depositResult?.PaymentData) {
      let transactionDetails = (<>
        {this._renderURLFields(
          strings('transactionInstructionsComponent.label_deposit_amount'),
          `${this.state.depositCurrency?.CurrencySymbol}${this.props.depositResult.PaymentData.Deposit.Amount}`,
        )}
        {separator}
        {this._renderURLFields(
          strings('transactionInstructionsComponent.label_transaction_Amount'),
          `${this.state.transactionCurrency?.CurrencySymbol}${this.props.depositResult.PaymentData.Transaction.Amount}`,
          () => {
            Clipboard.setString(this.props.depositResult.PaymentData.Transaction.Amount.toString());
          },
        )}
        {this.state.isUPI ?
          <>
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_upi_id'),
              this.props.depositResult.PaymentData.UPI.PayeeAddress,
              () => {
                Clipboard.setString(this.props.depositResult.PaymentData.UPI.PayeeAddress);
              },
            )}
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_transaction_reference'),
              this.props.depositResult.PaymentData.UPI.TransactionReference,
              () => {
                Clipboard.setString(this.props.depositResult.PaymentData.UPI.TransactionReference);
              },
            )}
          </> :
          <>
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_name'),
              this.props.depositResult.PaymentData.BankTransfer.PayeeName,
              () => {
                Clipboard.setString(this.props.depositResult.PaymentData.BankTransfer.PayeeName);
              },
            )}
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_account_number'),
              this.props.depositResult.PaymentData.BankTransfer.AccountNumber,
              () => {
                Clipboard.setString(this.props.depositResult.PaymentData.BankTransfer.AccountNumber);
              },
            )}
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_ifsc_code'),
              this.props.depositResult.PaymentData.BankTransfer.IFSCCode,
              () => {
                Clipboard.setString(this.props.depositResult.PaymentData.BankTransfer.IFSCCode);
              },
            )}
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_account_type'),
              this.props.depositResult.PaymentData.BankTransfer.AccountType,
            )}
            {separator}
            {this._renderURLFields(
              strings('transactionInstructionsComponent.label_transaction_reference'),
              this.props.depositResult.PaymentData.BankTransfer.TransactionReference,
              () => {
                Clipboard.setString(this.props.depositResult.PaymentData.BankTransfer.TransactionReference);
              },
            )}
          </>}
      </>);
      // let UPIData: PaymentDataTypeTransakUPIEntity = this.props.depositResult.PaymentData.UPI;
      // let NEFTData: PaymentDataTypeTransakBankTransferEntity = this.props.depositResult.PaymentData.BankTransfer;
      // let linksComponent = (
      //   <>
      //     <>
      //       <BoldText>Pay Using UPI App</BoldText>
      //       <TouchableOpacity activeOpacity={0.8} onPress={() => {
      //         return Linking.openURL(`upi://pay?pa=${UPIData.PayeeAddress}&pn${UPIData.PayeeName}&am=${UPIData.Amount}&cu=${UPIData.CurrencyCode}&tr=${UPIData.TransactionReference}&tn=${UPIData.TransactionNotes}`);
      //       }}>
      //         <Image source={{uri: 'https://apigwtest1.b21.io/UPIAppLogos.jpg'}} style={{aspectRatio: 13 / 2, width: '100%'}} resizeMode={'contain'}/>
      //       </TouchableOpacity>
      //     </>
      //     <>
      //       <BoldText>Pay Using BankTransfer</BoldText>
      //       <TouchableOpacity activeOpacity={0.8} onPress={() => {
      //         return Linking.openURL(`upi://pay?pa=${NEFTData.PayeeAddress}&pn${NEFTData.PayeeName}&am=${NEFTData.Amount}&cu=${NEFTData.CurrencyCode}&tr=${NEFTData.TransactionReference}&tn=${NEFTData.TransactionNotes}`);
      //       }}>
      //         <Image source={{uri: 'https://apigwtest1.b21.io/UPIAppLogos.jpg'}} style={{aspectRatio: 13 / 2, width: '100%'}} resizeMode={'contain'}/>
      //       </TouchableOpacity>
      //     </>
      //   </>
      // );
      return (<>
        {transactionDetails}
        {/*{noteText}*/}
        {/*<View style={{paddingVertical: 32}}>{linksComponent}</View>*/}
      </>);
    } else {
      return null;
    }
  }

  render() {
    const title = this.props.depositResult?.IsPreviousPendingDeposit ?
      strings('transactionInstructionsComponent.pending_transaction_title') : strings('transactionInstructionsComponent.title');
    const icon = this.props.depositResult?.IsPreviousPendingDeposit ?
      require('../../../../assets/screen_image_pending_transaction.png') : null;
    const noteText = (<LightText style={[fontFamilyStyles.extraSmallText, componentStyle.textAlignCenterStyle]}><MediumText
      style={[fontFamilyStyles.extraSmallText]}>{strings('transactionInstructionsComponent.label_note')}</MediumText> {this.state.depositCurrency?.CurrencyCode} {strings('transactionInstructionsComponent.label_note_text')}
    </LightText>);
    return (
      <View style={[componentStyle.backdrop]}>
        <View style={[componentStyle.container]}>
          {!!this.props.depositResult?.PaymentInstructions ?
            <>
              <View style={[componentStyle.messageMainContainer]}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={[componentStyle.listView]}>
                  <ScreenTitleImage title={title} imageAsset={icon}/>
                  <View style={componentStyle.descriptionTextContainer}>
                    <LightText style={[componentStyle.descriptionBoldTextStyle, componentStyle.textAlignCenterStyle]}>
                      {strings('transactionInstructionsComponent.description1')}
                      <BoldText style={componentStyle.descriptionBoldTextStyle}>
                        {strings('transactionInstructionsComponent.description2')}
                      </BoldText>
                      {strings('transactionInstructionsComponent.description3')}
                    </LightText>
                  </View>
                  {this._renderInstructions()}
                </ScrollView>
              </View>
              <View>
                <StandardButton onPress={this._onDone}
                                isBottomButton
                                showCompact
                                color={commonTheme.COLOR_PRIMARY_DARK}
                                labelText={strings('transactionInstructionsComponent.label_button_done')}/>
              </View>
            </> :
            null}
          {!!this.props.depositResult?.PaymentData ?
            <>
              <View style={[componentStyle.messageMainContainer]}>
                <ScrollView bounces={true} showsVerticalScrollIndicator={false} contentContainerStyle={[componentStyle.listView]}>
                  <ScreenTitleImage title={title}
                                    imageAsset={icon}
                                    descriptionText={strings('transactionInstructionsComponent.description')}/>
                  <View>
                    <View style={componentStyle.upiBankContainerStyle}>
                      <View style={componentStyle.upiContainerStyle}>
                        <RegularText style={[fontFamilyStyles.smallText]}>{strings('transactionInstructionsComponent.label_upi')}</RegularText>
                      </View>
                      <SwitchButton
                        backgroundInactive={commonTheme.COLOR_SECONDARY}
                        backgroundActive={commonTheme.COLOR_PRIMARY_DARK}
                        value={!this.state.isUPI}
                        onValueChange={this._togglePaymentMethod}
                        containerStyle={componentStyle.switchContentContainerStyle}/>
                      <View style={componentStyle.bankContainerStyle}>
                        <RegularText style={[fontFamilyStyles.smallText]}>{strings('transactionInstructionsComponent.label_bank')}</RegularText>
                      </View>
                    </View>

                    <View style={componentStyle.urlContainerStyle}>
                      {this._buildURLs()}
                    </View>
                    {noteText}
                  </View>
                </ScrollView>
              </View>
              <View style={[componentStyle.buttonContainer]}>
                <StandardButton onPress={this._onCancel}
                                style={componentStyle.buttonStyle}
                                isBottomButton
                                showCompact
                                color={commonTheme.COLOR_SECONDARY}
                                labelText={strings('transactionInstructionsComponent.label_button_cancel')}/>
                <StandardButton onPress={this._onPaid}
                                style={componentStyle.buttonStyle}
                                isBottomButton
                                showCompact
                                color={commonTheme.COLOR_PRIMARY_DARK}
                                labelText={strings('transactionInstructionsComponent.label_button_paid')}/>
              </View>
            </> :
            null}
        </View>
      </View>
    );
  }
}

TransactionInstructions.propTypes = _propTypes;
TransactionInstructions.defaultProps = _defaultProps;
