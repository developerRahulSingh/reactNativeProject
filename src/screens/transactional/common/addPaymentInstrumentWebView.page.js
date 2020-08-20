import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDisplayName from '../../../constants/payment.instrument.display.name.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle } from '../../common/components';
import { pageStyle } from './addPaymentInstrumentWebView.page.style';

export default class AddPaymentInstrumentWebViewPage extends BasePage {

  constructor(props) {
    super(props);
  }

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('addPaymentInstrumentWebViewPage.title', {piTypeName: this.props.navigationProps.piType?.PIType.PITypeName === paymentInstrumentDisplayName.BankTransfer ? strings('common.label_bank_account') : this.props.navigationProps.piType?.PIType.PITypeDisplayName})}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <View style={pageStyle.webViewContainerStyle}>
          <WebView
            originWhitelist={['*']}
            javaScriptEnabled={true}
            mixedContentMode="always"
            source={{html: this.props.navigationProps.generateCreatePaymentInstrumentHTML?.HTML, baseUrl: 'file:///temp_assets/'}}
          />
        </View>
      </View>
    );
  }
}
