import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { BoldText } from '../boldText/boldText.component';
import { LightText } from '../lightText/lightText.component';
import { componentStyle } from './buttonWithIconArrow.style';

export type ButtonWithIconAndArrowProps = {
  imageLink?: any,
  disableButton?: boolean,
  displayArrow?: boolean,
  buttonClickEvent?: (any)=> void,
  titleDescription?: string,
  subTitle?: string,
  subTitleAdditionalText?: string,
}

export type ButtonWithIconAndArrowState = {}


class ButtonWithIconAndArrow extends PureComponent<ButtonWithIconAndArrowProps, ButtonWithIconAndArrowState> {

  static defaultProps = {
    disableButton: false,
    imageLink: null,
    displayArrow: true,
    titleDescription: '',
    subTitle: '',
    subTitleAdditionalText: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={[componentStyle.buttonStyle]} activeOpacity={0.8} onPress={this.props.buttonClickEvent}
                        disabled={this.props.disableButton}>
        {!!this.props.imageLink ?
          <Image style={[componentStyle.iconStyle, this.props.disableButton ? {tintColor: commonTheme.COLOR_LIGHTEST} : {}]}
                 resizeMode='contain' source={this.props.imageLink}/> :
          null}
        <View style={componentStyle.textArea}>
          <LightText style={[componentStyle.textStyle, this.props.disableButton ? {color: commonTheme.COLOR_LIGHTEST} : {}]}>
            {this.props.titleDescription}
          </LightText>
          {this.props.subTitle ? <LightText style={[componentStyle.subTitleStyle, this.props.disableButton ? {color: commonTheme.COLOR_LIGHTEST} : {}]}>
            {this.props.subTitle}
            {this.props.subTitleAdditionalText ?
              <BoldText style={componentStyle.subTitleAdditionalTextStyle}>{this.props.subTitleAdditionalText}</BoldText>
              : null
            }
          </LightText> : null}
        </View>
        <Image resizeMode='contain' source={require('../../../../assets/next_arrow_blue.png')}
               style={[componentStyle.imgArrow, {display: this.props.displayArrow === true ? 'flex' : 'none'}, this.props.disableButton ? {tintColor: commonTheme.COLOR_LIGHTEST} : {}]}/>
      </TouchableOpacity>
    );
  }
}

export { ButtonWithIconAndArrow };
