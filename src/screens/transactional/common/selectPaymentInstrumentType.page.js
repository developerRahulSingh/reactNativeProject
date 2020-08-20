import React from 'react';
import { FlatList, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDirection from '../../../constants/payment.instrument.direction.enum';
import paymentInstrumentDisplayName from '../../../constants/payment.instrument.display.name.enum';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { PITypeEntity, PITypeTransferServiceTypesEntity, TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, ButtonWithIconAndArrow, ScreenTitleImage } from '../../common/components';
import { pageStyle } from './selectPaymentInstrumentType.page.style';

export default class SelectPaymentInstrumentTypePage extends BasePage {

  constructor(props) {
    super(props, {
      paymentInstrumentTypesList: [],
    });
  }

  componentDidMount = async () => {
    return interfaces.getSupportedPaymentInstrumentTypes(this.props.navigationProps.direction)
      .then((result) => {
        let listData = [...result.SupportedPITypesTransferServiceTypes];

        listData.forEach((piType) => {
          piType.PITransferServiceTypes.forEach((tsType) => {
            if (this.props.navigationProps.direction === paymentInstrumentDirection.Deposit && this.props.navigationProps.purpose !== 'cash') {
              tsType.disabled = tsType.TSTypeName === 'International Wire' || tsType.TSTypeName === 'US Wire' || tsType.TSTypeName === 'UPI / NEFT';
            }
          });
          piType.PIType.disabled = !piType.PITransferServiceTypes.find(tsType => !tsType.disabled);
        });

        if (this.props.navigationProps.direction === paymentInstrumentDirection.Withdraw) {
          listData.push(this._buildPayGlobalType());
        }

        this.setState({
          paymentInstrumentTypesList: listData,
        });
      })
      .catch(() => null);
  };

  _buildPayGlobalType() {
    let payGlobalOption = new PITypeTransferServiceTypesEntity();
    let piPaymentInstrumentForPayGlobal = new PITypeEntity();
    piPaymentInstrumentForPayGlobal.PITypeDisplayName = 'Pay Global';
    piPaymentInstrumentForPayGlobal.PITypeName = 'Pay Global';
    piPaymentInstrumentForPayGlobal.PITypeID = '0';
    piPaymentInstrumentForPayGlobal.disabled = false;
    payGlobalOption.PIType = piPaymentInstrumentForPayGlobal;
    let tsPaymentInstrumentForPayGlobal = new TSTypeEntity();
    tsPaymentInstrumentForPayGlobal.TSTypeDisplayName = 'Pay Global';
    tsPaymentInstrumentForPayGlobal.TSTypeName = 'Pay Global';
    tsPaymentInstrumentForPayGlobal.TSTypeID = '0';
    tsPaymentInstrumentForPayGlobal.Selected = true;
    payGlobalOption.PITransferServiceTypes = [tsPaymentInstrumentForPayGlobal];
    return payGlobalOption;
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  _renderPaymentInstrumentView = (item) => {
    return (
      <View>
        <ButtonWithIconAndArrow
          imageLink={this._mapIconFromFields(item.PIType.PITypeDisplayName)}
          disableButton={item.PIType.disabled}
          buttonClickEvent={() => this._onPaymentMethodRowPressed(item)}
          titleDescription={item.PIType.PITypeDisplayName}
        />
      </View>
    );
  };

  //ICON MAPPING WITH FIELDS
  _mapIconFromFields = (objectName) => {
    if (objectName === paymentInstrumentDisplayName.BankTransfer) {
      return require('../../../assets/cash_green_icon.png');
    } else if (objectName === paymentInstrumentDisplayName.PayGlobal) {
      return require('../../../assets/icon_payglobal_black.png');
    } else {
      return require('../../../assets/id_card.png');
    }
  };

  _onPaymentMethodRowPressed = async (selectedItem: PITypeTransferServiceTypesEntity) => {
    let navigationProps = {
      ...this.props.navigationProps,
      piType: selectedItem,
    };
    if (selectedItem.PIType.PITypeName === 'Pay Global') {
      return NavigationUtil.showAlert({messageText: strings('selectPaymentInstrumentTypePage.error_coming_soon')});
    } else if (selectedItem.PITransferServiceTypes.length === 1) {
      selectedItem.PITransferServiceTypes[0].Selected = true;

      return interfaces.getPaymentInstrumentRequirements(this.props.navigationProps.direction, selectedItem.PIType.PITypeName,
        selectedItem.PITransferServiceTypes.find(tsType => tsType.Selected).TSTypeName)
        .then((result) => {
          let nextScreenID: string;
          if (this.props.navigationProps.direction === paymentInstrumentDirection.Deposit && result.CreatePaymentInstrumentRequired ||
            this.props.navigationProps.direction === paymentInstrumentDirection.Withdraw && result.WithdrawCreatePaymentInstrumentRequired) {
            navigationProps.paymentInstrumentRequirements = result;
            nextScreenID = screenId.Transactional.Common.SelectPaymentInstrumentPage;
          } else {
            nextScreenID = screenId.Transactional.Common.ConfirmTransactionPage;
          }
          return NavigationUtil.gotoScreen(this.props.componentId, nextScreenID, navigationProps);
        })
        .catch(() => null);
    } else {
      return NavigationUtil.gotoScreen(this.props.componentId, screenId.Transactional.Common.SelectTransferServiceTypePage, navigationProps);
    }
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('selectPaymentInstrumentTypePage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <ScreenTitleImage imageAsset={require('../../../assets/dollar_yellow_circle.png')}/>
        <FlatList contentContainerStyle={pageStyle.flatListStyle} bounces={false}
                  data={this.state.paymentInstrumentTypesList}
                  renderItem={({item, index, separators}) => (this._renderPaymentInstrumentView(item))}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
};
