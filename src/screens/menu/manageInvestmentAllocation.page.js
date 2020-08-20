import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../config/i18/i18n';
import interfaces from '../../interfaces';
import TitleBarModel from '../../models/title.bar.model';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitleWithSave, LightText, MediumText, ScreenTitleImage } from '../common/components';
import { pageStyle } from './manageInvestmentAllocation.page.style';

export default class ManageInvestmentAllocationPage extends BasePage {
  alteredIndex: number = null;
  affectedIndex: number = -1;

  constructor(props) {
    super(props, {
      Currencies: [],
    });
  }

  componentDidMount = async (): void => {
    await this._buildAllocationCurrencyData();
  };

  _buildAllocationCurrencyData = async () => {
    let data = this.props.Currencies.map(currency => {
      let currentCC = this.props.GoalAllocation.GoalAllocationItems.find(ga => ga.CurrencyCode === currency.CurrencyCode);
      if (!!currentCC) {
        return {...currency, Percentage: currentCC.Percentage, Unlocked: true};
      } else {
        return {...currency, Unlocked: false};
      }
    });

    return new Promise(resolve => {
      this.setState({
        Currencies: data,
      }, () => resolve());
    });
  };

  _onPressBack = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onPressDone = async () => {
    if (this.state.isAllocationAltered) {
      const goalAllocationItems = this.state.Currencies
        .filter(currency => !!currency.Percentage && currency.Percentage > 0)
        .map(currency => ({
          Percentage: currency.Percentage,
          CurrencyCode: currency.CurrencyCode,
        }));
      return interfaces.updateGoalAllocation(this.props.GoalAllocation.GoalAllocationID, goalAllocationItems)
        .then((result) => {
          this.props.storeGoalAllocation(result);
          return NavigationUtil.goBack(this.props.componentId);
        })
        .catch(() => null);
    }
  };

  _toggleLockState = async (currencyCode: string) => {
    this.setState({
      Currencies: this.state.Currencies.map(currency => {
        if (currency.CurrencyCode === currencyCode) {
          return {...currency, Unlocked: !currency.Unlocked};
        } else {
          return {...currency};
        }
      }),
    });
  };

  _modifyAllocation(startIndex: number, affectedIndex: number, alteredIndex: number, alteration: number = 1) {
    affectedIndex++;
    if (affectedIndex >= this.state.Currencies.length) {
      this._modifyAllocation(startIndex, -1, alteredIndex, alteration);
      return;
    }
    if (affectedIndex === alteredIndex) {
      this._modifyAllocation(startIndex, affectedIndex, alteredIndex, alteration);
      return;
    }
    if (!this.state.Currencies[affectedIndex].Unlocked) {
      this._modifyAllocation(startIndex, affectedIndex, alteredIndex, alteration);
      return;
    }
    if (!this.state.Currencies[affectedIndex].Percentage && alteration > 0) {
      this._modifyAllocation(startIndex, affectedIndex, alteredIndex, alteration);
      return;
    }
    let modifiedList = this.state.Currencies;
    if (!!modifiedList[alteredIndex].Percentage) {
      modifiedList[alteredIndex].Percentage += alteration;
    } else {
      modifiedList[alteredIndex].Percentage = alteration;
    }

    if (!!modifiedList[affectedIndex].Percentage) {
      modifiedList[affectedIndex].Percentage -= alteration;
    } else {
      modifiedList[affectedIndex].Percentage = -alteration;
    }

    this.setState({
      Currencies: modifiedList,
    }, () => {
      this.alteredIndex = alteredIndex;
      this.affectedIndex = affectedIndex;
    });
  }

  _incrementAllocation = async (currencyCode: string) => {
    let alteredIndex = this.state.Currencies.findIndex(currency => currency.CurrencyCode === currencyCode);
    if (this.state.Currencies.filter((currency, index) => currency.Unlocked && !!currency.Percentage && alteredIndex !== index).length === 0) {
      // show a message to unlock more Currencies
      return NavigationUtil.showAlert({messageText: strings('manageInvestmentAllocationPage.alert_please_unlock_currencies_to_auto_adjust_allocations')});
    }
    this.setState({
      isAllocationAltered: true,
    }, () => {
      if (this.alteredIndex !== alteredIndex) {
        this.affectedIndex = -1;
      }
      this.alteredIndex = alteredIndex;
      return this._modifyAllocation(this.affectedIndex, this.affectedIndex, this.alteredIndex, 1);
    });
  };

  _decrementAllocation = async (currencyCode: string) => {
    if (this.state.Currencies.filter(currency => currency.Unlocked).length <= 1) {
      // show a message to unlock more Currencies
      return NavigationUtil.showAlert({messageText: strings('manageInvestmentAllocationPage.alert_please_unlock_currencies_to_auto_adjust_allocations')});
    }
    this.setState({
      isAllocationAltered: true,
    }, () => {
      let alteredIndex = this.state.Currencies.findIndex(currency => currency.CurrencyCode === currencyCode);
      if (this.alteredIndex !== alteredIndex) {
        this.affectedIndex = -1;
      }
      this.alteredIndex = alteredIndex;
      return this._modifyAllocation(this.affectedIndex, this.affectedIndex, this.alteredIndex, -1);
    });
  };

