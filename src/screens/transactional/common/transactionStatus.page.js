import PropTypes from 'prop-types';
import React from 'react';
import { Clipboard, ScrollView, View } from 'react-native';
import { strings } from '../../../config/i18/i18n';
import { commonStyle } from '../../../styles/common.style';
import commonTheme from '../../../themes/common.theme';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { ButtonUnderlineText, LightText, ScreenTitleImage, StandardButton } from '../../common/components';
import { pageStyle } from './transactionStatus.page.style';

const propTypes = {transactionResult: PropTypes.object};
const defaultProps = {transactionResult: {}};

export default class TransactionStatusPage extends BasePage {
  constructor(props) {
    super(props, {
      showDebug: false,
    }, true);
  }

  _backButtonHandler = async () => {
    console.log('Back Button work as Disable.');
  };

  // See Your Portfolio/Try Again button click event
  _onNextButtonPressed = async () => {
    if (!this.props.isDashboardShown) {
      return NavigationUtil.gotoBottomTabsNavigation();
    } else {
      return NavigationUtil.reset(this.props.componentId);
    }
  };

  _showDebugMessage = (bool) => {
    this.setState({
      showDebug: bool,
    });
  };

  render() {
    return (
      <View style={commonStyle.container}>
        <ScreenTitleImage
          title={this.props.navigationProps.transactionResult?.Status ?
            strings('transactionStatusPage.title')
            : strings('transactionStatusPage.title_failure')}
          imageAsset={this.props.navigationProps.transactionResult?.Status ?
            require('../../../assets/tickmark_circle.png') :
            require('../../../assets/transaction_failed_circle.png')}
          handleNotch={true}
        />
        <View style={pageStyle.subContainerStyle}>
          {!this.props.navigationProps.transactionResult?.ErrorMessage ?
            <LightText style={[pageStyle.successFailureTextStyle, pageStyle.textAlignCenter]}>
              {this.props.navigationProps.transactionResult?.Status ?
                strings('transactionStatusPage.label_success_desc')
                :
                strings('transactionStatusPage.label_failure_desc')}
            </LightText> : null}
          {this.props.navigationProps.transactionResult?.ErrorMessage ?
            <>
              <View>
                <LightText style={pageStyle.textAlignCenter}>
                  {this.props.navigationProps.transactionResult?.ErrorMessage}
                </LightText>
              </View>
              {this.props.navigationProps.transactionResult?.ErrorMessageDebug ?
                <View style={commonStyle.container}>
                  {!this.state.showDebug ?
                    <View style={pageStyle.showDebugContainerStyle}>
                      <ButtonUnderlineText
                        style={pageStyle.showDebugButtonStyle}
                        title={strings('transactionStatusPage.label_button_report_issue')}
                        titleColor={commonTheme.COLOR_SECONDARY_DARK}
                        isBold
                        onPressEvent={() => this._showDebugMessage(true)}
                      />
                    </View>
                    :
                    <View style={pageStyle.scrollViewButtonContainerStyle}>
                      <View style={pageStyle.buttonContainerStyle}>
                        <StandardButton
                          width={'45%'}
                          onPress={async () => await Clipboard.setString(this.props.navigationProps.transactionResult?.ErrorMessageDebug)}
                          color={commonTheme.COLOR_PRIMARY_DARK}
                          labelText={strings('transactionStatusPage.label_button_copy')}
                          showCompact
                        />
                        <StandardButton
                          width={'45%'}
                          onPress={() => this._showDebugMessage(false)}
                          color={commonTheme.COLOR_SECONDARY}
                          labelText={strings('transactionStatusPage.label_button_cancel')}
                          showCompact
                        />
                      </View>
                      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={commonStyle.container}>
                        <View style={commonStyle.container}>
                          <LightText style={[pageStyle.errorMessageTextStyle, pageStyle.textAlignCenter]}>
                            {this.props.navigationProps.transactionResult?.ErrorMessageDebug}
                          </LightText>
                        </View>
                      </ScrollView>
                    </View>
                  }
                </View>
                :
                null
              }
            </>
            : null
          }
        </View>
        <View style={commonStyle.bottomButtonContainer}>
          <StandardButton
            onPress={this._onNextButtonPressed}
            color={commonTheme.COLOR_PRIMARY_DARK}
            labelText={strings('transactionStatusPage.label_button_done')}
          />
        </View>
      </View>
    );
  }
}

TransactionStatusPage.propTypes = propTypes;
TransactionStatusPage.defaultProps = defaultProps;
