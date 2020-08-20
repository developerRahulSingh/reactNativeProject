import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { MediumText } from '../mediumText/mediumText.component';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './goalDashboard.cardView.style';

export type GoalDashboardCardViewProps = {
  AssetAmount: number,
  Balance: number,
  CurrencyCode: string,
  CurrencyImageBaseURL: string,
  CurrencyName: string,
  CurrencySymbol: string,
  GoalCurrencyConversionRate: number,
  HexCode: string,
  IsAsset: boolean,
  onPress: (any)=> void,
  ShowCheckMark: boolean,
  TwentyFourHourAssetPerformancePercentage: number,
}

export type GoalDashboardCardViewState = {}


class GoalDashboardCardView extends PureComponent<GoalDashboardCardViewProps, GoalDashboardCardViewState> {

  static defaultProps = {
    AssetAmount: 0,
    Balance: 0,
    CurrencyCode: '',
    CurrencyImageBaseURL: '',
    CurrencyName: '',
    CurrencySymbol: '',
    GoalCurrencyConversionRate: 0,
    HexCode: commonTheme.COLOR_BRIGHT,
    IsAsset: false,
    ShowCheckMark: false,
    TwentyFourHourAssetPerformancePercentage: 0,
  };

  constructor(props) {
    super(props);
  }

  buildCard = () => {
    return (
      <View style={[componentStyle.mainContainer, {
        borderColor: this.props.ShowCheckMark ? commonTheme.COLOR_SUCCESS : commonTheme.COLOR_LIGHTEST,
      }]}>
        <View style={componentStyle.contentContainer}>
          <View style={[componentStyle.coinImageContainer, {backgroundColor: this.props.HexCode}]}>
            <Image style={componentStyle.coinImage}
                   source={{uri: `${this.props.CurrencyImageBaseURL}${this.props.CurrencyCode}/symbol.png`}}/>
          </View>
          <View style={[componentStyle.contentContainer, componentStyle.contentSubContainer]}>
            <View style={componentStyle.coinInfoContainer}>
              {!!this.props.AssetAmount ?
                <View>
                  <MediumText>
                    {this.props.AssetAmount.toFixed(8) + ' ' + this.props.CurrencyCode}
                  </MediumText>
                  <RegularText style={componentStyle.rateText}>
                    {this.props.CurrencyName} ({this.props.CurrencySymbol}{parseFloat(this.props.GoalCurrencyConversionRate).toFixed(2)})
                  </RegularText>
                </View> :
                <View>
                  <MediumText>
                    {this.props.CurrencyName}
                    <RegularText style={componentStyle.coinRateCurrencySymbolText}>
                      {' ('}{this.props.CurrencyCode})
                    </RegularText>
                  </MediumText>
                  <RegularText style={componentStyle.rateText}>
                    {this.props.CurrencySymbol}{parseFloat(this.props.GoalCurrencyConversionRate).toFixed(2)}
                  </RegularText>
                </View>
              }
            </View>
            {!this.props.AssetAmount ?
              // <TouchableOpacity onPress={this.props.onPress}>
              //   <View style={componentStyle.buyNowButtonContainer}>
              //     <RegularText
              //       style={componentStyle.buyNowButtonText}>
              //       {strings('goalDashboardCardViewComponent.label_button_buy_now')}
              //     </RegularText>
              //   </View>
              // </TouchableOpacity>
              null :
              <View style={componentStyle.coinInfoConditionalContainer}>
                <MediumText
                  style={componentStyle.coinBalanceText}>
                  {typeof (this.props.Balance) !== 'undefined' ? this.props.CurrencySymbol + parseFloat(this.props.Balance).toFixed(2) : ''}
                </MediumText>
                <View style={componentStyle.percentagePerformanceContainer}>
                  <RegularText style={[componentStyle.percentagePerformanceText, {
                    color: this.props.TwentyFourHourAssetPerformancePercentage > 0 ? commonTheme.PASSWORD_STRONG : commonTheme.PASSWORD_WEAK,
                  }]}>
                    {parseFloat(this.props.TwentyFourHourAssetPerformancePercentage).toFixed(2) + '% '}
                  </RegularText>
                  <View>
                    <Image
                      source={this.props.TwentyFourHourAssetPerformancePercentage >= 0 ? require('../../../../assets/gain.png') : require('../../../../assets/return.png')}
                      style={componentStyle.gainReturnImage}
                    />
                  </View>
                </View>
              </View>
            }
          </View>
        </View>
        <View style={[componentStyle.coinCheckMarkContainer, {display: this.props.ShowCheckMark ? 'flex' : 'none'}]}>
          <Image style={[componentStyle.coinCheckMarkImage, {display: this.props.ShowCheckMark ? 'flex' : 'none'}]}
                 source={require('../../../../assets/coinCardCheck.png')}/>
        </View>
      </View>
    );
  };

  render() {
    return (
      // this.props.IsAsset ?
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={.8}>
        {this.buildCard()}
      </TouchableOpacity>
      // : (this.buildCard())
    );
  }
}

export { GoalDashboardCardView };

