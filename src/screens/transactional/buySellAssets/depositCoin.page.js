import React from 'react';
import { Clipboard, Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, LabeledInfoBlockComponent, ScreenTitleImage, StandardButton } from '../../common/components';
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
        <LabeledInfoBlockComponent title={'Address'} value={text} borderColor={'transparent'}/>
        <View style={[pageStyle.infoTextContainer]}>
          <StandardButton width={'60%'}
                          onPress={async () => await Clipboard.setString(text)}
                          showCompact
                          changeIcon={require('../../../assets/icon_nav_check_dark.png')}
                          icon={require('../../../assets/icon_copy_black.png')}
                          labelText={'Copy'}/>
        </View>
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
          <ScreenTitleImage
            imageAsset={{uri: `${this.props.CurrencyImageBaseURL}${this.props.navigationProps.AssetCurrencyCode}/symbol.png`}}
            imageAssetBackground={this.props.selectedAsset.HexCode}
            descriptionText={strings('depositCoinPage.description', {currencyCode: this.props.navigationProps.AssetCurrencyCode})}
          />
          <View style={[pageStyle.qrCodeContainer]}>
            {!!this.state.coinWalletAddress ?
              <QRCode size={128} value={this.state.coinWalletAddress}/> :
              null
            }
          </View>
          <View style={[pageStyle.infoContentContainer]}>
            {!!this.state.coinWalletAddress ? this._renderTextWithCopyButton(this.state.coinWalletAddress) : null}
            {!!this.state.additionalAddressField ? this._renderTextWithCopyButton(this.state.additionalAddressField) : null}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
