import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { componentStyle } from './notchPush.style';

export type NotchPushComponentProps = {
  style?: any
}

export type NotchPushComponentState = {}

class NotchPushComponent extends PureComponent<NotchPushComponentProps, NotchPushComponentState> {
  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[componentStyle.container, this.props.style]}/>
    );
  }
}

export { NotchPushComponent };
