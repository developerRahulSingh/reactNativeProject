import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { componentStyle } from './lightText.style';

export type LightTextProps = {
  style?: any
}

export type LightTextState = {}

class LightText extends PureComponent<LightTextProps, LightTextState> {
  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[componentStyle.fontStyle, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

export { LightText };
