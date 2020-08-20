import React from 'react';
import { View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import { commonStyle } from '../../../styles/common.style';
import { BasePage } from '../../common/base.page';
import { LightText } from '../../common/components';
import { pageStyle } from './countryNotSupported.page.style';

export default class CountryNotSupportedPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.mainContainerStyle]}>
        <LightText
          style={pageStyle.countryNotSupportedTextStyle}>
          {strings('countryNotSupportedPage.label_country_not_supported')}
        </LightText>
      </View>
    );
  }
}
