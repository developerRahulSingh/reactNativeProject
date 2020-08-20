import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { BoldText } from '../boldText/boldText.component';
import { LightText } from '../lightText/lightText.component';
import { componentStyle } from './labeledInfoBlock.style';

export type LabeledInfoBlockComponentProps = {
  borderColor?: string,
  icon?: any,
  iconColor?: any,
  value?: string,
  valueColor?: string,
  title?: string,
  titleColor?: string,
  showAsDropdown?: boolean,
  textColor?: string,
  style?: any,
}

export type LabeledInfoBlockComponentState = {}

class LabeledInfoBlockComponent extends PureComponent<LabeledInfoBlockComponentProps, LabeledInfoBlockComponentState> {
  static defaultProps = {
    borderColor: commonTheme.COLOR_LIGHTEST,
    icon: null,
    iconColor: commonTheme.COLOR_DEFAULT_LIGHT,
    value: null,
    valueColor: commonTheme.COLOR_DEFAULT,
    title: null,
    titleColor: commonTheme.COLOR_DEFAULT_LIGHT,
    showAsDropdown: false,
    textColor: commonTheme.COLOR_DEFAULT,
    style: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[componentStyle.mainContainer, this.props.style]}>
        <LightText style={[componentStyle.title, {color: this.props.titleColor, display: !!this.props.title ? 'flex' : 'none'}]}>
          {this.props.title}
        </LightText>
        <View style={[componentStyle.contentContainer, {borderColor: this.props.borderColor}]}>
          <Image style={[componentStyle.image, {display: this.props.icon ? 'flex' : 'none'}]} resizeMode={'contain'} source={this.props.icon}/>
          <BoldText style={[componentStyle.textValue, {color: this.props.textColor}]}>
            {this.props.value}
          </BoldText>
          <Image style={[componentStyle.dropButtonImage, {display: this.props.showAsDropdown ? 'flex' : 'none'}]}
                 resizeMode={'contain'} source={require('../../../../assets/dropBtnSolid.png')}/>
        </View>
      </View>
    );
  }
}

export { LabeledInfoBlockComponent };
