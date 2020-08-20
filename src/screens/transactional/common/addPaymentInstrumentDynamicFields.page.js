import * as _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../../config/i18/i18n';
import commonConstant from '../../../constants/common.constant';
import paymentBankTransferInfoKey from '../../../constants/payment.bank.transfer.info.enum';
import interfaces from '../../../interfaces';
import { TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, IconBasedTextInput, StandardButton } from '../../common/components';
import { pageStyle } from './addPaymentInstrumentDynamicFields.page.style';

export default class AddPaymentInstrumentDynamicFieldsPage extends BasePage {
  selectedTSType: TSTypeEntity;

  constructor(props) {
    super(props, {
      enableNextBtn: false,
      dynamicRequiredFields: [],
      piName: '',
    });
    this.inputs = {};
    this.selectedTSType = this.props.navigationProps.piType?.PITransferServiceTypes.find(tsType => tsType.Selected);
  }

  componentDidMount(): void {
    if (this.props.navigationProps.paymentInstrumentRequirements) {
      this.setState({
        dynamicRequiredFields: this.props.navigationProps.direction === 'Withdraw' ?
          _.cloneDeep(this.props.navigationProps.paymentInstrumentRequirements.WithdrawCreatePIFieldRequirements) :
          _.cloneDeep(this.props.navigationProps.paymentInstrumentRequirements.CreatePIFieldRequirements),
      });
    }
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  //Next Button Enable/Disable
  _changeNextBtnState = () => {
    let emptyFields = this.state.dynamicRequiredFields.some(field => {
      return !field.Value && field.Required;
    });

    this.setState({
      enableNextBtn: !emptyFields && !!this.state.piName,
    });
  };

  _updatingFieldValues = (fieldName, value) => {
    if (paymentBankTransferInfoKey.NickName === fieldName) {
      this.setState({piName: value}, () => {
        this._changeNextBtnState();
      });
    } else {
      this.state.dynamicRequiredFields.find(field => field.Name === fieldName).Value = value;
      this.setState({
        dynamicRequiredFields: this.state.dynamicRequiredFields,
      }, () => {
        this._changeNextBtnState();
      });
    }
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === this.state.dynamicRequiredFields.length + 1) {
      return this._onNextButtonPressed();
    } else {
      this.inputs[nextField].focus();
    }
  };

  _nickNameFieldsRender = () => {
    return (
      <View style={pageStyle.dynamicFieldsContainerStyle}>
        <IconBasedTextInput
          onRef={(ref) => {
            this.inputs[0] = ref;
          }}
          showRequiredIndicator
          onSubmitEditing={() => this._focusNextInputField(1)}
          title={paymentBankTransferInfoKey.NickName}
          maxLength={Number(commonConstant.MAX_CHARACTER_20)}
          returnKeyType={'next'}
          onChangeText={(fieldValue) => this._updatingFieldValues(paymentBankTransferInfoKey.NickName, fieldValue)}
        />
      </View>
    );
  };

  _dynamicFieldsRender = () => {
    if (this.state.dynamicRequiredFields.length > 0) {
      return this.state.dynamicRequiredFields.map((field, index) => {
        return (<View key={index} style={pageStyle.dynamicFieldsContainerStyle}>
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs[index + 1] = ref;
            }}
            showRequiredIndicator={field.Required}
            onSubmitEditing={() => this._focusNextInputField(index + 2)}
            title={field.DisplayName}
            maxLength={Number(field.MaxLen)}
            returnKeyType={index === this.state.dynamicRequiredFields.length - 1 ? 'done' : 'next'}
            onChangeText={(fieldValue) => this._updatingFieldValues(field.Name, fieldValue)}
          />
        </View>);
      });
    }
  };

  //Next Button Click Event
  _onNextButtonPressed = async () => {
    const emptyFields = this.state.dynamicRequiredFields.filter(field => field.Required && field.Value !== null).some(field => {
      return field.Value.trim() === '';
    });

    if (emptyFields || !this.state.piName.trim()) {
      return NavigationUtil.showAlert({messageText: strings('addPaymentInstrumentDynamicFieldsPage.alert_fill_details')});
    }

    let PIRequiredFieldValues = this.state.dynamicRequiredFields.map(field => ({Name: field.Name, Value: field.Value === null ? field.Value : field.Value.trim()}));
    return interfaces.createUserPaymentInstruments(this.props.navigationProps.direction, this.props.navigationProps.piType.PIType.PITypeName, this.selectedTSType.TSTypeName, this.state.piName.trim(), PIRequiredFieldValues)
      .then(() => {
        return NavigationUtil.showAlert({
          messageText: strings('addPaymentInstrumentDynamicFieldsPage.alert_successfully_add_account'),
          onRightButtonPress: () => {
            return this._backButton();
          },
        });
      })
      .catch(() => null);
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('addPaymentInstrumentDynamicFieldsPage.title', {title: this.selectedTSType.TSTypeDisplayName})}
          onPressEvent={this._backButton}
          titleColor={commonTheme.COLOR_DEFAULT_LIGHT}/>
        <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}
                                 contentContainerStyle={commonStyle.keyboardScrollViewContentContainer}>
          {this._nickNameFieldsRender()}
          {this._dynamicFieldsRender()}
        </KeyboardAwareScrollView>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('addPaymentInstrumentDynamicFieldsPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}
