import React from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import TitleBarModel from '../../../models/title.bar.model';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitleWithSave, DonutChartComponent, ScreenTitleImage, SelectCoinTile, StandardButton } from '../../common/components';
import { pageStyle } from './portfolioAllocationSummary.page.style';

export default class PortfolioAllocationSummaryPage extends BasePage {
  constructor(props) {
    super(props, {
      Currencies: [],
    });

    this._onPressBack = this._onPressBack.bind(this);
    this._onPressCustomize = this._onPressCustomize.bind(this);
    this._onPressDone = this._onPressDone.bind(this);
    this._onDoneCustomize = this._onDoneCustomize.bind(this);
  }

  // here we will build the data to be rendered and wait for the same
  componentDidMount = async (): void => {
    await this._buildAllocationCurrencyData(this.props.navigationProps.Currencies);
  };

  _buildAllocationCurrencyData = async (Currencies) => {
    let data = Currencies.map(currency => {
      return {...currency};
    });

    let dummyViewCount = 3 - data.length % 3;
    for (let counter = 0; counter < dummyViewCount; counter++) {
      data.push({DummyTile: true});
    }

    return new Promise(resolve => {
      this.setState({
        Currencies: data,
      }, () => resolve());
    });
  };

  _onPressDone = async () => {
    // step 1: create goal allocation
    const goalAllocationItemsList = this.state.Currencies
      .filter(currency => !!currency.Percentage)
      .map(currency => ({
        Percentage: currency.Percentage,
        CurrencyCode: currency.CurrencyCode,
      }));
    return interfaces.createGoalAllocation(this.props.GoalDashboard.GoalID, goalAllocationItemsList)
      .then((result) => {
        this.props.storeGoalAllocation(result);
        // return NavigationUtil.resetToStackRoot(this.props.componentId, screenId.OnBoarding.Portfolio.BuildPortfolioStatusPage, {
        //   Currencies: this.state.Currencies.filter(currency => currency.Selected),
        // });
        return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.BuildPortfolioStatusPage, {
          Currencies: this.state.Currencies.filter(currency => currency.Selected),
        });
      })
      .catch(() => null);
  };

  _onDoneCustomize = async (customizedCurrencies: Array<any>) => {
    await this._buildAllocationCurrencyData(customizedCurrencies);
  };

  _onPressCustomize = async () => {
    let data = this.state.Currencies.filter(currency => currency.Selected);
    await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.CustomizeAllocationPage, {
      Currencies: data,
      onDoneCustomize: this._onDoneCustomize,
    });
  };

  _onPressBack = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _getScreenTitle() {
    let titleBar = new TitleBarModel();
    titleBar.title = strings('portfolioAllocationSummaryPage.title');
    titleBar.showBackButton = true;
    titleBar.showRightButton = false;
    titleBar.textColorCode = commonTheme.SECONDARY_TEXT_COLOR_LIGHT;
    titleBar.componentId = this.props.componentId;
    titleBar.backgroundColorCode = commonTheme.COLOR_PRIMARY_DARK;
    return titleBar;
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitleWithSave titleBar={this._getScreenTitle()} onPressBack={this._onPressBack}/>
        <View style={commonStyle.container}>
          <LinearGradient colors={[commonTheme.COLOR_PRIMARY_DARK, commonTheme.COLOR_BRIGHT]}
                          start={{x: 0, y: 0}} end={{x: 0, y: .4}}
                          style={pageStyle.linearGradientStyle}/>
          <FlatList
            bounces={false}
            data={this.state.Currencies}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={pageStyle.flatListContentContainerStyle}
            renderItem={({item}) => this._renderCoinTile(item)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={pageStyle.flatListColumnWrapperStyle}
            ListHeaderComponent={() => this._renderListHeader()}/>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onPressDone}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('portfolioAllocationSummaryPage.label_button_next')}
          />
        </View>
      </View>
    );
  }

  _renderCoinTile = (item: any) => {
    return (
      <View style={pageStyle.renderCoinTileContainerStyle}>
        {item.DummyTile ?
          null :
          <SelectCoinTile CoinBackgroundColor={item.HexCode}
                          Selected={item.Selected}
                          CurrencyURL={`${this.props.CurrencyImageBaseURL}${item.CurrencyCode}/symbol.png`}
                          CurrencyName={item.CurrencyName}/>
        }
      </View>
    );
  };

  _renderListHeader = () => {
    return (
      <View style={pageStyle.renderListHeaderContainerStyle}>
        <View style={pageStyle.donutChartContainerStyle}>
          <DonutChartComponent currenciesData={this.state.Currencies.filter(currency => currency.Selected)}/>
        </View>
        <ScreenTitleImage descriptionText={strings('portfolioAllocationSummaryPage.description')}/>
        <View style={pageStyle.renderHeaderListButtonStyle}>
          <StandardButton width={'45%'} onPress={this._onPressCustomize} color={commonTheme.COLOR_PRIMARY_DARK}
                          labelText={strings('portfolioAllocationSummaryPage.label_button_customize')}/>
        </View>
      </View>
    );
  };
}
