import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import { componentStyle } from './standardTextInput.style';

export type StandardTextInputProps = {
  ...TextInput.propTypes,
  style?: any,
}

export type StandardTextInputState = {}

class StandardTextInput extends PureComponent<StandardTextInputProps, StandardTextInputState> {
  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    return (
      <TextInput
        {...this.props}
        ref={input => this.textInput = input}
        style={[componentStyle.textInput, this.props.style]}
      />
    );
  }
}

export { StandardTextInput };

