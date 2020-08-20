import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { componentStyle } from './boldText.style';

export type BoldTextProps = {
  style?: any
}

export type BoldTextState = {}

class BoldText extends PureComponent<BoldTextProps, BoldTextState> {
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

export { BoldText };
