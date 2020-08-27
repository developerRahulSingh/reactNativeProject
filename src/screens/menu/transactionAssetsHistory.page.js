import React from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import fontFamilyStyles from '../../styles/font.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, BoldText, LabeledInfoBlockComponent, MediumText, RegularText } from '../common/components';
import { pageStyle } from './transactionAssetsHistory.page.style';

export default class TransactionAssetsHistoryPage extends BasePage {

  constructor(props) {
    super(props, {
      assetTransactions: [],
      isFetchingData: false,
      selectedCurrency: {},
    });
    this.currentPageNumber = 0;
    this.onEndReachedCalledDuringMomentum = true;
    this.totalPages = -1;
  }

  componentDidMount = async () => {
    this.setState({
      selectedCurrency: this.props.Currencies[0],
    }, () => {
      return this._getAssetTransactions(this.state.selectedCurrency.CurrencyCode);
    });
  };

  _onReachedEndOfList = () => {
    if (!this.state.isFetchingData && !this.onEndReachedCalledDuringMomentum && this.totalPages !== this.currentPageNumber) {
      this.onEndReachedCalledDuringMomentum = true;
      return this._getAssetTransactions(this.state.selectedCurrency.CurrencyCode);
    }
  };

  _getAssetTransactions = async (currencyCode: string) => {
    this.setState({
      isFetchingData: true,
    });
    return interfaces.getAssetTransferTransactionHistory(currencyCode, this.currentPageNumber + 1, 20)
      .then((result) => {
        this.setState({
          assetTransactions: [...this.state.assetTransactions, ...result.AssetTransferTransactions.Rows],
          isFetchingData: false,
        }, () => {
          this.currentPageNumber = result.AssetTransferTransactions.PageNumber;
          this.totalPages = result.AssetTransferTransactions.TotalPages;
        });
      })
      .catch(() => {
        this.setState({
          isFetchingData: false,
        }, () => {
          this.totalPages = this.totalPages === -1 ? 0 : this.totalPages;
        });
      });
  };

  _renderFooterOfList = () => {
    if (!!this.state.isFetchingData) {
      return (
        <View style={pageStyle.listContentContainerStyle}>
          <ActivityIndicator
            size="large"
            color={commonTheme.COLOR_PRIMARY_DARK}
          />
        </View>
      );
    } else {
      return <></>;
    }
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onRefresh = async (currencyCode: string) => {
    this.currentPageNumber = 0;
    this.onEndReachedCalledDuringMomentum = true;
    this.totalPages = -1;
    this.setState({
      assetTransactions: [],
      isFetchingData: false,
    }, () => {
      return this._getAssetTransactions(currencyCode);
    });
  };

  _assetTransactionItemPressed = async (item) => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.TransactionAssetsEditPage, {
      assetData: item,
      selectedCurrency: this.state.selectedCurrency,
      onRefresh: this._onRefresh,
    });
  };

  _onAssetSelect = async () => {
    await NavigationUtil.showOverlay(screenId.Overlays.AssetSelector, {
      itemData: {CurrencyFlagBaseURL: this.props.CurrencyImageBaseURL, Currencies: this.props.Currencies},
      onItemSelected: this._onCurrencySelected,
    });
  };

  _onCurrencySelected = async (data) => {
    //Reset initial value
    this.currentPageNumber = 0;
    this.onEndReachedCalledDuringMomentum = true;
    this.totalPages = -1;
    this.setState({
      assetTransactions: [],
      isFetchingData: false,
      selectedCurrency: data,
    }, () => {
      return this._getAssetTransactions(data.CurrencyCode);
    });
  };

  _noItemDisplay = () => {
    return (
      <View style={pageStyle.noItemDisplayContainer}>
        <RegularText style={pageStyle.noItemDisplayTextStyle}>
          {strings('transactionAssetsHistoryPage.label_no_transaction_history')}
        </RegularText>
      </View>
    );
  };

  _renderHistoryItem = (item) => {
    return (
      <View style={pageStyle.historyItemContainer}>
        <TouchableOpacity
          onPress={() => this._assetTransactionItemPressed(item)}
          activeOpacity={0.8}
          style={[pageStyle.historyItem]}>
          <View style={[pageStyle.statusIndicatorLineStyle]}/>
          <View style={pageStyle.transactionTypeContainer}>
            <BoldText style={[fontFamilyStyles.largeText]}>
              {item.CurrencyCode}
            </BoldText>
            <RegularText>
              {strings('transactionAssetsHistoryPage.label_basic_cost') + this.props.GoalCurrency.CurrencySymbol + item.CostBasisInUSD}
            </RegularText>
          </View>
          <View style={pageStyle.transactionTypeDetailContainer}>
            <MediumText>
              {this.props.GoalCurrency.CurrencySymbol + item.Amount.toFixed(2)}
            </MediumText>
            <RegularText style={pageStyle.dateTextStyle}>
              {item.AcquisitionDate}
            </RegularText>
          </View>
          <View style={pageStyle.arrowImageContainer}>
            <Image style={[pageStyle.arrowImageStyle, pageStyle.arrowImageSubContainer]} resizeMode={'contain'} source={require('../../assets/next_arrow_blue.png')}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('transactionAssetsHistoryPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[pageStyle.selectAssetButtonContainer]}
          onPress={this._onAssetSelect}>
          <LabeledInfoBlockComponent showAsDropdown title={strings('transactionAssetsHistoryPage.label_select_asset')} value={this.state.selectedCurrency.CurrencyName}/>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={pageStyle.listContentContainerStyle}
          data={this.state.assetTransactions}
          showsVerticalScrollIndicator={false}
          onEndReached={this._onReachedEndOfList}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          ListFooterComponent={this._renderFooterOfList}
          ListEmptyComponent={this._noItemDisplay}
          renderItem={({item}) => this._renderHistoryItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
