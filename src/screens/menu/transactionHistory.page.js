import React from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, MediumText, RegularText } from '../common/components';
import { pageStyle } from './transactionHistory.page.style';

export default class TransactionHistoryPage extends BasePage {

  constructor(props) {
    super(props, {
      transactions: [],
      isFetchingData: false,
    });
    this.currentPageNumber = 0;
    this.onEndReachedCalledDuringMomentum = true;
    this.totalPages = -1;
  }

  componentDidMount = async () => {
    return this._getTransactions();
  };

  _onReachedEndOfList = () => {
    if (!this.state.isFetchingData && !this.onEndReachedCalledDuringMomentum && this.totalPages !== this.currentPageNumber) {
      this.onEndReachedCalledDuringMomentum = true;
      return this._getTransactions();
    }
  };

  _getTransactions = async () => {
    this.setState({
      isFetchingData: true,
    });
    return interfaces.getUserTransactionHistory(this.currentPageNumber + 1, 20)
      .then((result) => {
        this.setState({
          transactions: [...this.state.transactions, ...result.Transactions.Rows],
          isFetchingData: false,
        }, () => {
          this.currentPageNumber = result.Transactions.PageNumber;
          this.totalPages = result.Transactions.TotalPages;
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

  _transactionItemPressed = async (item) => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Menu.TransactionDetailPage, {data: item});
  };

  _noItemDisplay = () => {
    return (
      <View style={pageStyle.noItemDisplayContainer}>
        <RegularText style={pageStyle.noItemDisplayTextStyle}>
          {strings('transactionHistoryPage.label_no_transaction_history')}
        </RegularText>
      </View>
    );
  };

  _renderHistoryItem = (item) => {
    const nobColor = !item.Pending && !item.Failed ? commonTheme.COLOR_PRIMARY :
      item.Pending ? commonTheme.COLOR_WARNING :
        item.Failed ? commonTheme.COLOR_DANGER :
          commonTheme.COLOR_FADED;
    let transactionTypeName = '';
    if (item.AssociatedTSTypeDisplayName) {
      transactionTypeName = item.AssociatedTSTypeDisplayName;
    } else {
      if (item.TransactionType === 'Reward') {
        transactionTypeName = item.Description;
      } else if (item.TransactionType === 'Transfer In') {
        transactionTypeName = `${strings('transactionHistoryPage.label_assets')} (${item.AssetTrades[0].AssetCurrencyCode})`;
      } else {
        transactionTypeName = strings('transactionHistoryPage.label_cashBalance');
      }
    }

    return (
      <View style={pageStyle.historyItemContainer}>
        <TouchableOpacity
          onPress={() => this._transactionItemPressed(item)}
          activeOpacity={0.8}
          style={[pageStyle.historyItem, {borderColor: nobColor}]}>
          <View style={[pageStyle.statusIndicatorLineStyle, {backgroundColor: nobColor}]}/>
          <View style={pageStyle.transactionTypeContainer}>
            <MediumText>
              {item.TransactionTypeDisplayName}
            </MediumText>
            <RegularText style={pageStyle.tsTypeTextStyle}>{transactionTypeName}</RegularText>
          </View>
          <View style={pageStyle.transactionTypeDetailContainer}>
            <MediumText>
              {this.props.GoalCurrency.CurrencySymbol + item.GoalCurrencyInitialAmount.toFixed(2)}
            </MediumText>
            <RegularText style={pageStyle.dateTextStyle}>
              {item.CreatedDate.split(' ')[0]}
            </RegularText>
          </View>
          <View style={pageStyle.arrowImageContainer}>
            <Image style={[pageStyle.arrowImageStyle, pageStyle.arrowImageSubContainer, {tintColor: nobColor}]} resizeMode={'contain'}
                   source={require('../../assets/next_arrow_blue.png')}/>
          </View>
        </TouchableOpacity>
      </View>);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('transactionHistoryPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <FlatList
          contentContainerStyle={pageStyle.listContentContainerStyle}
          data={this.state.transactions}
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
