import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../../config/i18/i18n';
import TitleBarModel from '../../../models/title.bar.model';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitleWithSave, LightText, MediumText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './customizeAllocation.page.style';

export default class CustomizeAllocationPage extends BasePage {
  alteredIndex: number = null;
  affectedIndex: number = -1;

  constructor(props) {
    super(props, {
      Currencies: [],
    });

    this._onPressBack = this._onPressBack.bind(this);
    this._toggleLockState = this._toggleLockState.bind(this);
    this._decrementAllocation = this._decrementAllocation.bind(this);
    this._incrementAllocation = this._incrementAllocation.bind(this);
    this._onPressDone = this._onPressDone.bind(this);
  }

  componentDidMount = async (): void => {
    await this._buildAllocationCurrencyData();
  };

  _buildAllocationCurrencyData = async () => {
    let data = this.props.navigationProps.Currencies.map(currency => ({...currency, Unlocked: true}));

    return new Promise(resolve => {
      this.setState({
        Currencies: data,
      }, () => resolve());
    });
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

  _modifyAllocation = (startIndex: number, affectedIndex: number, alteredIndex: number, alteration: number = 1) => {
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
  };

  _incrementAllocation = async (currencyCode: string) => {
    let alteredIndex = this.state.Currencies.findIndex(currency => currency.CurrencyCode === currencyCode);
    if (this.state.Currencies.filter((currency, index) => currency.Unlocked && !!currency.Percentage && alteredIndex !== index).length === 0) {
      // show a message to unlock more Currencies
      return NavigationUtil.showAlert({messageText: strings('customizeAllocationPage.alert_please_unlock_currencies_to_auto_adjust_allocations')});
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
      return NavigationUtil.showAlert({messageText: strings('customizeAllocationPage.alert_please_unlock_currencies_to_auto_adjust_allocations')});
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

  _onPressBack = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _getScreenTitle() {
    let titleBar = new TitleBarModel();
    titleBar.title = strings('customizeAllocationPage.title');
    titleBar.showBackButton = true;
    titleBar.showRightButton = false;
    titleBar.textColorCode = commonTheme.SECONDARY_TEXT_COLOR_LIGHT;
    titleBar.componentId = this.props.componentId;
    titleBar.backgroundColorCode = commonTheme.COLOR_PRIMARY_DARK;
    return titleBar;
  }

  _onPressDone = async () => {
    if (this.props.navigationProps.onDoneCustomize) {
      let data = this.state.Currencies.filter(currency => currency.Percentage).map(currency => {
        let {Unlocked, ...baseCurrencyInfo} = currency;
        return baseCurrencyInfo;
      });

      await this.props.navigationProps.onDoneCustomize(data).then(() => {
        NavigationUtil.goBack(this.props.componentId);
      });
    }
  };

  _renderCurrencyItems() {
    if (!this.state.Currencies || !this.state.Currencies.length > 0) {
      return null;
    }
    let allocatedCC = this.state.Currencies
      .map((cc, index) => {
        return (
          <View key={index} style={pageStyle.renderCurrencyContainerStyle}>
            <View style={pageStyle.renderCurrencySubContainerStyle}>
              <View style={pageStyle.lockContainerStyle}>
                <TouchableOpacity style={pageStyle.lockButtonStyle} activeOpacity={0.8} onPress={() => this._toggleLockState(cc.CurrencyCode)}>
                  <Image style={[pageStyle.incrementDecrementImageStyle]}
                         source={cc?.Unlocked ? require('../../../assets/unlock_small.png') : require('../../../assets/lock_small.png')}
                         resizeMode='contain'/>
                </TouchableOpacity>
              </View>
              <View style={pageStyle.contentCenter}>
                <View style={[pageStyle.currencySymbolImageStyle, {backgroundColor: cc.HexCode}]}>
                  <Image style={[pageStyle.currencySymbolImageStyle]}
                         source={{uri: `${this.props.CurrencyImageBaseURL}${cc.CurrencyCode}/symbol.png`}}/>
                </View>
              </View>
              <View style={[commonStyle.container, pageStyle.contentCenter]}>
                <MediumText style={pageStyle.percentageTextStyle}>
                  {`${cc.Percentage ? cc.Percentage : 0}%`}
                </MediumText>
                <LightText>{cc.CurrencyName}</LightText>
              </View>
              <View style={pageStyle.incrementDecrementMainContainerStyle}>
                <View style={pageStyle.incrementDecrementContainerStyle}>
                  <TouchableOpacity
                    style={[pageStyle.incrementDecrementButtonStyle, {
                      backgroundColor: cc?.Unlocked && cc?.Percentage !== 100 ? commonTheme.COLOR_DARK : commonTheme.COLOR_DISABLED,
                    }]}
                    activeOpacity={0.8}
                    onPress={() => this._incrementAllocation(cc.CurrencyCode)} disabled={!cc?.Unlocked || cc?.Percentage === 100}>
                    <Image style={[pageStyle.incrementDecrementImageStyle]} source={require('../../../assets/plus_small.png')} resizeMode='contain'/>
                  </TouchableOpacity>
                </View>
                <View style={pageStyle.incrementDecrementContainerStyle}>
                  <TouchableOpacity
                    style={[pageStyle.incrementDecrementButtonStyle, {
                      backgroundColor: cc?.Unlocked && cc?.Percentage !== 0 ? commonTheme.COLOR_DARK : commonTheme.COLOR_DISABLED,
                    }]}
                    activeOpacity={0.8}
                    onPress={() => this._decrementAllocation(cc.CurrencyCode)} disabled={!cc?.Unlocked || cc?.Percentage === 0}>
                    <Image style={[pageStyle.incrementDecrementImageStyle]} source={require('../../../assets/minus_small.png')} resizeMode='contain'/>
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

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitleWithSave titleBar={this._getScreenTitle()} onPressBack={this._onPressBack}/>
        <View style={commonStyle.container}>
          <LinearGradient colors={[commonTheme.COLOR_PRIMARY_DARK, commonTheme.COLOR_BRIGHT]}
                          start={{x: 0, y: 0}} end={{x: 0, y: .4}}
                          style={pageStyle.linearGradientStyle}/>
          <ScrollView showsVerticalScrollIndicator={false} numColumns={1}>
            <View style={pageStyle.subContainerStyle}>
              <ScreenTitleImage imageAsset={require('../../../assets/coinPileCircle3x.png')}
                                descriptionText={strings('customizeAllocationPage.description')}/>
            </View>
            <View style={pageStyle.renderCurrencyItemsMainContainerStyle}>
              <View style={pageStyle.renderCurrencyItemContainerStyle}>
                {this.state.Currencies.length > 0 ?
                  this._renderCurrencyItems()
                  : null}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onPressDone}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('customizeAllocationPage.label_button_save')}
          />
        </View>
      </View>
    );
  }
}
