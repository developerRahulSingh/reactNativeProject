import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './menuScreenButton.style';

export type MenuScreenButtonProps = {
  buttonClickEvent?: ?(any)=> void,
  imageLink?: any,
  disableButton?: boolean,
  buttonName?: string,
  buttonNameColor?: string,
}

export type MenuScreenButtonState = {}

class MenuScreenButton extends PureComponent<MenuScreenButtonProps, MenuScreenButtonState> {

  static defaultProps = {
    imageLink: null,
    disableButton: false,
    buttonName: '',
    buttonNameColor: commonTheme.COLOR_BRIGHT,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={componentStyle.contentContainer}>
        <TouchableOpacity style={componentStyle.menuRow} activeOpacity={0.5} disabled={this.props.disableButton}
                          onPress={this.props.buttonClickEvent}>
          <Image style={componentStyle.menuIcon} resizeMode={'contain'} source={this.props.imageLink}/>
          <RegularText style={[componentStyle.menuText, {color: this.props.buttonNameColor}]}>{this.props.buttonName}</RegularText>
        </TouchableOpacity>
      </View>
    );
  };
}

export { MenuScreenButton };