  _renderCurrencyItems(returnAllocated: boolean = true) {
    if (!this.state.Currencies || !this.state.Currencies.length > 0) {
      return null;
    }
    let allocatedCC = this.state.Currencies
      .filter(cc => returnAllocated ? cc.Percentage >= 0 : cc.Percentage === null || cc.Percentage === undefined)
      .map((cc, index) => {
        return (
          <View key={index} style={pageStyle.itemMainContainer}>
            <View style={pageStyle.itemSubContainer}>
              <View style={pageStyle.lockUnlockButtonContainer}>
                <TouchableOpacity style={pageStyle.lockUnlockButtonSubContainer} activeOpacity={0.8} onPress={() => this._toggleLockState(cc.CurrencyCode)}>
                  <Image style={pageStyle.imageStyle}
                         source={cc?.Unlocked ? require('../../assets/unlock_small.png') : require('../../assets/lock_small.png')}
                         resizeMode='contain'/>
                </TouchableOpacity>
              </View>
              <View style={pageStyle.contentCenter}>
                <View style={[pageStyle.coinImageStyle, {backgroundColor: cc.HexCode}]}>
                  <Image style={pageStyle.coinImageStyle}
                         source={{uri: `${this.props.CurrencyImageBaseURL}${cc.CurrencyCode}/symbol.png`}}/>
                </View>
              </View>
              <View style={[commonStyle.container, pageStyle.contentCenter]}>
                <MediumText style={pageStyle.percentageTextStyle}>
                  {`${cc.Percentage ? cc.Percentage : 0}%`}
                </MediumText>
                <LightText>{cc.CurrencyName}</LightText>
              </View>
              <View style={pageStyle.plusMinusButtonContainer}>
                <View style={pageStyle.buttonsContainer}>
                  <TouchableOpacity
                    style={[pageStyle.buttonsSubContainer, {
                      backgroundColor: cc?.Unlocked && cc?.Percentage !== 100 ? commonTheme.COLOR_DARK : commonTheme.COLOR_DISABLED,
                    }]}
                    activeOpacity={0.8}
                    onPress={() => this._incrementAllocation(cc.CurrencyCode)} disabled={!cc?.Unlocked || cc?.Percentage === 100}>
                    <Image style={pageStyle.imageStyle} source={require('../../assets/plus_small.png')} resizeMode='contain'/>
                  </TouchableOpacity>
                </View>
                <View style={pageStyle.buttonsContainer}>
                  <TouchableOpacity
                    style={[pageStyle.buttonsSubContainer, {
                      backgroundColor: cc?.Unlocked && !!cc?.Percentage ? commonTheme.COLOR_DARK : commonTheme.COLOR_DISABLED,
                    }]}
                    activeOpacity={0.8}
                    onPress={() => this._decrementAllocation(cc.CurrencyCode)} disabled={!(cc?.Unlocked && !!cc?.Percentage)}>
                    <Image style={pageStyle.imageStyle} source={require('../../assets/minus_small.png')} resizeMode='contain'/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      });
    return (
      <View>
        {allocatedCC}
      </View>
    );
  }

  _getScreenTitle() {
    let titleBar = new TitleBarModel();
    titleBar.title = strings('manageInvestmentAllocationPage.title');
    titleBar.showBackButton = true;
    titleBar.showRightButton = this.state.isAllocationAltered;
    titleBar.textColorCode = commonTheme.SECONDARY_TEXT_COLOR_LIGHT;
    titleBar.componentId = this.props.componentId;
    titleBar.backgroundColorCode = commonTheme.COLOR_PRIMARY_DARK;
    return titleBar;
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitleWithSave titleBar={this._getScreenTitle()} onPressBack={this._onPressBack} onPressDone={this._onPressDone}/>
        <View style={commonStyle.container}>
          <LinearGradient colors={[commonTheme.COLOR_PRIMARY_DARK, commonTheme.COLOR_BRIGHT]}
                          start={{x: 0, y: 0}} end={{x: 0, y: .4}}
                          style={pageStyle.linearGradientViewStyle}/>
          <ScrollView showsVerticalScrollIndicator={false} numColumns={1}>
            <View style={pageStyle.mainContainer}>
              <ScreenTitleImage imageAsset={require('../../assets/coinPileCircle3x.png')}
                                descriptionText={strings('manageInvestmentAllocationPage.description')}/>
            </View>
            <View style={pageStyle.subContainer}>
              <View style={pageStyle.headerContainer}>
                <MediumText style={pageStyle.headerTextStyle}>
                  {strings('manageInvestmentAllocationPage.label_my_portfolio_allocation')}
                </MediumText>
              </View>
              <View style={pageStyle.listContainer}>
                {this.state.Currencies.length > 0 ? this._renderCurrencyItems() : null}
              </View>
              <View style={pageStyle.headerContainer}>
                <MediumText style={pageStyle.headerTextStyle}>
                  {strings('manageInvestmentAllocationPage.label_add_other_coins')}
                </MediumText>
              </View>
              <View style={pageStyle.listContainer}>
                {this.state.Currencies && this.state.Currencies.length > 0 ? this._renderCurrencyItems(false) : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
