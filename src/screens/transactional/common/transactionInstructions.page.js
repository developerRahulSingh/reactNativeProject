import React from 'react';
import { ScrollView, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BoldText, LabeledInfoBlockComponent, LightText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './transactionInstructions.page.style';

export default class TransactionInstructionsPage extends BasePage {

  constructor(props) {
    super(props);
  }

  _onPressNextButton = async () => {
    await NavigationUtil.reset(this.props.componentId);
  };

  _renderInstructions = () => {
    return this.props.navigationProps.depositResult?.PaymentInstructions?.PaymentInstructionFields.map((instructionField, index) => (
      <View key={index} style={pageStyle.instrumentContainerStyle}>
        <LabeledInfoBlockComponent title={instructionField.DisplayName}
                                   value={instructionField.Value}
                                   titleColor={commonTheme.COLOR_DARK}
                                   textColor={commonTheme.COLOR_DARK}
                                   style={{marginBottom: 24}}
        />
      </View>
    ));
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage
          title={strings('transactionInstructionsPage.title')}
          handleNotch={true}
          imageAsset={require('../../../assets/screen_image_success.png')}
        />
        <View style={pageStyle.descriptionTextContainer}>
          <LightText style={[pageStyle.descriptionBoldTextStyle, pageStyle.descriptionTextStyle]}>
            {strings('transactionInstructionsPage.description1')}
            <BoldText style={pageStyle.descriptionBoldTextStyle}>{strings('transactionInstructionsPage.description2')}</BoldText>
            {strings('transactionInstructionsPage.description3')}
          </LightText>
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {this._renderInstructions()}
        </ScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onPressNextButton}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('transactionInstructionsPage.label_button_done')}/>
        </View>
      </View>
    );
  }
}
