import PropTypes from 'prop-types';
import React from 'react';
import { Clipboard, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import commonTheme from '../../../../themes/common.theme';
import { LightText, MediumText, StandardButton } from '../../components';
import { BaseModal } from '../base.modal';
import { componentStyle } from './commonAlert.style';

const _propTypes = {
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func,
  onMessageCopyButtonPress: PropTypes.func,
  onDismiss: PropTypes.func,
  leftButtonText: PropTypes.string,
  rightButtonText: PropTypes.string,
  messageText: PropTypes.string,
  messageTextDebug: PropTypes.string,
  alertTitle: PropTypes.string,
  disableLeftButton: PropTypes.bool,
  disableRightButton: PropTypes.bool,
};
const _defaultProps = {
  onLeftButtonPress: null,
  onRightButtonPress: () => null,
  onMessageCopyButtonPress: () => null,
  onDismiss: null,
  leftButtonText: strings('commonAlertComponent.label_button_cancel'),
  rightButtonText: strings('commonAlertComponent.label_button_okay'),
  messageText: '',
  messageTextDebug: '',
  alertTitle: '',
  disableLeftButton: false,
  disableRightButton: false,
};

export default class CommonAlert extends BaseModal {
  constructor(props) {
    super(props);

    this.state = {
      showDebug: false,
    };
  }

  _onLeftButtonPress = async () => {
    return this.close()
      .then(() => this.props.onLeftButtonPress());
  };

  _onRightButtonPress = async () => {
    return this.close()
      .then(() => this.props.onRightButtonPress());
  };

  _onDismiss = async () => {
    return this.close()
      .then(() => this.props.onDismiss());
  };

  _showDebugInfo = (bool) => {
    this.setState({
      showDebug: bool,
    });
  };

  _copyMessageTextDebug = async () => {
    return this.close()
      .then(() => {
        Clipboard.setString(this.props.messageTextDebug);
        if (!!this.props.onMessageCopyButtonPress) {
          this.props.onMessageCopyButtonPress();
        }
      });
  };

  render() {
    return (
      <View style={[componentStyle.backdrop]}>
        <View style={[componentStyle.container]}>
          {!!this.props.alertTitle || !!this.props.onDismiss ?
            <View style={componentStyle.titleCloseButtonContainer}>
              {!!this.props.alertTitle ?
                <View style={componentStyle.titleContainer}>
                  <MediumText style={componentStyle.titleTextStyle}>
                    {this.props.alertTitle}
                  </MediumText>
                </View> : null}
              {!!this.props.onDismiss ?
                <TouchableOpacity activeOpacity={.8} style={[componentStyle.closeButton]} onPress={this._onDismiss}>
                  <Image source={require('../../../../assets/img_close.png')}
                         style={componentStyle.closeButtonImage}/>
                </TouchableOpacity> :
                null}
            </View> :
            null}
          <View style={componentStyle.messageMainContainer}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={[componentStyle.listView]}>
              <View style={componentStyle.messageSubContainer}>
                <LightText style={componentStyle.messageTextStyle}>
                  {this.props.messageText}
                </LightText>
                {this.state.showDebug ? <View style={componentStyle.messageDebugContainer}>
                  <MediumText style={componentStyle.messageTextStyle}>
                    {strings('commonAlertComponent.label_error_details')}
                  </MediumText>
                  <LightText style={componentStyle.messageTextStyle}>
                    {this.props.messageTextDebug}
                  </LightText>
                </View> : null}
              </View>
            </ScrollView>
          </View>
          <View style={componentStyle.buttonContainer}>
            {!!this.props.onLeftButtonPress ?
              <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableLeftButton} width={'auto'} showCompact
                              isBottomButton={true}
                              color={commonTheme.COLOR_SECONDARY}
                              labelText={this.props.leftButtonText} onPress={this._onLeftButtonPress}/> :
              null
            }
            {!!this.props.messageTextDebug && !this.state.showDebug ?
              <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableLeftButton} width={'auto'} showCompact
                              isBottomButton={true}
                              color={commonTheme.COLOR_SECONDARY}
                              labelText={strings('commonAlertComponent.label_button_show_details')} onPress={() => this._showDebugInfo(true)}/> :
              null
            }
            {!!this.props.messageTextDebug && !!this.state.showDebug ?
              <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableLeftButton} width={'auto'} showCompact
                              isBottomButton={true}
                              color={commonTheme.COLOR_SECONDARY}
                              labelText={strings('commonAlertComponent.label_button_cancel')} onPress={() => this._showDebugInfo(false)}/> :
              null
            }
            {!!this.state.showDebug ?
              <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableRightButton} width={'auto'} showCompact
                              isBottomButton={true} color={commonTheme.COLOR_PRIMARY_DARK}
                              labelText={strings('commonAlertComponent.label_button_copy_error')} onPress={this._copyMessageTextDebug}/>
              :
              <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableRightButton} width={'auto'} showCompact
                              isBottomButton={true} color={commonTheme.COLOR_PRIMARY_DARK}
                              labelText={this.props.rightButtonText} onPress={this._onRightButtonPress}/>
            }
          </View>
        </View>
      </View>
    );
  }
}

CommonAlert.propTypes = _propTypes;
CommonAlert.defaultProps = _defaultProps;
