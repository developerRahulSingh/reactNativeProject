import React, { PureComponent } from 'react';
import { View } from 'react-native';
import commonTheme from '../../../../../../themes/common.theme';
import { componentStyle } from './pinDisplay.style';

export type PinDisplayProps = {
  pinCodeLength?: number,
  enteredDigits?: number,
}

export type PinDisplayState = {}

class PINDisplay extends PureComponent<PinDisplayProps, PinDisplayState> {
  static defaultProps = {
    enteredDigits: 0,
    pinCodeLength: 4,
  };

  constructor(props) {
    super(props);
  }

  renderDisplay() {
    return Array.apply(null, Array(this.props.pinCodeLength))
      .map((item, index) => {
        return (
          <View key={index} style={componentStyle.pinViewOuterView}>
            <View style={[componentStyle.pinViewInnerView, {
              aspectRatio: index < this.props.enteredDigits ? 1 / 2 : 1,
              backgroundColor: index < this.props.enteredDigits ? commonTheme.COLOR_PRIMARY_DARK : null,
            }]}/>
          </View>
        );
      });
  }

  render() {
    return (
      <View style={componentStyle.mainContainer}>
        {this.renderDisplay()}
      </View>
    );
  }
}

export { PINDisplay };
