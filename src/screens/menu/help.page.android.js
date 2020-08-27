import React from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../config/i18/i18n';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, MediumText, RegularText } from '../common/components';
import { pageStyle } from './help.page.style';

const BuildConfig = require('react-native-build-config');

export default class HelpPage extends BasePage {

  constructor(props) {
    super(props);
  }

  //Back Button Click Event
  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  //Support Mail button click event
  _supportMailClick = async () => {
    return Linking.openURL('mailto:support@b21.io?subject=Support App').catch(() => null);
  };

  _buttonRender = (title: string, subTitle: string, iconImage: any, clickEvent: any) => {
    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={clickEvent}
        style={pageStyle.supportMailButtonContainer}
      >
        <View style={pageStyle.selectFillContainer}/>
        <View style={pageStyle.supportMailButtonSubContainer}>
          <Image style={pageStyle.emailImageStyle} resizeMode={'contain'} source={iconImage}/>
          <View>
            <MediumText style={pageStyle.supportMailTextStyle}>
              {title}
            </MediumText>
            <RegularText style={[pageStyle.supportMailTextStyle, pageStyle.supportEmailAddressTextStyle]}>
              {subTitle}
            </RegularText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('helpPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView
          bounces={false}
          extraScrollHeight={0}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={pageStyle.keyboardScrollViewContentStyle}
        >
          {this._buttonRender(strings('helpPage.label_support_mail'), strings('helpPage.label_support_b21'), require('../../assets/email.png'), this._supportMailClick)}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
