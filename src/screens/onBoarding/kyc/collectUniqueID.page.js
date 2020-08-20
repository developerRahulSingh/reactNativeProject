import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, LightText, MediumText, StandardButton, SwitchButton } from '../../common/components';
import { pageStyle } from './collectUniqueID.page.style';

export default class CollectUniqueIDPage extends BasePage {
  constructor(props) {
    super(props, {
      acceptConsents: false,
      nationalIDsData: {},
    });
    this.inputs = {};
  }

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _onNextBtnClick = async () => {
    if (this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.some(field => !this.state.nationalIDsData.hasOwnProperty(field.Name) || !this.state.nationalIDsData[field.Name].trim())) {
      return NavigationUtil.showAlert({messageText: strings('collectUniqueIDPage.alert_fill_data')});
    } else {
      // await NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.UploadDocumentPage, {
      //   registerUserFieldRequirements: this.props.navigationProps.registerUserFieldRequirements,
      //   createUserFieldRequirementsData: this.props.navigationProps.createUserFieldRequirementsData,
      //   nationalIDsData: this.state.nationalIDsData,
      // });

      await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.UploadDocumentPage, {
        registerUserFieldRequirements: this.props.navigationProps.registerUserFieldRequirements,
        createUserFieldRequirementsData: this.props.navigationProps.createUserFieldRequirementsData,
        nationalIDsData: this.state.nationalIDsData,
      });
    }
  };

  _toggleAcceptConsents = async () => {
    this.setState({
      acceptConsents: !this.state.acceptConsents,
    }, () => {
      this._changeNextBtnState();
    });
  };

  _changeNextBtnState = () => {
    let resultData = this.props.navigationProps.registerUserFieldRequirements?.NationalIDs
      .some(field => !this.state.nationalIDsData.hasOwnProperty(field.Name) || !this.state.nationalIDsData[field.Name]);
    let consentsAccepted = this.props.navigationProps.registerUserFieldRequirements?.Consents.length > 0 ? this.state.acceptConsents : true;
    this.setState({
      enableNextBtn: !resultData && consentsAccepted,
    });
  };

  _updatingValues = (type, value) => {
    let nationalIDsData = this.state.nationalIDsData;
    nationalIDsData[type] = value;
    this.setState({nationalIDsData}, () => {
      this._changeNextBtnState();
    });
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.length) {
      return this._onNextBtnClick();
    } else {
      this.inputs[nextField].focus();
    }
  };

  _requiredFieldsRenderData = () => {
    return this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.map((field, index) => {
      return (<View key={index} style={[pageStyle.paddingHorizontalStyle, pageStyle.renderFieldsContainerStyle]}>
        <IconBasedTextInput
          onRef={(ref) => {
            this.inputs[index] = ref;
          }}
          titleColor={commonTheme.COLOR_DARK}
          borderColor={commonTheme.COLOR_DARK}
          iconColor={commonTheme.COLOR_DARK}
          title={field.DisplayName}
          icon={require('../../../assets/kyc_gov_id_icon.png')}
          value={this.state.nationalIDsData[field.Name]}
          maxLength={Number(field.MaxLen ? field.MaxLen : commonConstant.MAX_CHARACTER_DEFAULT)}
          returnKeyType={'next'}
          onChangeText={(fieldValue) => this._updatingValues(field.Name, fieldValue)}
          onSubmitEditing={() => this._focusNextInputField(index + 1)}
        />
      </View>);
    });
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <BackNavTitle
          title={strings('collectUniqueIDPage.title')}
          onPressEvent={this._backButton}
          onPressCloseEvent={this._navCloseButtonClick}
          titleColor={commonTheme.SECONDARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false}
                                 enableOnAndroid={true}
                                 showsVerticalScrollIndicator={false}
                                 contentContainerStyle={pageStyle.keyBoardScrollViewContentContainerStyle}>
          {this._requiredFieldsRenderData()}
          <View style={[pageStyle.paddingHorizontalStyle, {
            display: this.props.navigationProps.registerUserFieldRequirements?.Consents.length > 0 ? 'flex' : 'none',
          }]}>
            <View style={pageStyle.switchButtonContainerViewStyle}>
              <SwitchButton
                value={this.state.acceptConsents}
                onValueChange={this._toggleAcceptConsents}
                backgroundActive={commonTheme.COLOR_PRIMARY_DARK}
                containerStyle={pageStyle.switchButtonContainerStyle}
              />
              <LightText style={pageStyle.labelAgreeConsentTextColor}>
                {strings('collectUniqueIDPage.label_agree_consent')}
              </LightText>
            </View>
            <LightText style={pageStyle.labelConsentStyle}>
              {strings('collectUniqueIDPage.label_consent')}
            </LightText>
            {this.props.navigationProps.registerUserFieldRequirements?.Consents.map(((consent, index) => (
              <View key={index}>
                <MediumText> - {consent}</MediumText>
              </View>
            )))}
          </View>
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextBtnClick}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('collectUniqueIDPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
