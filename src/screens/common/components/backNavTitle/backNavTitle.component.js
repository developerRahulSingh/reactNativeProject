import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { MediumText } from '../mediumText/mediumText.component';
import { NotchPushComponent } from '../notchPush/notchPush.component';
import { componentStyle } from './backNavTitle.style';

export type BackNavTitleProps = {
  disable?: boolean,
  onPressEvent?: ?(any) => void,
  onPressCloseEvent?: ?(any) => void,
  title?: string,
  titleColor?: string,
}

export type BackNavTitleState = {}

class BackNavTitle extends PureComponent<BackNavTitleProps, BackNavTitleState> {
  static defaultProps = {
    disable: false,
    title: '',
    titleColor: commonTheme.COLOR_DEFAULT,
  };

  constructor(props) {
    super(props);
  }

  isLightHeader(): boolean {
    return this.props.titleColor === 'white' || this.props.titleColor === '#FFF' || this.props.titleColor === '#FFFFFF';
  }

  render() {
    const backNavButtonIcon = this.isLightHeader() ? require('../../../../assets/icon_nav_back_arrow_light.png') : require('../../../../assets/icon_nav_back_arrow_dark.png');
    return (
      <View style={componentStyle.contentContainer}>
        <NotchPushComponent/>
        <View style={componentStyle.buttonsContainer}>
          {!!this.props.onPressEvent ?
            <TouchableOpacity style={componentStyle.navButton} onPress={this.props.onPressEvent} disabled={this.props.disable}>
              <Image style={componentStyle.navButtonIcon} source={backNavButtonIcon}/>
            </TouchableOpacity>
            :
            <View/>
          }
          {!!this.props.onPressCloseEvent ?
            <TouchableOpacity style={componentStyle.navButton} onPress={this.props.onPressCloseEvent}>
              <Image style={[componentStyle.navButtonIcon, {tintColor: this.isLightHeader() ? commonTheme.COLOR_BRIGHT : commonTheme.COLOR_DARK}]}
                     source={require('../../../../assets/icon_close.png')}/>
            </TouchableOpacity>
            :
            null
          }
        </View>
        {!!this.props.title ?
          <MediumText style={[componentStyle.title, {color: this.props.titleColor}]}>
            {this.props.title}
          </MediumText>
          :
          null
        }
      </View>
    );
  }
}

export { BackNavTitle };
