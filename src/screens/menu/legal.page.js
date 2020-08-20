import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { strings } from '../../config/i18/i18n';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, BoldText } from '../common/components';
import { pageStyle } from './legal.page.style';

export default class LegalPage extends BasePage {

  constructor(props) {
    super(props, {
      webViewVisible: false,
      selectedWebURL: '',
      tncList: [],
      isCustodialCustomer: false,
    });
  }

  componentDidMount = () => {
    return interfaces.getTermsAndCondition()
      .then((result) => {
        this.setState({
          tncList: result.TermsAndConditionsInfo,
        });
      })
      .catch(() => null);
  };

  // Close Web View
  _closeWebView = () => {
    this.setState({
      webViewVisible: false,
      selectedWebURL: '',
    });
  };

  // Back Button Action
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  // On clicking a Row Item
  _onRowItemPressed = (data) => {
    this.setState({
      webViewVisible: true,
      selectedWebURL: data.FullDocURL,
      isCustodialCustomer: false,
    });
  };

  _custodialAgreement = async (data) => {
    fetch(data.FullDocURL)
      .then((response) => response.text())
      .then((responseJson) => {
        let retrievedDate = responseJson.toString();
        const mapObj = {'{{FirstName}}': this.props.User.FirstName, '{{LastName}}': this.props.User.LastName};
        const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
        const str = retrievedDate.replace(re, function (matched) {
          return mapObj[matched];
        });
        this.setState({
          webViewVisible: true,
          selectedWebURL: str,
          isCustodialCustomer: true,
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Row UI
  _renderRowView = (data) => {
    return (
      <View style={pageStyle.rowItemContainer}>
        <LinearGradient
          colors={[commonTheme.COLOR_BRIGHT, commonTheme.COLOR_BRIGHT, commonTheme.COLOR_HINT]}
          style={pageStyle.linearGradientContainer}
        >
          <TouchableOpacity
            style={[pageStyle.linearGradientContainer, pageStyle.rowItemSubContainer]}
            onPress={() => {
              data.Title === 'Custodial Agreement' ? this._custodialAgreement(data) : this._onRowItemPressed(data);
            }}>
            <BoldText style={pageStyle.rowItemTextStyle}>{data.Title}</BoldText>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  _onShouldStartLoadWithRequest = (event) => {
    return event.url === this.state.selectedWebURL;
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('legalPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <FlatList
          style={pageStyle.listStyle}
          data={this.state.tncList}
          renderItem={({item, index, separators}) => (this._renderRowView(item))}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={[pageStyle.webViewMainContainer, {
          position: this.state.webViewVisible ? 'absolute' : 'relative',
          display: this.state.webViewVisible ? 'flex' : 'none',
        }]}>
          <View style={pageStyle.webViewCloseButtonContainer}>
            <TouchableOpacity style={pageStyle.webViewCloseButtonSubContainer} onPress={this._closeWebView}>
              <Image style={pageStyle.webViewCloseButtonImageStyle} source={require('../../assets/close.png')}/>
            </TouchableOpacity>
          </View>

          <View style={pageStyle.webViewContainer}>
            {this.state.isCustodialCustomer ?
              <WebView
                source={{html: this.state.selectedWebURL, baseUrl: 'file:///temp_assets/'}}
                style={pageStyle.webviewStyle}
                automaticallyAdjustContentInsets={false}
                useWebKit={true}
                originWhitelist={['*']}
                androidHardwareAccelerationDisabled
              />
              :
              <WebView
                source={{uri: this.state.selectedWebURL}}
                style={pageStyle.webviewStyle}
                automaticallyAdjustContentInsets={false}
                useWebKit={true}
                originWhitelist={['*']}
                androidHardwareAccelerationDisabled
                onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest} //for iOS
                onNavigationStateChange={this._onShouldStartLoadWithRequest} //for Android
              />
            }
          </View>
        </View>
      </View>
    );
  }
}
