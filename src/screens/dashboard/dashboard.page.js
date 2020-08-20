import React from 'react';
import { BackHandler, Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { Freshchat } from 'react-native-freshchat-sdk';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../config/i18/i18n';
import { BuyAssetsFlow } from '../../constants/buy.assets.info.enum';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { CryptoCurrencyLocalModel } from '../../models/cryptocurrency.local.model';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BoldText, DashboardPortfolioListComponent, DonutChartComponent, MediumText, NotchPushComponent, RegularText, StandardButton } from '../common/components';
import { pageStyle } from './dashboard.page.style';

export default class DashboardPage extends BasePage {
  baseCurrencySymbol: string;

  constructor(props) {
    super(props, {
      showDonutView: false,
      refreshing: false,
      isFirstAppear: true,
    }, true);
    this._onPressAssetItem = this._onPressAssetItem.bind(this);
    this._onPressBuySell = this._onPressBuySell.bind(this);
    this._onPressCashBalance = this._onPressCashBalance.bind(this);
    this._onPressUnPurchasedItem = this._onPressUnPurchasedItem.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._showModalForBuySell = this._showModalForBuySell.bind(this);
    this._startInvestNowFlow = this._startInvestNowFlow.bind(this);
    this._toggleDonutView = this._toggleDonutView.bind(this);
    this._updateDashboardData = this._updateDashboardData.bind(this);
  }

