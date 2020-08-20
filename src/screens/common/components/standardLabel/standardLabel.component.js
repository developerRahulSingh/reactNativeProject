import React, { PureComponent } from 'react';
import commonTheme from '../../../../themes/common.theme';
import { LightText } from '../lightText/lightText.component';
import { componentStyle } from './standardLabel.style';

export type StandardLabelProps = {
  color?: string,
  text?: string,
  showRequiredIndicator?: boolean,
  requiredIndicatorColor?: string,
}

export type StandardLabelState = {}

class StandardLabel extends PureComponent<StandardLabelProps, StandardLabelState> {
  static defaultProps = {
    color: commonTheme.COLOR_DEFAULT_LIGHT,
    text: '',
    showRequiredIndicator: false,
    requiredIndicatorColor: commonTheme.COLOR_DANGER,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LightText style={[componentStyle.title, {color: this.props.color}]}>
        {this.props.text}{this.props.showRequiredIndicator ?
        <LightText style={[componentStyle.title, componentStyle.requiredIndicatorStyle, {color: this.props.requiredIndicatorColor}]}> *</LightText> :
        null}
      </LightText>
    );
  }
}

export { StandardLabel };
