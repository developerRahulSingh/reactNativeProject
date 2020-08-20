import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { LightText } from '../lightText/lightText.component';
import { MediumText } from '../mediumText/mediumText.component';
import { NotchPushComponent } from '../notchPush/notchPush.component';
import { componentStyle } from './screenTitleImage.style';

export type ScreenTitleImageProps = {
  handleNotch?: boolean,
  imageAsset?: any,
  imageAssetBackground?: string,
  imageColor?: string,
  title?: string,
  titleColor?: string,
  descriptionText?: string,
  descriptionTextColor?: string,
  showLargeDescription?: boolean,
  closeButtonEvent?: ?(any) => void,
}

export type ScreenTitleImageState = {}

class ScreenTitleImage extends PureComponent<ScreenTitleImageProps, ScreenTitleImageState> {
  static defaultProps = {
    handleNotch: false,
    imageAsset: null,
    imageAssetBackground: commonTheme.COLOR_BRIGHT,
    imageColor: null,
    title: null,
    titleColor: commonTheme.COLOR_DEFAULT,
    descriptionText: null,
    descriptionTextColor: commonTheme.COLOR_DEFAULT_LIGHT,
    showLargeDescription: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <NotchPushComponent style={{display: this.props.handleNotch ? 'flex' : 'none'}}/>
        <View style={componentStyle.contentContainer}>
          <View style={componentStyle.titleButtonContainer}>
            <MediumText style={[componentStyle.title, {
              paddingLeft: !!this.props.closeButtonEvent ? 20 : 0,
              color: this.props.titleColor,
              display: (!!this.props.title ? 'flex' : 'none'),
            }]}>
              {this.props.title}
            </MediumText>
            <TouchableOpacity style={[componentStyle.closeButtonStyle, {display: !!this.props.closeButtonEvent ? 'flex' : 'none'}]} onPress={this.props.closeButtonEvent}>
              <Image style={[componentStyle.closeButtonImageStyle, {tintColor: this.props.titleColor}]}
                     source={require('../../../../assets/icon_close.png')}/>
            </TouchableOpacity>
          </View>
          <View style={[componentStyle.imageContainer, componentStyle.image, {
            backgroundColor: this.props.imageAssetBackground,
            display: (!!this.props.imageAsset ? 'flex' : 'none'),
          }]}>
            <Image style={[componentStyle.image, {tintColor: this.props.imageColor}]} source={this.props.imageAsset}/>
          </View>
          <View style={[componentStyle.descriptionContainer, {display: (!!this.props.descriptionText ? 'flex' : 'none')}]}>
            <LightText style={[componentStyle.description, {
              color: this.props.descriptionTextColor,
              fontSize: this.props.showLargeDescription ? commonTheme.TEXT_SIZE_MEDIUM : null,
            }]}>
              {this.props.descriptionText}
            </LightText>
          </View>
        </View>
      </>
    );
  }
}

export { ScreenTitleImage };
