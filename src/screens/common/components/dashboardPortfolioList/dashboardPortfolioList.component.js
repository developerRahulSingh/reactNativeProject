import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import { GoalDashboardCardView } from '../goalDashboardCardView/goalDashboard.cardView.component';
import { MediumText } from '../mediumText/mediumText.component';
import { componentStyle } from './dashboardPortfolioList.style';

export type DashboardPortfolioListProps = {
  dashboardData?: any,
  Currencies?: any,
  CurrencyImageBaseURL?: string,
  allocationData?: any,
  currencySymbol?: string,
  onPressPurchased?: (currencyCode: string)=> void,
  onPressUnPurchased?: (currencyCode: string)=> void,
}

export type DashboardPortfolioListComponentState = {}

class DashboardPortfolioListComponent extends PureComponent<DashboardPortfolioListProps, DashboardPortfolioListComponentState> {

  static defaultProps = {
    dashboardData: null,
    Currencies: null,
    CurrencyImageBaseURL: null,
    allocationData: null,
    currencySymbol: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    let coinsPurchased = this.props.dashboardData.AssetPerformances.map(asset => ({
        ...asset,
        isAllocated: !!this.props.allocationData && !!this.props.allocationData.GoalAllocationItems.find(allocation => allocation.CurrencyCode === asset.CurrencyCode),
      }))
      .sort((asset, asset2) => {
        if (asset.isAllocated && asset2.isAllocated) {
          return 1;
        }
        if (!asset.isAllocated && !asset2.isAllocated) {
          return 1;
        }
        if (asset.isAllocated) {
          return -1;
        }
        if (asset2.isAllocated) {
          return 1;
        }
      })
      .map((asset, index) => {
        let currency = this.props.Currencies.find(curr => curr.CurrencyCode === asset.CurrencyCode);
        return (<View key={`Asset_${index}`} style={[componentStyle.cardViewContainer, {paddingTop: index === 0 ? 0 : 8}]}>
          <GoalDashboardCardView AssetAmount={asset.AssetAmount} Balance={asset.Balance} CurrencyCode={asset.CurrencyCode}
                                 CurrencyImageBaseURL={this.props.CurrencyImageBaseURL} CurrencyName={asset.CurrencyName}
                                 CurrencySymbol={this.props.currencySymbol} HexCode={currency.HexCode} IsAsset={true}
                                 ShowCheckMark={asset.isAllocated}
                                 onPress={() => this.props.onPressPurchased?.(asset.CurrencyCode)}
                                 GoalCurrencyConversionRate={asset.GoalCurrencyConversionRate}
                                 TwentyFourHourAssetPerformancePercentage={asset.TwentyFourHourAssetPerformancePercentage}/>
        </View>);
      });
    let unPurchasedCoins = this.props.dashboardData.UnpurchasedCoins.map((asset, index) => {
      let currency = this.props.Currencies.find(curr => curr.CurrencyCode === asset.CurrencyCode);
      return (<View key={`UnPurchased_${index}`} style={componentStyle.cardViewContainer}>
        <GoalDashboardCardView CurrencyCode={asset.CurrencyCode} CurrencySymbol={this.props.currencySymbol} HexCode={currency.HexCode}
                               onPress={() => this.props.onPressUnPurchased?.(asset.CurrencyCode)}
                               GoalCurrencyConversionRate={asset.GoalCurrencyConversionRate}
                               CurrencyImageBaseURL={this.props.CurrencyImageBaseURL} CurrencyName={asset.CurrencyName}/>
      </View>);
    });

    return (
      <View style={componentStyle.mainContainer}>
        <View style={[componentStyle.coinContainer, !coinsPurchased || coinsPurchased.length === 0 ? {padding: 0} : {}]}>
          {coinsPurchased}
        </View>
        {unPurchasedCoins && unPurchasedCoins.length > 0 ?
          <>
            <View style={componentStyle.moreOptionContainer}>
              <View style={componentStyle.moreOptionSubContainer}>
                <MediumText>
                  {strings('dashboardPortfolioListComponent.label_moreOptions')}
                </MediumText>
              </View>
            </View>
            <View style={componentStyle.coinContainer}>
              {unPurchasedCoins}
            </View>
          </> :
          null}
      </View>
    );
  }
}

export { DashboardPortfolioListComponent };

