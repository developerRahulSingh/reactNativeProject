import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../../config/i18/i18n';
import TitleBarModel from '../../../models/title.bar.model';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitleWithSave, DonutChartComponent, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './buildPortfolioStatus.page.style';

export default class BuildPortfolioStatusPage extends BasePage {
  constructor(props) {
    super(props, {
      Currencies: [],
    }, true);

    this._onPressVerify = this._onPressVerify.bind(this);
  }

  _backButtonHandler = async () => {
    console.log('Back Button work as Disable.');
  };

  componentWillUnmount = () => {
    super.componentWillUnmount();
    this.props.removeComponentID();
  };

  _onPressVerify = async () => {
    // await NavigationUtil.resetTo(stackName.KYCScreenStack, screenId.OnBoarding.KYC.ConfirmCountryPage);
    let componentID = this.props.componentID;
    if (!!componentID) {
      return NavigationUtil.goBackToScreen(componentID);
    } else {
      return NavigationUtil.reset(this.props.componentId);
    }
  };

  _getScreenTitle() {
    let titleBar = new TitleBarModel();
    titleBar.title = strings('buildPortfolioStatusPage.title');
    titleBar.showBackButton = false;
    titleBar.showRightButton = false;
    titleBar.textColorCode = commonTheme.SECONDARY_TEXT_COLOR_LIGHT;
    titleBar.backgroundColorCode = commonTheme.COLOR_PRIMARY_DARK;
    return titleBar;
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitleWithSave titleBar={this._getScreenTitle()}/>
        <View style={commonStyle.container}>
          <LinearGradient colors={[commonTheme.COLOR_PRIMARY_DARK, commonTheme.COLOR_BRIGHT]}
                          start={{x: 0, y: 0}} end={{x: 0, y: .4}}
                          style={pageStyle.linearGradientStyle}/>
          <View style={commonStyle.container}>
            <View style={pageStyle.donutChartContainerStyle}>
              <View style={pageStyle.donutChartStyle}>
                <DonutChartComponent currenciesData={this.props.navigationProps.Currencies}/>
              </View>
              <ScreenTitleImage descriptionText={strings('buildPortfolioStatusPage.description')}/>
            </View>
          </View>
          <View style={commonStyle.bottomButtonContainer}>
            <StandardButton
              onPress={this._onPressVerify}
              color={commonTheme.COLOR_PRIMARY_DARK}
              labelText={strings('buildPortfolioStatusPage.label_button_verify_me_now')}
            />
          </View>
        </View>
      </View>
    );
  }
}
