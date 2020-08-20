import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { PITypeEntity, PITypeTransferServiceTypesEntity, TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { AmountCalculator, BackNavTitle, LightText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './sellSingleAsset.page.style';

export default class sellSingleAssetPage extends BasePage {

  constructor(props) {
    super(props, {
      sellAll: false,
      enableNextBtn: false,
      errorMessage: '',
      calculatedAmount: 0,
      calculatedQuantity: 0,
    });
  }

  //Back Button click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Create Sell Assets PIType Entity
  _buildSellPIType = () => {
    let sellOption = new PITypeTransferServiceTypesEntity();
    let piPaymentInstrumentForSell = new PITypeEntity();
    piPaymentInstrumentForSell.PITypeDisplayName = 'Sell Asset';
    piPaymentInstrumentForSell.PITypeName = 'Sell Asset';
    piPaymentInstrumentForSell.PITypeID = '0';
    piPaymentInstrumentForSell.disabled = false;
    sellOption.PIType = piPaymentInstrumentForSell;
    let tsPaymentInstrumentForSell = new TSTypeEntity();
    tsPaymentInstrumentForSell.TSTypeDisplayName = 'Portfolio';
    tsPaymentInstrumentForSell.TSTypeName = 'Portfolio';
    tsPaymentInstrumentForSell.TSTypeID = '0';
    tsPaymentInstrumentForSell.Selected = true;
    sellOption.PITransferServiceTypes = [tsPaymentInstrumentForSell];
    return sellOption;
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    if (!this.state.calculatedQuantity && (this.state.calculatedQuantity < this.props.selectedAsset.MinSellAmount) || (this.state.calculatedQuantity > this.props.selectedAsset.MaxSellAmount)) {
      this.setState({
        errorMessage: strings('sellSingleAssetPage.error_invalid_coin', {
          assetCurrencyCode: this.props.navigationProps.AssetCurrencyCode,
          minAmount: this.props.selectedAsset.MinSellAmount.toFixed(this.props.selectedAsset.Precision),
          maxAmount: this.props.selectedAsset.MaxSellAmount.toFixed(this.props.selectedAsset.Precision),
        }),
        enableNextBtn: false,
      });
      return;
    } else if (parseFloat(this.state.calculatedQuantity.toFixed(this.props.selectedAsset.Precision)) > parseFloat(this.props.navigationProps.AssetAmount.toFixed(this.props.selectedAsset.Precision))) {
      this.setState({
        errorMessage: strings('sellSingleAssetPage.error_sell_more_coin'),
        enableNextBtn: false,
      });
      return;
    }
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.ConfirmTransactionPage, {
      ...this.props.navigationProps,
      sellAssets: [{
        SellAssetCurrencyCode: this.props.navigationProps.AssetCurrencyCode,
        SellAssetAmount:
          this.state.calculatedQuantity.toFixed(this.props.selectedAsset.Precision) === this.props.navigationProps.AssetAmount.toFixed(this.props.selectedAsset.Precision) ?
            this.props.navigationProps.AssetAmount :
            this.state.calculatedQuantity,
      }],
      transactionAmount: this.state.calculatedAmount,
      piType: this._buildSellPIType(),
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('sellSingleAssetPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.COLOR_DEFAULT_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage
            imageAsset={{uri: `${this.props.CurrencyImageBaseURL}${this.props.navigationProps.AssetCurrencyCode}/symbol.png`}}
            imageAssetBackground={this.props.selectedAsset.HexCode}
            descriptionText={strings('sellSingleAssetPage.description')}
          />
          <View style={pageStyle.assetBalanceContainer}>
            <RegularText style={pageStyle.textColorStyle}>
              {strings('sellSingleAssetPage.label_current_coin_balance')}
            </RegularText>
            <LightText style={[pageStyle.textColorStyle, pageStyle.marginEndStyle]}>
              {this.props.navigationProps.AssetAmount.toFixed(this.props.selectedAsset.Precision)} ({this.props.GoalCurrency.CurrencySymbol + this.props.navigationProps.Balance.toFixed(this.props.GoalCurrency.Precision)})
            </LightText>
          </View>
          <View style={pageStyle.switchContainer}>
            <SwitchButton
              value={this.state.sellAll}
              onValueChange={sellAll => this.setState({sellAll})}
            />
            <RegularText style={[pageStyle.textColorStyle, pageStyle.marginStartStyle]}>
              {strings('sellSingleAssetPage.label_sell_all')}
            </RegularText>
          </View>
          <AmountCalculator
            style={pageStyle.amountCalculatorStyle}
            initialQuantity={this.state.sellAll ? this.props.navigationProps.AssetAmount : null}
            initialAmountPrecision={this.props.GoalCurrency.Precision}
            initialQuantityPrecision={this.props.selectedAsset.Precision}
            disable={!this.state.sellAll}
            toggleAmountQty={true}
            currencySymbol={this.props.GoalCurrency.CurrencySymbol}
            currencyCode={this.props.GoalCurrency.CurrencyCode}
            error={this.state.errorMessage}
            cryptoCurrencyCode={this.props.navigationProps.AssetCurrencyCode}
            goalCurrencyConversionRate={this.props.navigationProps.GoalCurrencyConversionRate}
            handleTextChange={(result) => {
              this.setState({
                calculatedAmount: parseFloat(result.Amount.toFixed(this.props.GoalCurrency.Precision)),
                calculatedQuantity: parseFloat(result.Quantity.toFixed(this.props.selectedAsset.Precision)),
                enableNextBtn: result.Amount > 0,
                errorMessage: '',
              });
            }}
            onSubmitEditing={this._onNextButtonPressed}
          />
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            disabled={!this.state.enableNextBtn}
            color={commonTheme.COLOR_PRIMARY_DARK}
            onPress={this._onNextButtonPressed}
            labelText={strings('sellSingleAssetPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
