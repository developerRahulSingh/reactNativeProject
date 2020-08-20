import React from 'react';
import { FlatList, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import paymentInstrumentDirection from '../../../constants/payment.instrument.direction.enum';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { TSTypeEntity } from '../../../models/entities';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { BackNavTitle, ButtonWithIconAndArrow, ScreenTitleImage } from '../../common/components';
import { pageStyle } from './selectTransferServiceType.page.style';

export default class SelectTransferServiceTypePage extends BasePage {

  constructor(props) {
    super(props);
  }

  //Back Button Click Event
  _backButton = async () => {
    return NavigationUtil.goBack(this.props.componentId);
  };

  _renderTransferServiceTypesView = (item) => {
    return (
      <View>
        <ButtonWithIconAndArrow
          disableButton={item.disabled}
          buttonClickEvent={() => this._onTransferServiceTypeClick(item)}
          titleDescription={item.TSTypeDisplayName}
        />
      </View>
    );
  };

  _onTransferServiceTypeClick = async (selectedItem: TSTypeEntity) => {
    this.props.navigationProps.piType?.PITransferServiceTypes.forEach(item => {
      item.Selected = item.TSTypeID === selectedItem.TSTypeID;
    });
    let navigationProps = {...this.props.navigationProps};

    return interfaces.getPaymentInstrumentRequirements(this.props.navigationProps.direction, this.props.navigationProps.piType?.PIType.PITypeName,
      this.props.navigationProps.piType?.PITransferServiceTypes.find(tsType => tsType.Selected).TSTypeName)
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
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('selectTransferServiceTypePage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <ScreenTitleImage imageAsset={require('../../../assets/dollar_yellow_circle.png')}/>
        <FlatList bounces={false} contentContainerStyle={pageStyle.flatListStyle}
                  data={this.props.navigationProps.piType?.PITransferServiceTypes}
                  renderItem={({item, index, separators}) => (this._renderTransferServiceTypesView(item))}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
};

