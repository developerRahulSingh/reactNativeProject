import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { MediumText } from '../mediumText/mediumText.component';
import { componentStyle } from './standardButton.style';

export type StandardButtonProps = {
  width?: string,
  visible?: boolean,
  disabled?: boolean,
  onPress?: ?(any) => void,
  color?: string,
  colorDisabled?: string,
  isBottomButton?: boolean,
  showBorder?: boolean,
  borderColor?: string,
  labelColor?: string,
  labelText?: string,
  showCompact?: boolean,
  icon?: any,
  style?: any
}

export type StandardButtonState = {}

class StandardButton extends PureComponent<StandardButtonProps, StandardButtonState> {
  static defaultProps = {
    width: '100%',
    visible: true,
    disabled: false,
    color: commonTheme.COLOR_SECONDARY,
    colorDisabled: commonTheme.COLOR_DISABLED,
    isBottomButton: false,
    showBorder: false,
    borderColor: commonTheme.COLOR_DARK,
    labelColor: commonTheme.COLOR_BRIGHT,
    labelText: null,
    showCompact: false,
    icon: null,
    style: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={[{width: this.props.width, display: this.props.visible ? 'flex' : 'none'}, this.props.style]}
                        activeOpacity={.8}
                        onPress={this.props.onPress}
                        disabled={this.props.disabled}
                        underlayColor={commonTheme.COLOR_BRIGHT}>
        <View style={[componentStyle.container, {
          backgroundColor: this.props.disabled ? this.props.colorDisabled : this.props.color,
          height: this.props.isBottomButton ? this.props.showCompact ? 48 : 72 : this.props.showCompact ? 32 : 48,
          borderRadius: this.props.isBottomButton ? 0 : 4,
          borderWidth: this.props.showBorder ? 1 : 0,
          borderColor: this.props.borderColor,
        }]}>
          {this.props.icon ? <Image style={componentStyle.iconStyle} source={this.props.icon}/> : null}
          <MediumText style={[componentStyle.labelStyle, {color: this.props.labelColor}]}>
            {this.props.labelText}
          </MediumText>
        </View>
      </TouchableOpacity>
    );
  }
}

export { StandardButton };
