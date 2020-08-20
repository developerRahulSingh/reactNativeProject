import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { componentStyle } from './regularText.style';

export type RegularTextProps = {
  style?: any
}

export type RegularTextState = {}

class RegularText extends PureComponent<RegularTextProps, RegularTextState> {
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

export { RegularText };
