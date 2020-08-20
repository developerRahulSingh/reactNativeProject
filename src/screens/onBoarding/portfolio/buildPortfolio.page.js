import React from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import TitleBarModel from '../../../models/title.bar.model';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitleWithSave, ScreenTitleImage, SelectCoinTile, StandardButton } from '../../common/components';
import { pageStyle } from './buildPortfolio.page.style';

export default class BuildPortfolioPage extends BasePage {
  constructor(props) {
    super(props, {
      enableNextBtn: false,
      Currencies: [],
    });

    this._onSelectionToggle = this._onSelectionToggle.bind(this);
    this._onNextButtonClicked = this._onNextButtonClicked.bind(this);
  }

  // here we will build the data to be rendered and wait for the same
  componentDidMount = async (): void => {
    await this._buildAllocationCurrencyData();
  };

  // this function setup the initial currency data for user to select and puts that in the state
  _buildAllocationCurrencyData = async () => {
    let data = this.props.Currencies.map(currency => {
      return {...currency, Selected: false, DummyTile: false};
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

  _onNextButtonClicked = async () => {
    const selectedCoins = this.state.Currencies.filter(currency => currency.Selected).length;
    let averagePercentage = Math.floor(100 / selectedCoins);
    let floatingPercentage = 100 - (averagePercentage * selectedCoins);

    let data = this.state.Currencies.filter(currency => currency.Selected);
    data.forEach(currency => {
      if (floatingPercentage > 0) {
        currency.Percentage = averagePercentage + 1;
        floatingPercentage--;
      } else {
        currency.Percentage = averagePercentage;
      }
      currency.flagURL = this.props.CurrencyImageBaseURL;
      currency.hexCode = currency.HexCode;
      currency.currencyCode = currency.CurrencyCode;
    });

    // await NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.Portfolio.PortfolioAllocationSummaryPage, {
    //   Currencies: data,
    // });
    await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.Portfolio.PortfolioAllocationSummaryPage, {
      Currencies: data,
    });
  };

  _onSelectionToggle = async (index: number) => {
    this.state.Currencies[index].Selected = !this.state.Currencies[index].Selected;
    if (this.state.Currencies.find(currency => !currency.DummyTile && currency.Selected)) {
      this.setState({
        Currencies: this.state.Currencies,
        enableNextBtn: true,
      });
    } else {
      this.setState({
        Currencies: this.state.Currencies,
        enableNextBtn: false,
      });
    }
  };

  _onPressBack = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _getScreenTitle() {
    let titleBar = new TitleBarModel();
    titleBar.title = strings('buildPortfolioPage.title');
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
                          style={pageStyle.linearStyle}/>
          <FlatList
            bounces={false}
            data={this.state.Currencies}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => this._renderCoinTile(item, index)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={pageStyle.flatListStyle}
            ListHeaderComponent={() => this._renderListHeader()}/>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClicked}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('buildPortfolioPage.label_button_next')}
          />
        </View>
      </View>
    );
  }

  _renderCoinTile = (item: any, index: number) => {
    return (
      <View style={pageStyle.renderCoinTileStyle}>
        {item.DummyTile ?
          null :
          <SelectCoinTile CoinBackgroundColor={item.HexCode}
                          Selected={item.Selected}
                          onSelectionToggle={() => this._onSelectionToggle(index)}
                          CurrencyURL={`${this.props.CurrencyImageBaseURL}${item.CurrencyCode}/symbol.png`}
                          CurrencyName={item.CurrencyName}/>
        }
      </View>
    );
  };

  _renderListHeader = () => {
    return (
      <View style={pageStyle.renderListHeaderStyle}>
        <ScreenTitleImage imageAsset={require('../../../assets/coinPileCircle3x.png')}
                          descriptionText={strings('buildPortfolioPage.description')}/>
      </View>
    );
  };
}
