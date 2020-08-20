import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import PageControl from 'react-native-page-control';
import { strings } from '../../../config/i18/i18n';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { LightText, MediumText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './welcome.page.style';

const screen = Dimensions.get('window');

export default class WelcomePage extends BasePage {
  constructor(props) {
    super(props, {
      currentPage: 0,
      totalPages: 4,
    });
    this.scrollView = React.createRef();
  }

  _callCreateGoalScreen = async () => {
    // await NavigationUtil.resetTo(stackName.GoalCreationStack, screenId.OnBoarding.Portfolio.BuildPortfolioPage);

    return interfaces.createGoal()
      .then((resultCreateGoal) => {
        this.props.storeGoal(resultCreateGoal);
        return interfaces.getGoalDashboard();
      })
      .then((result) => {
        this.props.storeUserData({GoalDashboard: result});
        return NavigationUtil.gotoBottomTabsNavigation();
      })
      .catch(() => null);
  };

  _callNextWelcomeScreen = async () => {
    if (this.state.currentPage < this.state.totalPages - 1) {
      const currentPage = this.state.currentPage + 1;
      this.scrollView.current.scrollTo({x: screen.width * currentPage, y: 0, animated: true});
    } else {
      return this._callCreateGoalScreen();
    }
  };

  _onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x,
      pageWidth = screen.width - 10;
    this.setState({
      currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1,
    });
  };

  _renderButtons() {
    return (
      <View style={commonStyle.bottomButtonContainer}>
        <StandardButton
          onPress={this._callNextWelcomeScreen}
          color={commonTheme.COLOR_DARK}
          labelText={strings('welcomePage.label_button_next')}
        />
      </View>
    );
  }

  _renderThirdScreenContent = (title: string, descriptionText: string) => {
    return (
      <>
        <View style={pageStyle.thirdScreenContentTitleContainer}>
          <MediumText style={pageStyle.thirdScreenContentHeaderStyle}>{title}</MediumText>
        </View>
        <LightText style={pageStyle.thirdScreenContentTextStyle}>
          {descriptionText}
        </LightText>
      </>
    );
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScrollView
          ref={this.scrollView}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={this._onScroll}
          scrollEventThrottle={16}
          scrollToEnd={true}>
          <View style={pageStyle.staticFirstScreenContainerStyle}>
            <View style={commonStyle.container}>
              <ScreenTitleImage
                imageAsset={require('../../../assets/welcome.icon.png')}
                imageAssetBackground={commonTheme.COLOR_TRANSPARENT}
                imageColor={commonTheme.COLOR_DEFAULT}
                title={strings('welcomePage.title')}
                showLargeDescription
                descriptionTextColor={commonTheme.COLOR_DEFAULT}
                handleNotch={true}
                descriptionText={strings('welcomePage.description_static_screen_one')}/>
            </View>
          </View>
          <View style={pageStyle.staticSecondScreenContainerStyle}>
            <View style={commonStyle.container}>
              <ScreenTitleImage
                imageAsset={require('../../../assets/welcome.icon.png')}
                imageAssetBackground={commonTheme.COLOR_TRANSPARENT}
                imageColor={commonTheme.COLOR_DEFAULT}
                title={strings('welcomePage.title')}
                showLargeDescription
                descriptionTextColor={commonTheme.COLOR_DEFAULT}
                handleNotch={true}
                descriptionText={strings('welcomePage.description_static_screen_second')}/>
            </View>
          </View>
          <View style={pageStyle.staticThirdScreenContainerStyle}>
            <View style={[commonStyle.container, pageStyle.staticThirdScreenSubContainerStyle]}>

              <ScreenTitleImage
                imageAsset={require('../../../assets/welcome.icon.png')}
                imageAssetBackground={commonTheme.COLOR_TRANSPARENT}
                imageColor={commonTheme.COLOR_DEFAULT}
                title={strings('welcomePage.title_earn')}
                handleNotch={true}/>

              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                {this._renderThirdScreenContent(
                  strings('welcomePage.title_stack_earn'),
                  strings('welcomePage.description_stack_earn', {interest: 5, b21AssetsValue: 500}),
                )}

                {this._renderThirdScreenContent(
                  strings('welcomePage.title_invite_earn'),
                  `${strings('welcomePage.description_invite_earn', {tokenValue: '$2.00'})}`,
                )}

                {this._renderThirdScreenContent(
                  strings('welcomePage.title_invest_earn'),
                  strings('welcomePage.description_invest_earn', {
                    firstDepositValue: '$50.00',
                    firstEarnValue: '$5.00',
                    investValue: '$100',
                    rewardB21Value: '$5.00',
                  }),
                )}
              </ScrollView>

            </View>
          </View>
          <View style={pageStyle.staticForthScreenContainerStyle}>
            <View style={commonStyle.container}>
              <ScreenTitleImage
                imageAsset={require('../../../assets/welcome.icon.png')}
                imageAssetBackground={commonTheme.COLOR_TRANSPARENT}
                imageColor={commonTheme.COLOR_DEFAULT}
                title={strings('welcomePage.title_VIP_level')}
                showLargeDescription
                descriptionTextColor={commonTheme.COLOR_DEFAULT}
                handleNotch={true}
                descriptionText={strings('welcomePage.description_upgrade_to_vip')}/>
            </View>
          </View>
        </ScrollView>
        <View style={pageStyle.pageControlContainerStyle}>
          <PageControl
            numberOfPages={this.state.totalPages}
            currentPage={this.state.currentPage}
            hidesForSinglePage
            currentIndicatorStyle={pageStyle.currentIndicatorStyle}
            pageIndicatorTintColor={commonTheme.COLOR_DARK}
            currentPageIndicatorTintColor={commonTheme.COLOR_BRIGHT}
            indicatorStyle={pageStyle.indicatorStyle}/>
          {this._renderButtons()}
        </View>
      </View>
    );
  }
}