  componentDidMount = async (): void => {
    this.props.setDashboardShown(true);
    return this._getUserImage();
  };

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.setDashboardShown(false);
  }

  // this method will be called whenever the component comes in focus / front
  // need to improve this function to call the refresh of data only when the
  // state is considered dirty
  componentDidAppear = async () => {
    super.componentDidAppear();
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed) {
      await interfaces.getGoalAllocation()
        .then((result) => {
          this.props.storeGoalAllocation(result);
        })
        .catch(() => null);
    } else {
      //Goal Allocation data in store
    }
    if (this.state.isFirstAppear) {
      this.setState({
        isFirstAppear: false,
      });
    } else {
      // TODO: add the code to check if dashboard data is invalid then only do a refresh
      //       check this.props.isDashboardDataValid
      return this._updateDashboardData();
    }
  };

  _getUserImage = async () => {
    return interfaces.getUserProfileImage()
      .then((result) => {
        if (!!result.Image && this._isMounted) {
          this.setState({
            user_profile_image: `data:image/png;base64,${result.Image}`,
          });
        }
      })
      .catch(() => null);
  };

  _backButtonHandler = async () => {
    return NavigationUtil.showAlert({
      messageText: strings('dashboardPage.alert_exit_application'),
      alertTitle: strings('dashboardPage.title_exit_application'),
      onLeftButtonPress: () => null,
      onRightButtonPress: () => {
        return this._exitApp();
      },
    });
  };

  _exitApp = async () => {
    Freshchat.resetUser();
    BackHandler.exitApp();
  };

  _startInvestNowFlow = async () => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      if (Object.keys(this.props.GoalAllocation).length === 0) {
        this._showGoalAllocationErrorPopup(false);
        // return NavigationUtil.showAlert({
        //   messageText: strings('common.alert_already_portfolio_allocation'),
        //   alertTitle: strings('common.title_alert_allocation_required'),
        //   leftButtonText: strings('common.label_alert_button_later'),
        //   rightButtonText: strings('common.label_alert_button_Continue'),
        //   onRightButtonPress: async () => {
        //     this.props.removeComponentID();
        //     await interfaces.getGoalAllocation()
        //       .then(async (result) => {
        //         this.props.storeGoalAllocation(result);
        //         return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Investment.InvestmentAmountPage);
        //       })
        //       .catch(async () => {
        //         await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.BuildPortfolioPage);
        //       });
        //   },
        //   onLeftButtonPress: () => null,
        // });
      } else {
        return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Investment.InvestmentAmountPage);
      }
    }
  };

  _onRefresh = async () => {
    this.setState({
      refreshing: true,
    }, () => {
      return this._updateDashboardData();
    });
  };

  _updateDashboardData = async () => {
    return interfaces.getGoalDashboard()
      .then((result) => {
        this.props.storeUserData({GoalDashboard: result});
        this.setState({
          refreshing: false,
        });
      })
      .catch(() => {
        this.setState({
          refreshing: false,
        });
      });
  };

  _showModalForBuySell = (propsData) => {
    return NavigationUtil.showAlert({
      messageText: strings('dashboardPage.alert_sell_buy_assets'),
      leftButtonText: strings('dashboardPage.label_button_sell'),
      rightButtonText: strings('dashboardPage.label_button_buy'),
      onRightButtonPress: () => {
        return this._onPressBuySell(propsData, 'buySingle');
      },
      onLeftButtonPress: () => {
        return this._onPressBuySell(propsData, 'sellSingle');
      },
      onDismiss: () => null,
    });
  };

  _onPressBuySell = async (coinInfo, purpose: string) => {
    if (this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false) {
      return this._showAggregateKycStatusErrorPopup(false);
    } else {
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.CoinInfoPage, {
        AssetAmount: coinInfo.AssetAmount,
        AssetCurrencyCode: coinInfo.CurrencyCode,
        Balance: coinInfo.Balance,
        GoalCurrencyConversionRate: coinInfo.GoalCurrencyConversionRate,
        purpose: purpose,
      });
    }
  };

  _toggleDonutView = async () => {
    return new Promise((resolve) => {
      this.setState({
        showDonutView: !this.state.showDonutView,
      }, () => {
        resolve();
      });
    });
  };

  _onPressCashBalance = async () => {
    let navigationProps = {
      cashBalance: this.props.GoalDashboard.CashBalance,
      flowType: BuyAssetsFlow.CashBalance,
    };
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.CashBalanceActionsPage, navigationProps);
  };

  _selectCoinOptionsPopup = async (isPurchasedCoin: boolean, currencyCode: string) => {
    let coinInfo = {};
    if (isPurchasedCoin) {
      let purchasedAsset = this.props.GoalDashboard.AssetPerformances.find(curr => curr.CurrencyCode === currencyCode);
      coinInfo = {
        AssetAmount: isPurchasedCoin ? purchasedAsset.AssetAmount : 0,
        Balance: isPurchasedCoin ? purchasedAsset.Balance : 0,
        CurrencyCode: currencyCode,
        GoalCurrencyConversionRate: purchasedAsset.GoalCurrencyConversionRate,
      };
    } else {
      let unPurchasedAsset = this.props.GoalDashboard.UnpurchasedCoins.find(curr => curr.CurrencyCode === currencyCode);
      coinInfo = {
        AssetAmount: 0,
        Balance: 0,
        CurrencyCode: currencyCode,
        GoalCurrencyConversionRate: unPurchasedAsset.GoalCurrencyConversionRate,
      };
    }

    let items = [strings('dashboardPage.label_button_deposit'), strings('dashboardPage.label_button_buy')];

    if (isPurchasedCoin) {
      items.push(strings('dashboardPage.label_button_sell'));
    }

    return NavigationUtil.showOverlay(screenId.Overlays.SimpleSelector, {
      items: items.map(item => ({
        label: item,
        key: item,
        selected: false,
      })),
      onItemSelected: (selectedItem) => {
        switch (selectedItem.key) {
          case strings('dashboardPage.label_button_buy'):
            return this._onPressBuySell(coinInfo, 'buySingle');
          case strings('dashboardPage.label_button_deposit'):
            return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.BuySellAssets.DepositCoinPage, {
              AssetAmount: coinInfo.AssetAmount,
              AssetCurrencyCode: coinInfo.CurrencyCode,
              Balance: coinInfo.Balance,
              GoalCurrencyConversionRate: coinInfo.GoalCurrencyConversionRate,
              purpose: 'depositSingle',
            });
          case strings('dashboardPage.label_button_sell'):
            return this._onPressBuySell(coinInfo, 'sellSingle');
          default:
            return;
        }
      },
    });
  };

  _onPressAssetItem = async (currencyCode: string) => {
    let asset = this.props.GoalDashboard.AssetPerformances.find(curr => curr.CurrencyCode === currencyCode);
    let coinInfo = {
      AssetAmount: asset.AssetAmount,
      Balance: asset.Balance,
      CurrencyCode: currencyCode,
      GoalCurrencyConversionRate: asset.GoalCurrencyConversionRate,
    };

    return this._showModalForBuySell(coinInfo);
  };

  _onPressUnPurchasedItem = async (currencyCode: string) => {
    let asset = this.props.GoalDashboard.UnpurchasedCoins.find(curr => curr.CurrencyCode === currencyCode);
    let coinInfo = {
      AssetAmount: 0,
      Balance: 0,
      CurrencyCode: currencyCode,
      GoalCurrencyConversionRate: asset.GoalCurrencyConversionRate,
    };

    return this._onPressBuySell(coinInfo, 'buySingle');
  };

  _gotoProfile = async () => {
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.UserProfile.Page);
  };

  _portFolioInformationRow = (style: any, firstTitle: string, secondTitle: string, firstValueStyle: any, firstValuePrecisionStyle: any, firstValue: string, firstValuePrecision: string, secondValue: string, upDownIndicatorImage: any) => {
    return (
      <View style={[pageStyle.portfolioInfoRowCommonContainer, style]}>
        <View style={[pageStyle.portfolioInfoStaticLabelRowContainer, pageStyle.portfolioInfoDynamicLabelRowContainer]}>
          <RegularText>{firstTitle}</RegularText>
          <RegularText>{secondTitle}</RegularText>
        </View>
        <View style={pageStyle.portfolioInfoDynamicLabelRowContainer}>
          <BoldText style={firstValueStyle}>
            {firstValue}
            <BoldText style={firstValuePrecisionStyle}>{firstValuePrecision}</BoldText>
          </BoldText>
          <View style={pageStyle.portfolioInfoRowSecondValueContainer}>
            <BoldText style={pageStyle.portfolioInfoRowSecondValueTextStyle}>{secondValue}</BoldText>
            <Image style={pageStyle.gainImageStyle} resizeMode='contain' source={upDownIndicatorImage}/>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let currentValue = this.props.GoalDashboard.Balance ? this.props.GoalDashboard.Balance : 0;
    let currentValueParts = currentValue.toFixed(2).split('.');
    let investedValue = this.props.GoalDashboard.AmountInvested ? this.props.GoalDashboard.AmountInvested : 0;
    let investedValueParts = investedValue.toFixed(2).split('.');
    this.baseCurrencySymbol = this.props.GoalCurrency.CurrencySymbol;
    // build the data for chart
    let donutChartData = this.props.GoalDashboard.AssetPerformances.map((asset) => {
      let currencyLocalModel = new CryptoCurrencyLocalModel();
      currencyLocalModel.flagURL = this.props.CurrencyImageBaseURL;
      currencyLocalModel.Percentage = asset.AssetPercentage.toFixed(0);
      currencyLocalModel.hexCode = this.props.Currencies.find(curr => curr.CurrencyCode === asset.CurrencyCode).HexCode;
      currencyLocalModel.currencyCode = asset.CurrencyCode;
      return currencyLocalModel;
    });

    // add the cash balance information in the chart data
    donutChartData = [{
      flagURL: this.props.CurrencyImageBaseURL,
      Percentage: this.props.GoalDashboard.CashAssetPercentage.toFixed(0),
      hexCode: commonTheme.COLOR_LIGHT,
      currencyCode: this.props.GoalDashboard.GoalCurrencyCode,
    }, ...donutChartData];

    return (
      <View style={commonStyle.container}>
        <View style={pageStyle.userInfoContainerStyle}>
          <NotchPushComponent/>
          <View style={pageStyle.userInfoSubContainerStyle}>
            <View
              style={[pageStyle.kycStatusIndicatorStyle, {backgroundColor: this.props.UserSignupRegistrationInfo.AggregateKYCPassed === false ? commonTheme.COLOR_DANGER : commonTheme.COLOR_SUCCESS}]}/>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              if (this.props.User.Level === 'Standard') {
                // goto VIP program info screen
                return NavigationUtil.gotoScreen(this.props.componentId, screenId.Common.UpgradeToVIPPage);
              } else {
                return null;
              }
            }}>
              <MediumText style={pageStyle.userNameTextStyle}>{this.props.User.FirstName || this.props.User.FullName}</MediumText>
              <RegularText style={pageStyle.userLevelTextStyle}>
                {this.props.User.Level}{this.props.User.Level === 'Standard' ?
                <BoldText style={pageStyle.upgradeNowTextStyle}>
                  {' ' + strings('common.label_upgrade_now')}
                </BoldText> :
                null}
              </RegularText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._gotoProfile} style={pageStyle.userProfilePictureButtonContainer}>
              <View style={pageStyle.userProfilePictureWithArrowImageContainer}>
                <View style={pageStyle.userProfilePictureContainer}>
                  {!this.state.user_profile_image ?
                    <Image style={pageStyle.userImageStyle} source={require('../../assets/screen_image_profile.png')}/> :
                    <Image style={pageStyle.userImageStyle} source={{uri: this.state.user_profile_image}}/>
                  }
                </View>
                <Image style={pageStyle.arrowImageStyle} source={require('../../assets/next_arrow_blue.png')}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={pageStyle.contentContainerStyle}>
          <LinearGradient colors={[commonTheme.COLOR_PRIMARY_DARK, commonTheme.COLOR_BRIGHT]}
                          start={{x: 0, y: 0}} end={{x: 0, y: .4}}
                          style={pageStyle.linearGradientView}/>
          <ScrollView automaticallyAdjustContentInsets={false} bounces={true} showsVerticalScrollIndicator={false}
                      contentContainerStyle={pageStyle.keyboardScrollViewContentContainer}
                      refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>
                      }>
            <View style={pageStyle.portfolioInfoMainContainer}>
              {this._portFolioInformationRow(pageStyle.currentReturnValueInfoContainer,
                strings('dashboardPage.label_currentValue'),
                strings('dashboardPage.label_return'),
                pageStyle.currentValueTextStyle,
                {},
                `${this.baseCurrencySymbol}${currentValueParts[0]}`,
                `.${currentValueParts[1]}`,
                this.props.GoalDashboard.Return === null ? 0 : parseFloat(this.props.GoalDashboard.Return).toFixed(2) + '%',
                this.props.GoalDashboard.Gain > 0 ? require('../../assets/gain.png') : require('../../assets/return.png'),
              )}
              {this._portFolioInformationRow(pageStyle.investGainValueInfoContainer,
                strings('dashboardPage.label_invested'),
                strings('dashboardPage.label_gain'),
                {},
                pageStyle.investValueTextStyle,
                `${this.baseCurrencySymbol}${investedValueParts[0]}`,
                `.${investedValueParts[1]}`,
                `${this.baseCurrencySymbol}${parseFloat(this.props.GoalDashboard.Gain).toFixed(2)}`,
                this.props.GoalDashboard.Gain > 0 ? require('../../assets/gain.png') : require('../../assets/return.png'),
              )}
              <View style={pageStyle.headerButton}>
                <StandardButton
                  onPress={this._startInvestNowFlow}
                  color={commonTheme.COLOR_SECONDARY}
                  labelText={strings('dashboardPage.label_button_invest_now')}
                />
              </View>
            </View>
            <View style={[pageStyle.myPortfolioContainer, pageStyle.portfolioInfoDynamicLabelRowContainer]}>
              <View style={pageStyle.myPortfolioLabelContainer}>
                <MediumText>
                  {strings('dashboardPage.label_myPortfolio')}
                </MediumText>
              </View>
              <TouchableOpacity onPress={this._toggleDonutView}>
                <Image style={pageStyle.chartToggleImageStyle}
                       source={this.state.showDonutView ? require('../../assets/show_list_view.png') : require('../../assets/show_donut_view.png')}/>
              </TouchableOpacity>
            </View>
            {/* Assets List View */}
            <View style={{display: !this.state.showDonutView ? 'flex' : 'none'}}>
              {/* Cash Balance View */}
              <View style={pageStyle.cashBalanceViewContainer}>
                <TouchableOpacity style={pageStyle.cashBalanceViewSubContainer} onPress={() => this._onPressCashBalance()}>
                  <View style={pageStyle.cashBalanceViewRowContainer}>
                    <View style={pageStyle.portfolioInfoDynamicLabelRowContainer}>
                      <MediumText>
                        {strings('dashboardPage.label_cashBalance')}
                      </MediumText>
                      <MediumText>
                        {this.baseCurrencySymbol}{this.props.GoalDashboard.CashBalance.toFixed(2)}
                      </MediumText>
                    </View>
                  </View>
                  {/* This view will be enabled later once we have the currency change option for the user */}
                  <View style={pageStyle.cashBalanceArrowContainer}>
                    <Image style={pageStyle.cashBalanceArrowImageStyle} resizeMode={'contain'} source={require('../../assets/next_arrow_blue.png')}/>
                    {/*<MediumText>*/}
                    {/*  {this.props.GoalDashboard.GoalCurrencyCode}*/}
                    {/*</MediumText>*/}
                  </View>
                </TouchableOpacity>
              </View>
              <DashboardPortfolioListComponent dashboardData={this.props.GoalDashboard}
                                               Currencies={this.props.Currencies}
                                               CurrencyImageBaseURL={this.props.CurrencyImageBaseURL}
                                               allocationData={Object.keys(this.props.GoalAllocation).length === 0 ? null : this.props.GoalAllocation}
                                               currencySymbol={this.baseCurrencySymbol}
                                               onPressPurchased={(currencyCode) => this._selectCoinOptionsPopup(true, currencyCode)}
                                               onPressUnPurchased={(currencyCode) => this._selectCoinOptionsPopup(false, currencyCode)}/>
            </View>
            {/* Assets Donut View */}
            <View style={[pageStyle.donutChartContainer, {display: this.state.showDonutView ? 'flex' : 'none'}]}>
              {donutChartData && donutChartData.length > 0 ?
                <DonutChartComponent currenciesData={donutChartData}/> :
                (<View style={commonStyle.bottomButtonContainer}>
                  <RegularText>
                    {strings('dashboardPage.error_no_coin_portfolio')}
                  </RegularText>
                </View>)}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
