import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import { BasePage } from '../base.page';
import { LightText, MediumText, ScreenTitleImage, StandardButton } from '../components';
import { pageStyle } from './appUpdate.page.style';

export default class AppUpdatePage extends BasePage {
  constructor(props) {
    super(props);
  }

  _onNextButtonPressed = async () => {
    if (Platform.OS === 'ios') {
      return Linking.openURL('https://apps.apple.com/app/b21-invest/id1499042083').catch(() => null);
    } else {
      return Linking.openURL('https://play.google.com/store/apps/details?id=io.b21.invest').catch(() => null);
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage
          title={strings('appUpdatePage.title')}
          handleNotch
          descriptionText={strings('appUpdatePage.description')}
          imageAsset={require('../../../assets/b21_logo.png')}/>
        <View style={pageStyle.contentContainer}>
          <View style={pageStyle.currentVersionContainer}>
            <MediumText style={pageStyle.versionTextStyle}>{strings('appUpdatePage.label_new_version_available')}</MediumText>
            <LightText>{this.props.navigationProps.currentVersion}</LightText>
          </View>
          <View style={pageStyle.installVersionContainer}>
            <LightText style={[pageStyle.versionTextStyle, pageStyle.installVersionText]}>
              {strings('appUpdatePage.label_installed_version_description', {
                version: global['APP_VERSION'],
              })}
            </LightText>
          </View>
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('appUpdatePage.label_button_update_now')}
          />
        </View>
      </View>
    );
  }

}
