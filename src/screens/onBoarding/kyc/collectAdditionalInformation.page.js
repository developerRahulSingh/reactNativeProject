import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, StandardButton } from '../../common/components';
import { pageStyle } from './collectAdditionalInformation.page.style';

export default class CollectAdditionalInformationPage extends BasePage {
  constructor(props) {
    super(props, {
      additionalRegisterUserFieldRequirements: [],
      createUserFieldRequirementsData: {},
    });
    this.inputs = {};
  }

  componentDidMount() {
    let dataFields = Object.keys(this.props.navigationProps.createUserFieldRequirementsData);
    this.setState({
      additionalRegisterUserFieldRequirements: this.props.navigationProps.registerUserFieldRequirements?.CreateUserFieldRequirements
        .filter(field => !dataFields.includes(field.Name)),
    });
  }

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _updateUserInfo = async () => {
    if (this.state.additionalRegisterUserFieldRequirements.some(field => !this.state.createUserFieldRequirementsData.hasOwnProperty(field.Name) || !this.state.createUserFieldRequirementsData[field.Name].trim())) {
      await NavigationUtil.showAlert({messageText: strings('collectAdditionalInformationPage.alert_fill_data')});
      return;
    }
    let createUserFieldRequirementsData: any = {...this.props.navigationProps.createUserFieldRequirementsData, ...this.state.createUserFieldRequirementsData};
    let navigationProps = {
      registerUserFieldRequirements: this.props.navigationProps.registerUserFieldRequirements,
      createUserFieldRequirementsData: createUserFieldRequirementsData,
    };

    // if ((this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.length) || this.props.navigationProps.registerUserFieldRequirements?.Consents.length) {
    //   await NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.CollectUniqueIDPage, navigationProps);
    // } else {
    //   await NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.UploadDocumentPage, navigationProps);
    // }

    if ((this.props.navigationProps.registerUserFieldRequirements?.NationalIDs.length) || this.props.navigationProps.registerUserFieldRequirements?.Consents.length) {
      await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.CollectUniqueIDPage, navigationProps);
    } else {
      await NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.UploadDocumentPage, navigationProps);
    }
  };

  _updateFields = (type, value) => {
    let createUserFieldRequirementsData = this.state.createUserFieldRequirementsData;
    createUserFieldRequirementsData[type] = value;
    this.setState({createUserFieldRequirementsData}, () => {
      this._changeNextBtnState();
    });
  };

  _changeNextBtnState = () => {
    let resultData = this.state.additionalRegisterUserFieldRequirements.some(field => !this.state.createUserFieldRequirementsData.hasOwnProperty(field.Name) || !this.state.createUserFieldRequirementsData[field.Name]);
    this.setState({
      enableNextBtn: !resultData,
    });
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === this.state.additionalRegisterUserFieldRequirements.length) {
      return this._updateUserInfo();
    } else {
      this.inputs[nextField].focus();
    }
  };

  _requiredFieldsRenderData = () => {
    return this.state.additionalRegisterUserFieldRequirements.map((field, index) => {
      return (<View key={index} style={pageStyle.renderFieldsContainerStyle}>
        <IconBasedTextInput
          onRef={(ref) => {
            this.inputs[index] = ref;
          }}
          titleColor={commonTheme.COLOR_DARK}
          borderColor={commonTheme.COLOR_DARK}
          iconColor={commonTheme.COLOR_DARK}
          title={field.DisplayName}
          icon={require('../../../assets/user.png')}
          maxLength={Number(field.MaxLen)}
          value={this.state.createUserFieldRequirementsData[field.Name]}
          returnKeyType={'next'}
          onChangeText={(fieldValue) => this._updateFields(field.Name, fieldValue)}
          onSubmitEditing={() => this._focusNextInputField(index + 1)}
          editable={true}
        />
      </View>);
    });
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <BackNavTitle
          title={strings('collectAdditionalInformationPage.title')}
          onPressEvent={this._backButton}
          onPressCloseEvent={this._navCloseButtonClick}
          titleColor={commonTheme.SECONDARY_TEXT_COLOR_LIGHT}/>
        <KeyboardAwareScrollView bounces={false}
                                 style={pageStyle.keyBoardScrollViewStyle}
                                 enableOnAndroid={true}
                                 showsVerticalScrollIndicator={false}
                                 contentContainerStyle={pageStyle.keyBoardScrollViewContentContainer}>
          {this._requiredFieldsRenderData()}
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._updateUserInfo}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('collectAdditionalInformationPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
