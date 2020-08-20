import React from 'react';
import { Clipboard, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import fontFamilyStyles from '../../../styles/font.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, RegularText } from '../../common/components';
import { pageStyle } from './depositCoin.page.style';

const screen = Dimensions.get('window');

export default class DepositCoinPage extends BasePage {
  constructor(props) {
    super(props, {
      coinWalletAddress: '',
      additionalAddressField: '',
    });
  }

  componentDidMount = async (): void => {
    await interfaces.GetAssetTransferWalletAddress('Deposit', this.props.navigationProps.AssetCurrencyCode)
      .then((result) => {
        this.setState({
          coinWalletAddress: result.WalletAddress,
          additionalAddressField: result.AdditionalAddressField,
        });
      })
      .catch(() => null);
  };

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  _renderTextWithCopyButton = (text: string) => {
    return (
      <>
        <View style={[pageStyle.infoContainer]}>
          <View style={[pageStyle.infoTextContainer]}>
            <RegularText>{text}</RegularText>
          </View>
          <TouchableOpacity
            style={[pageStyle.infoCopyButtonContainer]}
            onPress={async () => await Clipboard.setString(text)}
            activeOpacity={0.8}>
            <Image style={pageStyle.infoCopyButtonImageStyle} source={require('../../../assets/icon_copy_black.png')}/>
          </TouchableOpacity>
        </View>
        <View style={[pageStyle.separatorStyle]}/>
      </>
    );
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('depositCoinPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.COLOR_DEFAULT_LIGHT}/>
        <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} showsVerticalScrollIndicator={false} contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          <View style={[pageStyle.qrCodeContainer]}>
            {!!this.state.coinWalletAddress ?
              <QRCode
                size={screen.width - 160}
                value={this.state.coinWalletAddress}
              />
              : null
            }
          </View>
          <View style={pageStyle.subContainerStyle}>
            <View style={[pageStyle.coinNameContainerStyle, pageStyle.exchangeRateContainerStyle]}>
              <RegularText style={fontFamilyStyles.smallText}>
                {strings('depositCoinPage.label_coin_name')}
              </RegularText>
              <RegularText style={fontFamilyStyles.largeText}>
                {this.props.selectedAsset.CurrencyName}
              </RegularText>
            </View>
            <View style={pageStyle.exchangeRateContainerStyle}>
              <RegularText style={fontFamilyStyles.smallText}>
                {strings('depositCoinPage.label_exchange_rate')}
              </RegularText>
              <RegularText style={fontFamilyStyles.largeText}>
                {this.props.GoalCurrency.CurrencySymbol + this.props.navigationProps.GoalCurrencyConversionRate.toFixed(this.props.GoalCurrency.Precision)}
              </RegularText>
            </View>
          </View>
          <View style={[pageStyle.infoContentContainer]}>
            {!!this.state.coinWalletAddress ? this._renderTextWithCopyButton(this.state.coinWalletAddress) : null}
            {this.state.additionalAddressField ? this._renderTextWithCopyButton(this.state.additionalAddressField) : null}
          </View>
        </KeyboardAwareScrollView>
        {/*<View style={commonStyle.bottomButtonContainer}>*/}
        {/*  <StandardButton*/}
        {/*    color={commonTheme.COLOR_PRIMARY_DARK}*/}
        {/*    onPress={() => {*/}
        {/*    }}*/}
        {/*    labelText={strings('depositCoinPage.label_button_Next')}*/}
        {/*  />*/}
        {/*</View>*/}
      </View>
    );
  }
}
