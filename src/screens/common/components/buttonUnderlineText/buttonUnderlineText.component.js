import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './buttonUnderlineText.style';

export type ButtonUnderlineTextProps = {
  hideUnderline?: boolean,
  isBold?: boolean,
  titleColor?: string,
  style?: any,
  showSmall?: boolean,
  onPressEvent?: ?(any) => void,
}

export type ButtonUnderlineTextState = {}

class ButtonUnderlineText extends PureComponent<ButtonUnderlineTextProps, ButtonUnderlineTextState> {

  static defaultProps = {
    hideUnderline: false,
    isBold: false,
    titleColor: commonTheme.COLOR_PRIMARY,
    style: {},
    showSmall: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPressEvent} style={this.props.style}>
        <View style={componentStyle.contentContainer}>
          <RegularText style={{
            color: this.props.titleColor,
            fontFamily: this.props.isBold ? commonTheme.FONT_MEDIUM : null,
            textDecorationLine: this.props.hideUnderline ? null : 'underline',
            fontSize: this.props.showSmall ? commonTheme.TEXT_SIZE_SMALL : commonTheme.TEXT_SIZE_DEFAULT,
          }}>
            {this.props.title}
          </RegularText>
        </View>
      </TouchableOpacity>
    );
  }
}

export { ButtonUnderlineText };
