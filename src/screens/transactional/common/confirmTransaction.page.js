import PropTypes from 'prop-types';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import { BuyAssetsInfoType } from '../../../constants/buy.assets.info.enum';
import DepositInfoType from '../../../constants/deposit.info.enum';
import paymentInstrumentDisplayName from '../../../constants/payment.instrument.display.name.enum';
import screenId from '../../../constants/screen.id.enum';
import SellAssetsInfoType from '../../../constants/sellAssets/sell.assets.info.enum';
import { WithdrawInfoType } from '../../../constants/withdraw.info.enum';
import interfaces from '../../../interfaces';
import { BuyAssetEntity, BuyAssetsInfoEntity, DepositEntity, DepositInfoEntity, SellAssetsInfoEntity, TSTypeEntity, WithdrawInfoEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, LightText, RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './confirmTransaction.page.style';

const propTypes = {transactionAmount: PropTypes.any};
const defaultProps = {transactionAmount: 0};

export default class ConfirmTransactionPage extends BasePage {

  constructor(props) {
    super(props);
  }

  _investUsingCashBalance = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let buyAssetsInfo = new BuyAssetsInfoEntity();
        buyAssetsInfo.BuyAssetsInfoType = BuyAssetsInfoType.GoalAllocation;
        buyAssetsInfo.GoalAllocationCashAmount = this.props.navigationProps.transactionAmount;
        buyAssetsInfo.GoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        await interfaces.buyAssets(buyAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _onShowTransactionInstructionsOverlay = async (depositResult: DepositEntity) => {
    await NavigationUtil.showOverlay(screenId.Overlays.TransactionInstructions, {
      depositResult,
      onDone: () => {
        return NavigationUtil.reset(this.props.componentId);
      },
      onCancel: () => {
        return interfaces.cancelDeposit(depositResult.DepositTransactionID)
          .then(() => {
            if (!depositResult.IsPreviousPendingDeposit) {
              return NavigationUtil.reset(this.props.componentId);
            }
          });
      },
      onPaid: () => {
        return interfaces.markDepositAsInitiatedPayment(depositResult.DepositTransactionID)
          .then(() => {
            if (!depositResult.IsPreviousPendingDeposit) {
              return NavigationUtil.reset(this.props.componentId);
            }
          });
      },
    });
  };

  _investUsingDeposit = async (selectedTSType: TSTypeEntity) => {
    return new Promise(async (resolve, reject) => {
      try {
        let depositInfo = new DepositInfoEntity();
        depositInfo.DepositInfoType = DepositInfoType.DepositFunds;
        depositInfo.PIID = this.props.navigationProps.paymentInstrument?.PIID;
        depositInfo.PIName = this.props.navigationProps.paymentInstrument?.AcctDisplayName;
        depositInfo.PISourceCurrencyAmount = this.props.navigationProps.transactionAmount;
        depositInfo.PISourceCurrencyCode = this.props.GoalCurrency.CurrencyCode;
        depositInfo.PITypeName = this.props.navigationProps.piType?.PIType.PITypeName;
        depositInfo.TSTypeName = selectedTSType.TSTypeName;
        depositInfo.PIRequiredFieldValues = [];

        let buyAssetsInfo = new BuyAssetsInfoEntity();
        buyAssetsInfo.BuyAssetsInfoType = BuyAssetsInfoType.DepositGoalAllocation;
        buyAssetsInfo.GoalAllocationCashAmount = 0;
        buyAssetsInfo.GoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        await interfaces.deposit(depositInfo, buyAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _buySingleAssetUsingCashBalance = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let buyAssetEntityData = new BuyAssetEntity();
        buyAssetEntityData.BuyAssetCurrencyCode = this.props.navigationProps.AssetCurrencyCode;
        buyAssetEntityData.CashAmount = this.props.navigationProps.transactionAmount;
        buyAssetEntityData.CashGoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        let buyAssetsInfo = new BuyAssetsInfoEntity();
        buyAssetsInfo.BuyAssetsInfoType = BuyAssetsInfoType.SingleAsset;
        buyAssetsInfo.BuyAssets = [buyAssetEntityData];

        await interfaces.buyAssets(buyAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _buySingleAssetUsingDeposit = async (selectedTSType: TSTypeEntity) => {
    return new Promise(async (resolve, reject) => {
      try {
        let depositInfo = new DepositInfoEntity();
        depositInfo.DepositInfoType = DepositInfoType.DepositFunds;
        depositInfo.PIID = this.props.navigationProps.paymentInstrument?.PIID;
        depositInfo.PIName = this.props.navigationProps.paymentInstrument?.AcctDisplayName;
        depositInfo.PISourceCurrencyAmount = this.props.navigationProps.transactionAmount;
        depositInfo.PISourceCurrencyCode = this.props.GoalCurrency.CurrencyCode;
        depositInfo.PITypeName = this.props.navigationProps.piType?.PIType.PITypeName;
        depositInfo.TSTypeName = selectedTSType.TSTypeName;
        depositInfo.PIRequiredFieldValues = [];

        let buyAssetEntityData = new BuyAssetEntity();
        buyAssetEntityData.BuyAssetCurrencyCode = this.props.navigationProps.AssetCurrencyCode;
        buyAssetEntityData.CashAmount = this.props.navigationProps.transactionAmount;
        buyAssetEntityData.CashGoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        let buyAssetsInfo = new BuyAssetsInfoEntity();
        buyAssetsInfo.GoalAllocationCashAmount = 0;
        buyAssetsInfo.GoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;
        buyAssetsInfo.BuyAssetsInfoType = BuyAssetsInfoType.DepositSingleAsset;
        buyAssetsInfo.BuyAssets = [buyAssetEntityData];

        await interfaces.deposit(depositInfo, buyAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _cashDepositUsingCard = async (selectedTSType: TSTypeEntity) => {
    return new Promise(async (resolve, reject) => {
      try {
        let depositInfo = new DepositInfoEntity();
        depositInfo.DepositInfoType = DepositInfoType.DepositFunds;
        depositInfo.PIID = this.props.navigationProps.paymentInstrument?.PIID;
        depositInfo.PIName = this.props.navigationProps.paymentInstrument?.AcctDisplayName;
        depositInfo.PISourceCurrencyAmount = this.props.navigationProps.transactionAmount;
        depositInfo.PISourceCurrencyCode = this.props.GoalCurrency.CurrencyCode;
        depositInfo.PITypeName = this.props.navigationProps.piType?.PIType.PITypeName;
        depositInfo.TSTypeName = selectedTSType.TSTypeName;
        depositInfo.PIRequiredFieldValues = [];

        let buyAssetsInfo = new BuyAssetsInfoEntity();
        buyAssetsInfo.BuyAssetsInfoType = BuyAssetsInfoType.DepositToCash;
        buyAssetsInfo.GoalAllocationCashAmount = this.props.navigationProps.transactionAmount;
        buyAssetsInfo.GoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        await interfaces.deposit(depositInfo, buyAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _cashDepositUsingBankTransfer = async (selectedTSType: TSTypeEntity) => {
    return new Promise(async (resolve, reject) => {
      try {
        let depositInfo = new DepositInfoEntity();
        depositInfo.DepositInfoType = DepositInfoType.DepositFunds;
        if (!!this.props.navigationProps.paymentInstrument) {
          depositInfo.PIID = this.props.navigationProps.paymentInstrument?.PIID;
          depositInfo.PIName = this.props.navigationProps.paymentInstrument?.AcctDisplayName;
        }
        depositInfo.PISourceCurrencyAmount = this.props.navigationProps.transactionAmount;
        depositInfo.PISourceCurrencyCode = this.props.GoalCurrency.CurrencyCode;
        depositInfo.PITypeName = this.props.navigationProps.piType?.PIType.PITypeName;
        depositInfo.TSTypeName = selectedTSType.TSTypeName;
        depositInfo.PIRequiredFieldValues = [];

        let buyAssetsInfo = new BuyAssetsInfoEntity();
        buyAssetsInfo.BuyAssetsInfoType = BuyAssetsInfoType.DepositToCash;
        buyAssetsInfo.GoalAllocationCashAmount = this.props.navigationProps.transactionAmount;
        buyAssetsInfo.GoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        await interfaces.deposit(depositInfo, buyAssetsInfo)
          .then((result) => {
            resolve({Status: true, Data: result});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _sellAssetsToCashBalance = async (sellAssetType: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        let sellAssetsInfo = new SellAssetsInfoEntity();
        sellAssetsInfo.SellAssetsInfoType = sellAssetType;
        sellAssetsInfo.SellAssets = [...this.props.navigationProps.sellAssets];

        await interfaces.sellAssets(sellAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _withdrawFromPortfolio = async (withdrawType: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        let sellAssetsInfo = new SellAssetsInfoEntity();
        sellAssetsInfo.SellAssetsInfoType = withdrawType;
        sellAssetsInfo.GoalCurrencyCode = this.props.GoalCurrency.CurrencyCode;
        sellAssetsInfo.DesiredCashAmount = this.props.navigationProps.transactionAmount;

        await interfaces.sellAssets(sellAssetsInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  _withdrawUsingBankTransfer = async (selectedTSType: TSTypeEntity) => {
    return new Promise(async (resolve, reject) => {
      try {
        let withdrawInfo = new WithdrawInfoEntity();
        withdrawInfo.WithdrawInfoType = WithdrawInfoType.WithdrawFunds;
        withdrawInfo.PIID = this.props.navigationProps.paymentInstrument?.PIID;
        withdrawInfo.PIName = this.props.navigationProps.paymentInstrument?.AcctDisplayName;
        withdrawInfo.PITypeName = this.props.navigationProps.piType?.PIType.PITypeName;
        withdrawInfo.TSTypeName = selectedTSType.TSTypeName;
        withdrawInfo.PIRequiredFieldValues = [];
        withdrawInfo.WithdrawAll = this.props.navigationProps.withdrawAll;
        withdrawInfo.WithdrawAmount = this.props.navigationProps.transactionAmount;
        withdrawInfo.WithdrawCurrencyCode = this.props.GoalCurrency.CurrencyCode;

        await interfaces.withdraw(withdrawInfo)
          .then(() => {
            resolve({Status: true});
          });
      } catch (response) {
        if (!!response) {
          reject({Status: false, ErrorMessage: response.ErrorMsg, ErrorMessageDebug: response.ErrorMsgDebug});
        } else {
          reject(null);
        }
      }
    });
  };

  // Transaction Buy assets API Call
  _onPressConfirm = async () => {
    let selectedTSType = this.props.navigationProps.piType?.PITransferServiceTypes.find(tsType => tsType.Selected);

    if (this.props.navigationProps.purpose === 'investment' && !this.props.navigationProps.direction) {
      return this._investUsingCashBalance()
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    if (this.props.navigationProps.purpose === 'buySingle' && !this.props.navigationProps.direction) {
      return this._buySingleAssetUsingCashBalance()
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    if (this.props.navigationProps.purpose === 'buySingle' && this.props.navigationProps.direction === 'Deposit') {
      return this._buySingleAssetUsingDeposit(selectedTSType)
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    if ((this.props.navigationProps.purpose === 'sellSingle' || this.props.navigationProps.purpose === 'sellMultiple') && !this.props.navigationProps.direction) {
      const sellAssetType = this.props.navigationProps.purpose === 'sellSingle' ? SellAssetsInfoType.SingleAsset : SellAssetsInfoType.MultipleAssets;
      return this._sellAssetsToCashBalance(sellAssetType)
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    if (this.props.navigationProps.purpose === 'investment' && this.props.navigationProps.direction === 'Deposit') {
      return this._investUsingDeposit(selectedTSType)
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    if (this.props.navigationProps.purpose === 'cash' && this.props.navigationProps.direction === 'Deposit') {
      if (this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.BankTransfer) {
        return this._cashDepositUsingBankTransfer(selectedTSType)
          .then((transactionResult) => {
            if (!!transactionResult.Data?.PaymentInstructions || !!transactionResult.Data?.BrowserHTML || !!transactionResult.Data?.PaymentData) {
              if (!!transactionResult.Data?.PaymentData && typeof transactionResult.Data?.PaymentData === 'string') {
                transactionResult.Data.PaymentData = JSON.parse(transactionResult.Data.PaymentData);
              }
              return this._onShowTransactionInstructionsOverlay(transactionResult.Data);
            } else {
              return this._showTransactionStatusPage(transactionResult);
            }
          }).catch((transactionResult) => {
            if (transactionResult !== null) {
              return this._showTransactionStatusPage(transactionResult);
            } else {
              return null;
            }
          });
      }

      if (this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.Card) {
        return this._cashDepositUsingCard(selectedTSType)
          .then((transactionResult) => {
            return this._showTransactionStatusPage(transactionResult);
          }).catch((transactionResult) => {
            if (transactionResult !== null) {
              return this._showTransactionStatusPage(transactionResult);
            } else {
              return null;
            }
          });
      }
    }

    if ((this.props.navigationProps.purpose === 'fullPortfolio' || this.props.navigationProps.purpose === 'partialPortfolio') &&
      !this.props.navigationProps.direction) {
      const withdrawType = this.props.navigationProps.purpose === 'fullPortfolio' ? SellAssetsInfoType.EntirePortfolio : SellAssetsInfoType.PartialPortfolio;
      return this._withdrawFromPortfolio(withdrawType)
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    if (this.props.navigationProps.purpose === 'withdraw' && this.props.navigationProps.direction === 'Withdraw') {
      return this._withdrawUsingBankTransfer(selectedTSType)
        .then((transactionResult) => {
          return this._showTransactionStatusPage(transactionResult);
        }).catch((transactionResult) => {
          if (transactionResult !== null) {
            return this._showTransactionStatusPage(transactionResult);
          } else {
            return null;
          }
        });
    }

    return NavigationUtil.showAlert({messageText: strings('confirmTransactionPage.label_under_development')});
  };

  // Redirect next screen according with transaction status
  _showTransactionStatusPage = async (result) => {
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.TransactionStatusPage, {
      transactionResult: result,
    });
  };

  // Redirect next screen according with transaction status
  _showTransactionInstructionsPage = async (depositResult: DepositEntity) => {
    return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.TransactionInstructionsPage, {
      depositResult,
    });
  };

  _renderSoldCurrencies = () => {
    return this.props.navigationProps.sellAssets
      .map(asset => ({...asset, ...this.props.Currencies.find(currency => asset.SellAssetCurrencyCode === currency.CurrencyCode)}))
      .map((currency, index) => {
        return (
          <View key={index} style={pageStyle.soldCurrenciesContainerStyle}>
            <View style={[pageStyle.imageContainerStyle, {backgroundColor: currency.HexCode}]}>
              <Image style={pageStyle.imageStyle}
                     source={{uri: `${this.props.CurrencyImageBaseURL}${currency.CurrencyCode}/symbol.png`}}/>
            </View>
            <View>
              <RegularText>{currency.CurrencyName} ({currency.CurrencyCode})</RegularText>
              <LightText style={pageStyle.soldCurrenciesTextColor}>{currency.SellAssetAmount.toFixed(currency.Precision)}</LightText>
            </View>
          </View>
        );
      });
  };

  // Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  _getMessage = () => {
    if (this.props.navigationProps.purpose === 'investment' && !this.props.navigationProps.direction && this.props.navigationProps.piType?.PIType.PITypeName === 'Cash Balance') {
      return strings('confirmTransactionPage.label_investment_flow', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'investment' && this.props.navigationProps.direction === 'Deposit' && this.props.navigationProps.piType?.PIType.PITypeName === 'Bank Transfer') {
      return strings('confirmTransactionPage.label_investment_flow', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'investment' && this.props.navigationProps.direction === 'Deposit' && this.props.navigationProps.piType?.PIType.PITypeName === 'Card') {
      return strings('confirmTransactionPage.label_investment_flow', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'fullPortfolio' && !this.props.navigationProps.direction && this.props.navigationProps.piType?.PIType.PITypeName === 'Portfolio') {
      return strings('confirmTransactionPage.label_sell_full_portfolio');
    } else if (this.props.navigationProps.purpose === 'partialPortfolio' && !this.props.navigationProps.direction && this.props.navigationProps.piType?.PIType.PITypeName === 'Portfolio') {
      return strings('confirmTransactionPage.label_sell_partial_portfolio');
    } else if (this.props.navigationProps.purpose === 'sellMultiple' && !this.props.navigationProps.direction && this.props.navigationProps.piType?.PIType.PITypeName === 'Sell Asset') {
      return this.props.navigationProps.sellAssets?.length === 1 ? strings('confirmTransactionPage.label_sell_single_asset') : strings('confirmTransactionPage.label_sell_multiple_assets');
    } else if (this.props.navigationProps.purpose === 'withdraw' && this.props.navigationProps.direction === 'Withdraw' && this.props.navigationProps.piType?.PIType.PITypeName === 'Bank Transfer') {
      return this.props.navigationProps.withdrawAll === false ? strings('confirmTransactionPage.label_withdraw_partial') : strings('confirmTransactionPage.label_withdraw_full');
    } else if (this.props.navigationProps.purpose === 'cash' && this.props.navigationProps.direction === 'Deposit' && this.props.navigationProps.piType?.PIType.PITypeName === 'Bank Transfer') {
      return strings('confirmTransactionPage.label_deposit_cash_balance_using_bank_or_card', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'cash' && this.props.navigationProps.direction === 'Deposit' && this.props.navigationProps.piType?.PIType.PITypeName === 'Card') {
      return strings('confirmTransactionPage.label_deposit_cash_balance_using_bank_or_card', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'sellSingle' && !this.props.navigationProps.direction && this.props.navigationProps.piType?.PIType.PITypeName === 'Sell Asset') {
      return strings('confirmTransactionPage.label_sell_single_asset');
    } else if (this.props.navigationProps.purpose === 'buySingle' && !this.props.navigationProps.direction && this.props.navigationProps.piType?.PIType.PITypeName === 'Cash Balance') {
      return strings('confirmTransactionPage.label_buy_single_asset', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'buySingle' && this.props.navigationProps.direction === 'Deposit' && this.props.navigationProps.piType?.PIType.PITypeName === 'Card') {
      return strings('confirmTransactionPage.label_buy_single_asset', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else if (this.props.navigationProps.purpose === 'buySingle' && this.props.navigationProps.direction === 'Deposit' && this.props.navigationProps.piType?.PIType.PITypeName === 'Bank Transfer') {
      return strings('confirmTransactionPage.label_buy_single_asset', {piTypeDisplayName: this.props.navigationProps.piType?.PIType.PITypeDisplayName});
    } else {
      return strings('confirmTransactionPage.label_purpose_not_define');
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('confirmTransactionPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <ScreenTitleImage imageAsset={require('../../../assets/screen_image_confirm_transaction.png')}/>
          <View style={pageStyle.transactionalStatusContainerStyle}>
            <RegularText style={[fontFamilyStyles.mediumText]}>
              {strings('confirmTransactionPage.label_investment_amount')}
            </RegularText>
            <LightText style={[fontFamilyStyles.largeText]}>
              {this.props.GoalCurrency.CurrencySymbol + parseFloat(this.props.navigationProps.transactionAmount).toFixed(this.props.GoalCurrency.Precision)}
            </LightText>
            {this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.CashBalance ?
              <>
                <RegularText style={pageStyle.textMediumMarginTopStyle}>
                  {strings('confirmTransactionPage.label_cash_balance_after_investment')}
                </RegularText>
                <LightText style={[fontFamilyStyles.largeText]}>
                  {this.props.GoalCurrency.CurrencySymbol + (this.props.GoalDashboard.CashBalance - this.props.navigationProps.transactionAmount).toFixed(this.props.GoalCurrency.Precision)}
                </LightText>
              </>
              : null
            }
            <>
              <RegularText style={pageStyle.textMediumMarginTopStyle}>
                {strings('confirmTransactionPage.label_source')}
              </RegularText>
              <LightText style={[fontFamilyStyles.largeText]}>
                {this.props.navigationProps.piType?.PIType.PITypeDisplayName} ( {this.props.navigationProps.piType?.PITransferServiceTypes.find(tsType => tsType.Selected).TSTypeDisplayName} )
              </LightText>
              {!!this.props.navigationProps.paymentInstrument?.AcctDisplayName ?
                <RegularText
                  style={fontFamilyStyles.smallText}>
                  {strings('confirmTransactionPage.label_card_name', {AcctDisplayName: this.props.navigationProps.paymentInstrument?.AcctDisplayName})}
                </RegularText> : null}
            </>
            <View style={pageStyle.getMessageContainerStyle}>
              <RegularText style={pageStyle.textMediumMarginTopStyle}>Purpose</RegularText>
              <LightText style={[fontFamilyStyles.largeText, pageStyle.textAlignCenter]}>
                {this._getMessage()}
              </LightText>
            </View>
          </View>
          {!!this.props.navigationProps.sellAssets && this.props.navigationProps.sellAssets?.length > 0 ?
            <>
              <View style={pageStyle.soldAssetsLabelContainerStyle}>
                <RegularText style={[fontFamilyStyles.mediumText, pageStyle.textAlignCenter]}>
                  {strings('confirmTransactionPage.label_sold_assets')}
                </RegularText>
              </View>
              <View style={pageStyle.soldCurrencyListContainerStyle}>
                {this._renderSoldCurrencies()}
              </View>
            </>
            : null}
        </ScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onPressConfirm}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('confirmTransactionPage.label_button_invest_now')}
          />
        </View>
      </View>
    );
  }
}

ConfirmTransactionPage.propTypes = propTypes;
ConfirmTransactionPage.defaultProps = defaultProps;



