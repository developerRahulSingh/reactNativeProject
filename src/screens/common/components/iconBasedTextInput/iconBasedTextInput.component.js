import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { StandardLabel } from '../standardLabel/standardLabel.component';
import { StandardTextInput } from '../standardTextInput/standardTextInput.component';
import { componentStyle } from './iconBasedTextInput.style';

export type IconBasedTextInputProps = {
  showRequiredIndicator?: boolean,
  requiredIndicatorColor: string,
  onRef?: ?(any) => void,
  onSubmitEditing?: ?(any) => void,
  borderColor?: string,
  icon?: any,
  iconColor?: any,
  maxLength?: number,
  value?: string,
  valueColor?: string,
  placeholderText?: string,
  returnKeyType?: string,
  autoCapitalize?: string,
  secureTextEntry?: boolean,
  placeholderTextColor?: string,
  keyboardType?: string,
  onChangeText?: ?(any) => void,
  autoCorrect?: boolean,
  editable?: boolean,
  title?: string,
  titleColor?: string,
  infoIcon?: string,
  InfoIconButtonPress?: ?(any) => void,
}

export type IconBasedTextInputState = {}

class IconBasedTextInput extends PureComponent<IconBasedTextInputProps, IconBasedTextInputState> {
  static defaultProps = {
    showRequiredIndicator: false,
    requiredIndicatorColor: commonTheme.COLOR_DANGER,
    borderColor: commonTheme.COLOR_LIGHTEST,
    icon: null,
    iconColor: commonTheme.COLOR_DEFAULT_LIGHT,
    maxLength: 20,
    value: null,
    valueColor: commonTheme.COLOR_DEFAULT,
    placeholderText: null,
    returnKeyType: 'next',
    autoCapitalize: 'none',
    secureTextEntry: false,
    placeholderTextColor: commonTheme.COLOR_HINT,
    keyboardType: 'default',
    autoCorrect: false,
    editable: true,
    title: null,
    titleColor: commonTheme.COLOR_DEFAULT_LIGHT,
    infoIcon: null,
  };

  constructor(props) {
    super(props);

    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef?.(this);
    }
  }

  onSubmitEditing() {
    this.props.onSubmitEditing?.();
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    return (
      <View style={componentStyle.mainContainer}>
        {
          !!this.props.title ?
            <View style={componentStyle.titleMainContainer}>
              <StandardLabel showRequiredIndicator={this.props.showRequiredIndicator}
                             requiredIndicatorColor={this.props.requiredIndicatorColor}
                             color={this.props.titleColor}
                             text={this.props.title}/>
              {!!this.props.infoIcon ? <TouchableOpacity
                style={componentStyle.infoIconButtonStyle}
                onPress={this.props.InfoIconButtonPress}>
                <Image style={[componentStyle.infoImageStyle, {display: this.props.icon ? 'flex' : 'none'}]}
                       source={this.props.infoIcon}/>
              </TouchableOpacity> : null}
            </View> :
            null
        }
        <View style={[componentStyle.contentContainer, {borderColor: this.props.borderColor}]}>
          <Image style={[componentStyle.image, {display: this.props.icon ? 'flex' : 'none', tintColor: this.props.iconColor}]}
                 source={this.props.icon}/>
          <StandardTextInput
            ref={input => this.textInput = input}
            onSubmitEditing={this.onSubmitEditing}
            maxLength={this.props.maxLength}
            value={this.props.value}
            style={{color: this.props.valueColor}}
            placeholder={this.props.placeholderText}
            returnKeyType={this.props.returnKeyType}
            autoCapitalize={this.props.autoCapitalize}
            secureTextEntry={this.props.secureTextEntry}
            placeholderTextColor={this.props.placeholderTextColor}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
            autoCorrect={this.props.autoCorrect}
            editable={this.props.editable}
          />
        </View>
      </View>
    );
  }
}

export { IconBasedTextInput };
