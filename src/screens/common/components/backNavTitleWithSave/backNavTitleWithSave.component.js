import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import TitleBarModel from '../../../../models/title.bar.model';
import { MediumText } from '../mediumText/mediumText.component';
import { NotchPushComponent } from '../notchPush/notchPush.component';
import { componentStyle } from './backNavTitleWithSave.style';

export type BackNavTitleWithSaveProps = {
  onPressBack?: ?(any) => void,
  onPressDone?: ?(any) => void,
  titleBar?: TitleBarModel
}

export type BackNavTitleWithSaveState = {}

class BackNavTitleWithSave extends PureComponent<BackNavTitleWithSaveProps, BackNavTitleWithSaveState> {
  static defaultProps = {
    titleBar: new TitleBarModel(),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const backButtonImage = require('../../../../assets/icon_nav_back_light.png');
    const backButtonDisable = !this.props.titleBar.showBackButton;
    const backButton = (backButtonDisable ?
      <View style={[componentStyle.navButtonIcon]}/> :
      <Image style={[componentStyle.navButtonIcon]} source={backButtonImage}/>);
    const rightButtonImage = require('../../../../assets/icon_nav_check_light.png');
    const rightButtonDisable = !this.props.titleBar.showRightButton;
    const rightButton = (rightButtonDisable ?
      <View style={[componentStyle.navButtonIcon]}/> :
      <Image style={[componentStyle.navButtonIcon]} source={rightButtonImage}/>);

    return (
      <View style={[componentStyle.contentContainer, {backgroundColor: this.props.titleBar.backgroundColorCode}]}>
        <NotchPushComponent/>
        <View style={[componentStyle.titleContainer]}>
          <TouchableOpacity onPress={this.props.onPressBack} disabled={backButtonDisable} style={[componentStyle.navButton]}>
            {backButton}
          </TouchableOpacity>
          <MediumText style={[componentStyle.title, {color: this.props.titleBar.textColorCode}]}>
            {this.props.titleBar.title}
          </MediumText>
          <TouchableOpacity onPress={this.props.onPressDone} disabled={rightButtonDisable} style={[componentStyle.navButton]}>
            {rightButton}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { BackNavTitleWithSave };
