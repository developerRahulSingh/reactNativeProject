import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { RegisterUserFieldRequirementsBO } from '../../../models/businessObjects';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { IconBasedTextInput, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './confirmName.page.style';

export default class ConfirmNamePage extends BasePage {
  registerUserFieldRequirements: Array<RegisterUserFieldRequirementsBO>;

  constructor(props) {
    super(props, {
      createUserFieldRequirements: [],
      createUserFieldRequirementsData: {},
      enableNextBtn: false,
    }, true);
    this.inputs = {};
  }

  _backButtonHandler = async () => {
    return this._navCloseButtonClick();
  };

  componentDidMount = async () => {
    return this._getRegisterUserRequirementFields();
  };

  _getRegisterUserRequirementFields = async () => {
    return interfaces.getRegisterUserFieldRequirements(this.props.User.CountryCode)
      .then((result) => {
        this.registerUserFieldRequirements = result;
        this.setState({
          createUserFieldRequirements: result.CreateUserFieldRequirements
            .filter(field => field.Category === 'PersonInfo' && field.Name.includes('Name')),
        }, () => {
          this._populateState();
        });
      })
      .catch(() => null);
  };

  _populateState() {
    let createUserFieldRequirementsData = {};
    this.state.createUserFieldRequirements.forEach((field) => {
      if (field.Name === 'FirstGivenName') {
        createUserFieldRequirementsData[field.Name] = this.props.User.FirstName;
      } else if (field.Name === 'FirstSurName') {
        createUserFieldRequirementsData[field.Name] = this.props.User.LastName;
      } else if (field.Name === 'PersonInfoAdditionalFieldsFullName') {
        createUserFieldRequirementsData[field.Name] = `${this.props.User.FirstName} ${this.props.User.LastName}`;
      } else {
        createUserFieldRequirementsData[field.Name] = null;
      }
    });
    this.setState({createUserFieldRequirementsData}, () => {
      this._changeNextBtnState();
    });
  }

  _changeNextBtnState = () => {
    let resultData = this.state.createUserFieldRequirements
      .some(field => !this.state.createUserFieldRequirementsData.hasOwnProperty(field.Name) || !this.state.createUserFieldRequirementsData[field.Name]);
    this.setState({
      enableNextBtn: !resultData,
    });
  };

  _updatingValues = (fieldName, value) => {
    let newState = this.state.createUserFieldRequirementsData;
    newState[fieldName] = value;
    this.setState({createUserFieldRequirementsData: newState}, () => {
      this._changeNextBtnState();
    });
  };

  _onNextBtnClick = async () => {
    if (this.state.createUserFieldRequirements.some(field => !this.state.createUserFieldRequirementsData.hasOwnProperty(field.Name) || !this.state.createUserFieldRequirementsData[field.Name].trim())) {
      // if (!this.state.enableNextBtn) {
      return NavigationUtil.showAlert({messageText: strings('confirmNamePage.alert_fields_detail')});
    } else {
      // return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.KYC.CollectDoBPage, {
      //   registerUserFieldRequirements: this.registerUserFieldRequirements,
      //   createUserFieldRequirementsData: this.state.createUserFieldRequirementsData,
      // });

      return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.CollectDoBPage, {
        registerUserFieldRequirements: this.registerUserFieldRequirements,
        createUserFieldRequirementsData: this.state.createUserFieldRequirementsData,
      });
    }
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === this.state.createUserFieldRequirements.length) {
      return this._onNextBtnClick();
    } else {
      this.inputs[nextField].focus();
    }
  };

  _requiredFieldsRenderData = () => {
    return this.state.createUserFieldRequirements.map((field, index) => {
      return (<View key={index} style={pageStyle.renderFieldContainerStyle}>
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
          onChangeText={(fieldValue) => this._updatingValues(field.Name, fieldValue)}
          onSubmitEditing={() => this._focusNextInputField(index + 1)}
          editable={true}
        />
      </View>);
    });
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <ScreenTitleImage title={strings('confirmNamePage.title')} imageAsset={require('../../../assets/userKYC.png')}
                          closeButtonEvent={this._navCloseButtonClick}
                          imageAssetBackground={commonTheme.COLOR_TRANSPARENT} handleNotch={true}/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
          {this._requiredFieldsRenderData()}
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextBtnClick}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('confirmNamePage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
