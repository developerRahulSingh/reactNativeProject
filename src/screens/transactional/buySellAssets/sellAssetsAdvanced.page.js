import React from 'react';
import { Image, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { PITypeEntity, PITypeTransferServiceTypesEntity, SellAssetEntity, TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { AmountCalculator, BackNavTitle, LightText, MediumText, RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './sellAssetsAdvanced.page.style';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class SellAssetsAdvancedPage extends BasePage {

  constructor(props) {
    super(props, {
      cryptoCurrencies: '',
      enableNextBtn: false,
    });
    this._renderCurrencyView = this._renderCurrencyView.bind(this);
  }

  componentDidMount() {
    this._buildCurrencyList();
  }

  // Back Button Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  // Get Currency Symbol
  _buildCurrencyList = () => {
    if (this.props.GoalDashboard?.AssetPerformances?.length > 0) {
      this.setState({
        cryptoCurrencies: this.props.GoalDashboard.AssetPerformances.map(asset => ({
          ...asset,
          ...this.props.Currencies.find(currency => currency.CurrencyCode === asset.CurrencyCode),
          calculatedAmount: 0,
          calculatedQuantity: 0,
          select: false,
          error: '',
        })),
      });
    } else {
      this.setState({
        cryptoCurrencies: [],
      });
    }
  };

  // Select Currency Button Click Event
  _selectCurrency = (data) => {
    let selectedCurrency = this.state.cryptoCurrencies;
    selectedCurrency.map(currency => {
      if (data.CurrencyCode === currency.CurrencyCode) {
        currency.calculatedAmount = 0;
        currency.calculatedQuantity = 0;
        currency.select = !currency.select;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({cryptoCurrencies: selectedCurrency}, () => {
          this._validate();
        });
      }
    });
  };

  _validate = () => {
    let selectedAssets = this.state.cryptoCurrencies.some(currency => {
      return currency.select && !(currency.calculatedQuantity > 0 && currency.isValid);
    });
    let noSelectedAssets = this.state.cryptoCurrencies.every(currency => currency.select === false);
    let enableBtn = !!noSelectedAssets ? !noSelectedAssets : !selectedAssets;
    this.setState({
      enableNextBtn: enableBtn,
    });
  };

  _buildSellAssetsPIType() {
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
  }

  //Next Button Click Event
  _onNextButtonClick = async () => {
    if (!this.state.enableNextBtn) {
      return;
    }
    let transactionAmount = 0;
    const sellAssets = this.state.cryptoCurrencies.filter(currency => currency.select).map((currency) => {
      transactionAmount += currency.calculatedAmount;
      let sellAsset = new SellAssetEntity();
      sellAsset.SellAssetAmount = currency.calculatedAmount === parseFloat(currency.Balance.toFixed(this.props.GoalCurrency.Precision)) ?
        currency.AssetAmount
        : currency.calculatedQuantity;
      sellAsset.SellAssetCurrencyCode = currency.CurrencyCode;
      return sellAsset;
    });
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.ConfirmTransactionPage, {
      purpose: 'sellMultiple',
      piType: this._buildSellAssetsPIType(),
      transactionAmount: transactionAmount,
      sellAssets,
    });
  };

  // Portfolio Coin List Items Render Function
  _renderCurrencyView = () => {
    return this.state.cryptoCurrencies.map((data, index) => {
      return (
        <View style={pageStyle.renderCurrencyContainerViewStyle} key={index}>
          <View style={[pageStyle.renderCurrencySubContainerStyle, {
            borderColor: data.select ? data.error ? commonTheme.COLOR_DANGER : commonTheme.COLOR_SUCCESS : commonTheme.COLOR_LIGHTEST,
          }]}>
            <TouchableOpacity activeOpacity={0.8} style={pageStyle.buttonStyle} onPress={() => {
              this._selectCurrency(data);
            }}>
              <View style={pageStyle.buttonContainerStyle}>
                <View style={[pageStyle.currencySymbolContainerStyle, pageStyle.currencySymbolImageStyle, {backgroundColor: data.HexCode}]}>
                  <Image style={pageStyle.currencySymbolImageStyle}
                         source={{uri: `${this.props.CurrencyImageBaseURL}${data.CurrencyCode}/symbol.png`}}/>
                </View>
                <View style={pageStyle.assetAmountContainerStyle}>
                  <View>
                    <MediumText>
                      {data.AssetAmount.toFixed(data.Precision) + ' ' + data.CurrencyCode}
                    </MediumText>
                    <RegularText style={pageStyle.currencyNameTextStyle}>
                      {data.CurrencyName} ({this.props.GoalCurrency.CurrencySymbol}{parseFloat(data.GoalCurrencyConversionRate).toFixed(this.props.GoalCurrency.Precision)})
                    </RegularText>
                  </View>
                  <View style={pageStyle.alignItemStyle}>
                    <MediumText>
                      {typeof (data.Balance) !== 'undefined' ? this.props.GoalCurrency.CurrencySymbol + parseFloat(data.Balance).toFixed(this.props.GoalCurrency.Precision) : ''}
                    </MediumText>
                  </View>
                </View></View>
            </TouchableOpacity>
            {data.select === false ?
              null :
              <View style={pageStyle.amountCalculatorContainerStyle}>
                <AmountCalculator
                  initialAmountPrecision={this.props.GoalCurrency.Precision}
                  initialQuantityPrecision={data.Precision}
                  toggleAmountQty={true}
                  currencySymbol={this.props.GoalCurrency.CurrencySymbol}
                  currencyCode={this.props.GoalCurrency.CurrencyCode}
                  error={data.error}
                  cryptoCurrencyCode={data.CurrencyCode}
                  goalCurrencyConversionRate={data.GoalCurrencyConversionRate}
                  handleTextChange={(result) => {
                    let currentCurrency = this.state.cryptoCurrencies.find(currency => currency.CurrencyCode === data.CurrencyCode);
                    currentCurrency.calculatedAmount = result.Amount;
                    currentCurrency.calculatedQuantity = result.Quantity;
                    if (currentCurrency.calculatedQuantity && currentCurrency.calculatedQuantity < currentCurrency.MinSellAmount || currentCurrency.calculatedQuantity > currentCurrency.MaxSellAmount) {
                      currentCurrency.isValid = false;
                      currentCurrency.error = strings('sellAssetsAdvancedPage.error_invalid_amount', {
                        minAmount: parseFloat(currentCurrency.MinSellAmount).toFixed(data.Precision),
                        maxAmount: parseFloat(currentCurrency.MaxSellAmount).toFixed(data.Precision),
                      });
                    } else if (currentCurrency.calculatedQuantity && currentCurrency.calculatedQuantity > data.AssetAmount) {
                      currentCurrency.isValid = false;
                      currentCurrency.error = strings('sellAssetsAdvancedPage.error_trying_to_sell_more_coins_than_you_have');
                    } else {
                      currentCurrency.isValid = true;
                      currentCurrency.error = '';
                    }
                    this.setState({cryptoCurrencies: this.state.cryptoCurrencies}, () => {
                      this._validate();
                    });

                  }}
                  onSubmitEditing={this._onNextButtonClick}
                />
              </View>
            }
            <View style={[pageStyle.imageCardClickContainerStyle, pageStyle.imageStyle, {display: data.select ? 'flex' : 'none'}]}>
              <Image style={[pageStyle.imageStyle, {display: data.select ? 'flex' : 'none'}]}
                     source={require('../../../assets/coinCardCheck.png')}/>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('sellAssetsAdvancedPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          <ScreenTitleImage imageAsset={require('../../../assets/withdraw-advance-icon.png')}
                            descriptionText={strings('sellAssetsAdvancedPage.description')}/>
          <View style={pageStyle.currentAssetsValueContainerStyle}>
            <RegularText style={pageStyle.textColorStyle}>
              {strings('sellAssetsAdvancedPage.label_current_asset_value')}
            </RegularText>
            <LightText style={[pageStyle.textColorStyle, pageStyle.marginEndStyle]}>
              {this.props.GoalCurrency.CurrencySymbol}{(this.props.GoalDashboard.Balance - this.props.GoalDashboard.CashBalance).toFixed(this.props.GoalCurrency.Precision)}
            </LightText>
          </View>
          <View style={pageStyle.renderCurrencyContainerStyle}>
            {this.state.cryptoCurrencies ? this._renderCurrencyView() : null}
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClick}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('sellAssetsAdvancedPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
