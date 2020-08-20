import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import stackName from '../../../constants/stack.name.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BoldText, LightText, ScreenTitleImage, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './termsAndConditions.page.style';

export default class TermsAndConditionsPage extends BasePage {

  constructor(props) {
    super(props, {
      acceptButtonEnabled: false,
      doneButtonEnabled: false,
      webViewVisible: false,
      selectedWebURL: '',
      tncList: [],
      isCustodialCustomer: false,
    });
  }

  componentDidMount = async (): void => {
    return this._getTermsAndConditionsList();
  };

  _getTermsAndConditionsList = async () => {
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
    this.TCWebview.reload();
  };

  // Toggle 'Accept' switch button
  _toggleAcceptSwitch = () => {
    if (this.state.acceptButtonEnabled) {
      this.setState({acceptButtonEnabled: false, doneButtonEnabled: false});
    } else {
      this.setState({acceptButtonEnabled: true, doneButtonEnabled: true});
    }
  };

  // Done Button Action
  _onDoneButton = async () => {
    return interfaces.acceptTermsAndConditions()
      .then((result) => {
        this.props.storeUserData(result);
        if (result.UserSignupRegistrationInfo.PhoneCountryCodeSignupSupported === 'F') {
          return NavigationUtil.resetToStackRoot(this.props.componentId, screenId.OnBoarding.SignUp.CountryNotSupportedPage);
        } else if (result.UserSignupRegistrationInfo.PhoneCountryCodeSignupSupported === 'T') {
          return NavigationUtil.resetTo(stackName.GoalCreationStack, screenId.OnBoarding.SignUp.WelcomePage);
        }
      })
      .catch(() => null);
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
        let retrieveData = responseJson.toString();
        const mapObj = {'{{FirstName}}': this.props.User.FirstName, '{{LastName}}': this.props.User.LastName};
        const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
        const str = retrieveData.replace(re, function (matched) {
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

  _renderRowView = (data) => {
    return (
      <View style={[pageStyle.renderRowContainerStyle, pageStyle.renderRowLinearGradientStyle]}>
        <LinearGradient colors={[commonTheme.COLOR_BRIGHT, commonTheme.COLOR_BRIGHT, commonTheme.COLOR_LIGHTEST]}
                        style={pageStyle.renderRowLinearGradientStyle}>
          <TouchableOpacity
            style={[pageStyle.renderRowButtonStyle, pageStyle.renderRowLinearGradientStyle]}
            onPress={() => {
              data.Title === 'Custodial Agreement' ? this._custodialAgreement(data) : this._onRowItemPressed(data);
            }}>
            <BoldText>{data.Title}</BoldText>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  _onRestrictOtherURLClickEventOnWebView = (event) => {
    if (this.state.isCustodialCustomer) {
      return true;
    } else {
      return event.url === this.state.selectedWebURL;
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage title={strings('termsAndConditionsPage.title')} handleNotch={true}/>
        <FlatList
          bounces={false}
          style={pageStyle.flatListStyle}
          data={this.state.tncList}
          renderItem={({item, index, separators}) => (this._renderRowView(item))}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={pageStyle.agreeTermConditionSwitchButtonContainerStyle}>
          <SwitchButton
            value={this.state.acceptButtonEnabled}
            onValueChange={this._toggleAcceptSwitch}
            backgroundActive={commonTheme.COLOR_PRIMARY_DARK}
          />
          <LightText style={pageStyle.marginStartStyle}>
            {strings('termsAndConditionsPage.label_agree_terms_and_condition')}
          </LightText>
        </View>
        <StandardButton
          onPress={this._onDoneButton}
          color={commonTheme.COLOR_PRIMARY_DARK}
          disabled={!this.state.doneButtonEnabled}
          labelText={strings('termsAndConditionsPage.label_button_done')}
          isBottomButton={true}
        />
        <View style={[pageStyle.webViewMainContainerStyle, {
          position: this.state.webViewVisible ? 'absolute' : 'relative',
          display: this.state.webViewVisible ? 'flex' : 'none',
        }]}>
          <View style={pageStyle.closeWebViewButtonStyle}>
            <TouchableOpacity style={pageStyle.closeButtonStyle} onPress={this._closeWebView}>
              <Image style={pageStyle.closeButtonImageStyle} source={require('../../../assets/close.png')}/>
            </TouchableOpacity>
          </View>
          <View style={pageStyle.webViewContainerStyle}>
            <WebView
              ref={r => this.TCWebview = r}
              source={
                this.state.isCustodialCustomer ? {
                  html: this.state.selectedWebURL,
                  baseUrl: 'file:///temp_assets/',
                } : {uri: this.state.selectedWebURL}}
              style={pageStyle.webViewStyle}
              automaticallyAdjustContentInsets={false}
              useWebKit={true}
              originWhitelist={['*']}
              androidHardwareAccelerationDisabled
              onShouldStartLoadWithRequest={this._onRestrictOtherURLClickEventOnWebView} //for iOS
              onNavigationStateChange={this._onRestrictOtherURLClickEventOnWebView} //for Android
            />
          </View>
        </View>
      </View>
    );
  }
}
