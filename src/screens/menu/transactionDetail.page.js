import React from 'react';
import { Image, View } from 'react-native';
import { strings } from '../../config/i18/i18n';
import { commonStyle } from '../../styles/common.style';
import fontFamilyStyles from '../../styles/font.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, MediumText, RegularText } from '../common/components';
import { pageStyle } from './transactionDetail.page.style';

export default class TransactionDetailPage extends BasePage {
  constructor(props) {
    super(props);
  }

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _renderHistoryDetailItem = () => {
    if (this.props.navigationProps.data?.AssetTrades.length > 0) {
      return this.props.navigationProps.data?.AssetTrades.map((item, index) => {
        return (
          <View key={index} style={pageStyle.coinItemMainContainer}>
            <View style={[pageStyle.coinImageStyle, pageStyle.coinImageContainer, {
              backgroundColor: this.props.Currencies.find(element => item.AssetCurrencyCode === element.CurrencyCode)?.HexCode || commonTheme.COLOR_LIGHT,
            }]}>
              <Image style={pageStyle.coinImageStyle}
                     source={{uri: `${this.props.CurrencyImageBaseURL}${item.AssetCurrencyCode}/symbol.png`}}/>
            </View>
            <View style={pageStyle.coinItemMainSubContainer}>
              <View>
                <MediumText style={[fontFamilyStyles.smallText]}>{parseFloat(item.AssetAmount).toFixed(8)} {item.AssetCurrencyCode}</MediumText>
                <RegularText style={[fontFamilyStyles.extraSmallText]}>{item.TradeTypeDisplayName}</RegularText>
              </View>
              <View style={pageStyle.contentAlignmentEnd}>
                <MediumText style={[fontFamilyStyles.smallText]}>{this.props.GoalCurrency.CurrencySymbol + item.GoalCurrencyAmount.toFixed(2)}</MediumText>
                <RegularText style={[fontFamilyStyles.extraSmallText]}>{item.Pending ?
                  strings('transactionDetailPage.label_pending') :
                  strings('transactionDetailPage.label_complete')}</RegularText>
              </View>
            </View>
          </View>
        );
      });
    }
  };

  render() {
    const nobColor = !this.props.navigationProps.data?.Pending && !this.props.navigationProps.data?.Failed ? commonTheme.COLOR_PRIMARY :
      this.props.navigationProps.data?.Pending ? commonTheme.COLOR_WARNING :
        this.props.navigationProps.data?.Failed ? commonTheme.COLOR_DANGER :
          commonTheme.COLOR_FADED;
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('transactionDetailPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={pageStyle.historyItemContainer}>
          <View style={[pageStyle.mainContainer, {borderColor: nobColor}]}>
            <View style={[pageStyle.infoContainer]}>
              <View style={pageStyle.flexDirectionStyle}>
                <View style={[pageStyle.statusIndicatorLineStyle, {backgroundColor: nobColor}]}/>
                <View style={pageStyle.transactionTypeContainer}>
                  <MediumText>
                    {this.props.navigationProps.data?.TransactionTypeDisplayName}
                  </MediumText>
                  <RegularText style={pageStyle.tsTypeTextStyle}>
                    {this.props.navigationProps.data?.AssociatedTSTypeDisplayName ?
                      this.props.navigationProps.data?.AssociatedTSTypeDisplayName :
                      this.props.navigationProps.data?.TransactionType === 'Reward' ?
                        this.props.navigationProps.data?.Description :
                        strings('transactionDetailPage.label_cashBalance')}
                  </RegularText>
                </View>
                <View style={pageStyle.contentAlignmentEnd}>
                  <MediumText>
                    {this.props.GoalCurrency.CurrencySymbol + this.props.navigationProps.data?.GoalCurrencyInitialAmount.toFixed(2)}
                  </MediumText>
                  <RegularText style={pageStyle.dateTextStyle}>
                    {this.props.navigationProps.data?.CreatedDate.split(' ')[0]}
                  </RegularText>
                </View>
              </View>
              {!!this.props.navigationProps.data?.GoalCurrencyFeeAmount ?
                <View style={pageStyle.feesContainer}>
                  <RegularText style={[fontFamilyStyles.smallText]}>
                    {strings('transactionDetailPage.label_Fees')}
                  </RegularText>
                  <RegularText style={[fontFamilyStyles.smallText]}>
                    {this.props.GoalCurrency.CurrencySymbol + this.props.navigationProps.data?.GoalCurrencyFeeAmount.toFixed(2)}
                  </RegularText>
                </View> :
                null}
              {!!this.props.navigationProps.data?.AssociatedPIName ?
                <View style={pageStyle.piDisplayNameContainer}>
                  <RegularText style={[fontFamilyStyles.smallText]}>
                    {this.props.navigationProps.data?.AssociatedPIName + ' ( ' + this.props.navigationProps.data?.AssociatedPITypeDisplayName + ' )'}
                  </RegularText>
                </View> :
                null}
            </View>
            {this._renderHistoryDetailItem()}
          </View>
        </View>
      </View>
    );
  }
}
