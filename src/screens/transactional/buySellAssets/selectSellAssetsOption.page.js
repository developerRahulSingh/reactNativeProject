import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { WithdrawFlow } from '../../../constants/withdraw.info.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, ButtonWithIconAndArrow, LightText, ScreenTitleImage } from '../../common/components';
import { pageStyle } from './selectSellAssetsOption.page.style';

export default class SelectSellAssetsOptionPage extends BasePage {
  constructor(props) {
    super(props);
  }

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _sellAssetsPressed = async () => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.SellAssetsAmountPage, {withdrawType: WithdrawFlow.TotalAmount});
  };

  _advancedSellAssetsPressed = async () => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.SellAssetsAdvancedPage);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('selectSellAssetsOptionPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <ScreenTitleImage imageAsset={require('../../../assets/withdraw-money-icon.png')}
                          descriptionText={strings('selectSellAssetsOptionPage.description')}/>
        <View style={pageStyle.buttonContainerStyle}>
          <ButtonWithIconAndArrow
            buttonClickEvent={this._sellAssetsPressed}
            imageLink={require('../../../assets/cash_green_icon.png')}
            titleDescription={strings('selectSellAssetsOptionPage.label_sell_assets')}
          />
          <ButtonWithIconAndArrow
            buttonClickEvent={this._advancedSellAssetsPressed}
            imageLink={require('../../../assets/menu.withdraw.icon.png')}
            titleDescription={strings('selectSellAssetsOptionPage.label_advanced_sell_assets')}
          />
          <View style={pageStyle.advanceSellContainerStyle}>
            <LightText style={pageStyle.advanceSellTextStyle}>
              {strings('selectSellAssetsOptionPage.label_advanced_sell_assets_note')}
            </LightText>
          </View>
        </View>
      </View>
    );
  }
}
