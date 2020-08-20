import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './coinInfo.page.style';

export default class CoinInfoPage extends BasePage {
  constructor(props) {
    super(props);
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    let selectedScreen = this.props.navigationProps.purpose === 'buySingle' ? screenId.Transactional.BuySellAssets.BuySingleAssetPage : screenId.Transactional.BuySellAssets.SellSingleAssetPage;
    return NavigationUtil.gotoScreen(this.props.componentId, selectedScreen, {...this.props.navigationProps});
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('coinInfoPage.title', {title: this.props.navigationProps.purpose === 'buySingle' ? strings('coinInfoPage.label_buy') : strings('coinInfoPage.label_sell')})}
          onPressEvent={this._backButton}
          titleColor={commonTheme.COLOR_DEFAULT_LIGHT}/>
        <View style={commonStyle.container}>
          <ScreenTitleImage imageAssetBackground={this.props.selectedAsset.HexCode}
                            imageAsset={{uri: `${this.props.CurrencyImageBaseURL}${this.props.navigationProps.AssetCurrencyCode}/symbol.png`}}/>
          <View style={pageStyle.subContainerStyle}>
            <View style={[pageStyle.coinNameContainerStyle, pageStyle.exchangeRateContainerStyle]}>
              <RegularText style={fontFamilyStyles.smallText}>
                {strings('coinInfoPage.label_coin_name')}
              </RegularText>
              <RegularText style={fontFamilyStyles.largeText}>
                {this.props.selectedAsset.CurrencyName}
              </RegularText>
            </View>
            <View style={pageStyle.exchangeRateContainerStyle}>
              <RegularText style={fontFamilyStyles.smallText}>
                {strings('coinInfoPage.label_exchange_rate')}
              </RegularText>
              <RegularText style={fontFamilyStyles.largeText}>
                {this.props.GoalCurrency.CurrencySymbol + this.props.navigationProps.GoalCurrencyConversionRate.toFixed(this.props.GoalCurrency.Precision)}
              </RegularText>
            </View>
          </View>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            color={commonTheme.COLOR_PRIMARY_DARK}
            onPress={this._onNextButtonPressed}
            labelText={strings('coinInfoPage.label_button_asset_transaction', {buttonTitle: this.props.navigationProps.purpose === 'buySingle' ? strings('coinInfoPage.label_buy') : strings('coinInfoPage.label_sell')})}
          />
        </View>
      </View>
    );
  }
}
