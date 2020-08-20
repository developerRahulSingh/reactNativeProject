import moment from 'moment';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../config/i18/i18n';
import screenId from '../../constants/screen.id.enum';
import interfaces from '../../interfaces';
import { commonStyle } from '../../styles/common.style';
import commonTheme from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';
import { BasePage } from '../common/base.page';
import { BackNavTitle, LightText, RegularText, ScreenTitleImage, StandardButton, SwitchButton } from '../common/components';
import { pageStyle } from './profitLossReport.page.style';

export default class ProfitLossReportPage extends BasePage {

  constructor(props) {
    super(props, {
      isSwitchOn: false,
      yearData: [],
      selectYear: new Date().getFullYear() + strings('profitLossReportPage.label_year_to_date'),
    });

    this._onYearSelected = this._onYearSelected.bind(this);
  }

  componentDidMount = () => {
    const userDateObject = new Date(this.props.User.CreatedDate);
    const userDate = moment(userDateObject);
    const userCreateYear = userDate.year();
    const currentYear = new Date().getFullYear();
    let yearDataList = [];
    for (let i = currentYear; i >= userCreateYear; i--) {
      yearDataList.push({key: i + strings('profitLossReportPage.label_year_to_date'), value: i, selected: i === currentYear});
    }
    this.setState({
      yearData: yearDataList,
    });
  };

  _backButton = async () => {
    await NavigationUtil.goBack(this.props.componentId);
  };

  _setPassCodePressed = () => {
    this.setState({
      isSwitchOn: !this.state.isSwitchOn,
    });
  };

  _onSubmitButtonPressed = async () => {
    let year = JSON.stringify(this.state.selectYear);
    year = year.replace(strings('profitLossReportPage.label_year_to_date'), '');
    const FinalYearValue = JSON.parse(year);

    return interfaces.getUserTaxReportingStatementDocument(FinalYearValue, this.state.isSwitchOn ? 'PDF' : 'EXCEL')
      .then(() => {
        return NavigationUtil.showAlert({messageText: strings('profitLossReportPage.alert_send_email_success')});
      })
      .catch(() => null);
  };

  _onShowYearList = async () => {
    await NavigationUtil.showOverlay(screenId.Overlays.YearSelector, {
      items: this.state.yearData,
      onItemSelected: this._onYearSelected,
    });
  };

  _onYearSelected = async (selectedYear) => {
    this.setState({
      selectYear: selectedYear.key,
    }, async () => {
      let fResult = this.state.yearData.map(item => ({...item, selected: item.key === this.state.selectYear}));
      this.setState({
        yearData: fResult,
      });
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <BackNavTitle
          title={strings('profitLossReportPage.title')}
          onPressEvent={this._backButton}
          titleColor={commonTheme.PRIMARY_TEXT_COLOR_LIGHT}/>
        <ScreenTitleImage descriptionText={strings('profitLossReportPage.description')}
                          showLargeDescription={true} descriptionTextColor={commonTheme.PRIMARY_TEXT_COLOR_DARK}/>
        <View style={pageStyle.selectYearButtonContainer}>
          <TouchableOpacity
            style={pageStyle.selectYearButtonSubContainer}
            onPress={this._onShowYearList}>
            <View>
              <LightText style={pageStyle.selectYearTextStyle}>
                {strings('profitLossReportPage.label_select_year')}
              </LightText>
              <RegularText>
                {this.state.selectYear.toString()}
              </RegularText>
            </View>
            <Image style={pageStyle.dropSolidImageStyle} resizeMode={'contain'}
                   source={require('../../assets/dropBtnSolid.png')}/>
          </TouchableOpacity>
        </View>
        <View style={pageStyle.pdfExcelSelectionContainer}>
          <RegularText style={[pageStyle.descriptionTextStyle]}>
            {strings('profitLossReportPage.label_excel')}
          </RegularText>
          <SwitchButton
            value={this.state.isSwitchOn}//false-Excel,true-PDF
            onValueChange={this._setPassCodePressed}
            containerStyle={pageStyle.switchButtonContainerStyle}
          />
          <RegularText style={[pageStyle.descriptionTextStyle]}>
            {strings('profitLossReportPage.label_pdf')}
          </RegularText>
        </View>
        <View style={pageStyle.bottomButtonContainerStyle}>
          <StandardButton
            onPress={this._onSubmitButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('profitLossReportPage.label_button_submit')}
          />
        </View>
      </View>
    );
  }
}
