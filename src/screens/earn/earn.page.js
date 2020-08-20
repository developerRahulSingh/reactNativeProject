import moment from 'moment';
import React from 'react';
import { Image, Platform, ScrollView, UIManager, View } from 'react-native';
import Share from 'react-native-share';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import fontFamilyStyles from '../../styles/font.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BoldText, RegularText, ScreenTitleImage, StandardButton } from '../common/components';
import { pageStyle } from './earn.page.style';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class EarnPage extends BasePage {
  constructor(props) {
    super(props, {
      stackEarnExpand: false,
      inviteEarnExpand: false,
      investEarnExpand: false,
    }, true);
  }

  _backButtonHandler = async () => {
    return NavigationUtil.gotoDashboardTab(this.props.componentId);
  };

  _onShareNowPress = () => {
    return Share.open({
      subject: strings('common.label_app_name'),
      title: strings('common.label_app_name'),
      message: strings('common.label_share_content', {code: this.props.User.ReferralCode}),
      failOnCancel: false,
    }).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _onStakeB21ButtonClick = () => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      let assetUnPurchased = this.props.GoalDashboard.UnpurchasedCoins.find(curr => curr.CurrencyCode === 'B21');
      let coinInfo = {};
      if (!!assetUnPurchased) {
        coinInfo.AssetAmount = 0;
        coinInfo.Balance = 0;
        coinInfo.CurrencyCode = assetUnPurchased.CurrencyCode;
        coinInfo.GoalCurrencyConversionRate = assetUnPurchased.GoalCurrencyConversionRate;
      } else {
        let asset = this.props.GoalDashboard.AssetPerformances.find(curr => curr.CurrencyCode === 'B21');
        coinInfo.AssetAmount = asset.AssetAmount;
        coinInfo.Balance = asset.Balance;
        coinInfo.CurrencyCode = asset.CurrencyCode;
        coinInfo.GoalCurrencyConversionRate = asset.GoalCurrencyConversionRate;
      }
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.CoinInfoPage, {
        AssetAmount: coinInfo.AssetAmount,
        AssetCurrencyCode: coinInfo.CurrencyCode,
        Balance: coinInfo.Balance,
        GoalCurrencyConversionRate: coinInfo.GoalCurrencyConversionRate,
        purpose: 'buySingle',
      });
    }
  };

  _onReserveNowClick = async () => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      const currentDate = new Date();
      const todayDate = moment(currentDate).format('YYYY-MM-DD');
      return interfaces.UpdateOptInItem('B21CardPreOrder', todayDate)
        .then((result) => {
          return NavigationUtil.showAlert({messageText: strings('earnPage.alert_success_b21_card')});
        })
        .catch(() => null);
    }
  };

  _renderSectionTitleWithButton = (title: string, moreDetailsButton: boolean, clickEvent: any) => {
    return (
      <View style={pageStyle.sectionHeadingContainer}>
        <BoldText style={pageStyle.sectionHeadingTextStyle}>{title}</BoldText>
      </View>
    );
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.mainContainer]}>
        <ScreenTitleImage titleColor={commonTheme.COLOR_PRIMARY_DARK} title={strings('earnPage.title')}
                          handleNotch={true}/>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={pageStyle.scrollViewStyle}>
          <View style={[pageStyle.section]}>
            {this._renderSectionTitleWithButton(strings('earnPage.title_stack_earn'))}
            <RegularText style={pageStyle.descriptionTextStyle}>
              {strings('earnPage.description_stack_earn', {interest: 5, b21AssetsValue: 500})}
            </RegularText>
            <View style={[pageStyle.actionButtonContainer]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <View style={{width: 48, height: 48, borderRadius: 24, backgroundColor: this.props.B21Currency.HexCode}}>
                    <Image style={{width: 48, height: 48}} source={{uri: `${this.props.CurrencyImageBaseURL}B21/symbol.png`}}/>
                  </View>
                </View>
                <View style={{flex: 1, paddingHorizontal: 8}}>
                  <RegularText style={{...fontFamilyStyles.mediumText, color: this.props.B21Currency.HexCode}}>{this.props.B21Currency.CurrencyCode}</RegularText>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <StandardButton showCompact
                                  width={'80%'}
                                  onPress={this._onStakeB21ButtonClick}
                                  labelText={strings('earnPage.label_button_buy_now')}/>
                </View>
              </View>
            </View>
          </View>
          <View style={[pageStyle.section]}>
            {this._renderSectionTitleWithButton(strings('earnPage.title_invite_earn'))}
            <RegularText style={pageStyle.descriptionTextStyle}>
              {strings('earnPage.description_invite_earn', {tokenValue: '$2.00'})}
            </RegularText>
            <View style={pageStyle.referralCodeInfoContainer}>
              <RegularText style={[pageStyle.referralCodeTextStyle]}>
                {strings('earnPage.label_referral_code')}
              </RegularText>
              <View style={pageStyle.referralCodeContainer}>
                <BoldText style={pageStyle.referralCodeValueTextStyle}>
                  {this.props.User.ReferralCode}
                </BoldText>
              </View>
            </View>
            <View style={[pageStyle.actionButtonContainer]}>
              <StandardButton
                onPress={this._onShareNowPress}
                color={commonTheme.COLOR_PRIMARY_DARK}
                labelText={strings('earnPage.label_button_share_now')}
              />
            </View>
          </View>
          <View style={[pageStyle.section]}>
            {this._renderSectionTitleWithButton(strings('earnPage.title_invest_earn'))}
            <RegularText style={pageStyle.descriptionTextStyle}>
              {strings('earnPage.description_invest_earn', {
                firstDepositValue: '$50.00',
                firstEarnValue: '$5.00',
                investValue: '$100',
                rewardB21Value: '$5.00',
              })}
            </RegularText>
            <View style={[pageStyle.actionButtonContainer]}>
              <StandardButton
                onPress={() => {
                  if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
                    return this._showAggregateKycStatusErrorPopup(false);
                  } else {
                    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Deposit.DepositAmountPage);
                  }
                }}
                color={commonTheme.COLOR_PRIMARY_DARK}
                labelText={strings('earnPage.label_button_deposit_now')}
              />
            </View>
          </View>
          <View style={[pageStyle.section]}>
            {this._renderSectionTitleWithButton(strings('earnPage.title_reserve_b21_card'))}
            <Image style={pageStyle.cardImageStyle} resizeMode={'contain'} source={require('../../assets/card_sample.png')}/>
            <View style={[pageStyle.actionButtonContainer]}>
              <StandardButton
                onPress={this._onReserveNowClick}
                color={commonTheme.COLOR_PRIMARY_DARK}
                labelText={strings('earnPage.label_button_reserve_now')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

