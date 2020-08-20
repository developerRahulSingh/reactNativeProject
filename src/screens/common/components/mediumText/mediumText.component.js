import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { componentStyle } from './mediumText.style';

export type MediumTextProps = {
  style?: any
}

export type MediumTextState = {}

class MediumText extends PureComponent<MediumTextProps, MediumTextState> {
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

export { MediumText };
