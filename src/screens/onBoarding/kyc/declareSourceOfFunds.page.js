import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import screenId from '../../../constants/screen.id.enum';
import interfaces from '../../../interfaces';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { RegularText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './declareSourceOfFunds.page.style';

export default class DeclareSourceOfFundsPage extends BasePage {
  sourceOfFundsData: Array<string>;

  constructor(props) {
    super(props, {
      enableNextBtn: false,
      sourcesOfFunds: [],
    }, true);
  }

  _backButtonHandler = async () => {
    return this._navCloseButtonClick();
  };

  componentDidMount = async () => {
    return interfaces.getSourceOfFunds()
      .then((result) => {
        this.setState({
          sourcesOfFunds: this._buildListData(result.SourceOfFunds, -1),
        }, () => {
          this.sourceOfFundsData = result.SourceOfFunds;
        });
      })
      .catch(() => null);
  };

  _buildListData = (data: Array<string>, selectedIndex: number) => {
    return data.map((element, index) => ({
      title: element,
      isSelected: index === selectedIndex,
    }));
  };

  _onDataItemClicked = (item, selectedIndex) => {
    let newData = this._buildListData(this.sourceOfFundsData, selectedIndex);
    this.setState({
      sourcesOfFunds: newData,
      enableNextBtn: true,
      getSelectedSourceOfFund: this.sourceOfFundsData[selectedIndex],
    });
  };

  _onNextButtonClick = async () => {
    return interfaces.updateSourceOfFunds(this.state.getSelectedSourceOfFund)
      .then((result) => {
        this.props.storeUserData(result);
        // return NavigationUtil.resetToStackRoot(this.props.componentId, screenId.OnBoarding.KYC.ConfirmNamePage);
        return NavigationUtil.gotoScreenWithHideBottomTabs(this.props.componentId, screenId.OnBoarding.KYC.ConfirmNamePage);
      })
      .catch(() => null);
  };

  _renderDataList = (data, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={pageStyle.renderListButtonStyle}
        onPress={() => {
          this._onDataItemClicked(data, index);
        }}>
        <RegularText
          style={[pageStyle.renderListTextStyle, {color: data.title ? commonTheme.COLOR_BRIGHT : commonTheme.COLOR_DARK}]}>
          {data.title}
        </RegularText>
        <Image style={[pageStyle.renderListImageStyle, {display: data.isSelected ? 'flex' : 'none'}]}
               source={require('../../../assets/kyc_source_of_fund_selected.png')}/>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.pageColorStyle]}>
        <ScreenTitleImage title={strings('declareSourceOfFundsPage.title')} titleColor={commonTheme.COLOR_BRIGHT} handleNotch={true}
                          closeButtonEvent={this._navCloseButtonClick}/>
        <View style={pageStyle.flatListsContainerStyle}>
          <FlatList
            data={this.state.sourcesOfFunds}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={pageStyle.flatListsContentContainerStyle}
            renderItem={({item, index, separators}) => (this._renderDataList(item, index))}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (!this.state.sourcesOfFunds.length ?
              <RegularText style={pageStyle.flatListEmptyTextStyle}/> : null)}
          />
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonClick}
            color={commonTheme.COLOR_DARK}
            disabled={!this.state.enableNextBtn}
            labelText={strings('declareSourceOfFundsPage.label_button_next')}
          />
        </View>
      </View>
    );
  }
}

