import React, { PureComponent } from 'react';
import { Animated, Text, TouchableWithoutFeedback, View } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import commonTheme from '../../../../themes/common.theme';
import { componentStyle } from './switchButton.style';

export type SwitchButtonProps = {
  activeText?: string,
  activeTextStyle?: Text.propTypes.style,
  backgroundActive?: string,
  backgroundInactive?: string,
  barHeight?: number,
  changeValueImmediately?: boolean,
  circleActiveColor?: string,
  circleBorderActiveColor?: string,
  circleBorderInactiveColor?: string,
  circleBorderWidth?: number,
  circleInActiveColor?: string,
  circleSize?: number,
  containerStyle?: View.propTypes.style,
  disabled?: boolean,
  inActiveText?: string,
  inactiveTextStyle?: Text.propTypes.style,
  innerCircleStyle?: View.propTypes.style,
  onValueChange?: ?(value: boolean) => void,
  outerCircleStyle?: View.propTypes.style,
  renderActiveText?: boolean,
  renderInActiveText?: boolean,
  renderInsideCircle?: ?(any) => void,
  switchLeftPx?: number,
  switchRightPx?: number,
  switchWidthMultiplier?: number,
  value?: boolean,
}

export type SwitchButtonState = {
  value: boolean,
  transformSwitch: any,
  backgroundColor: any,
  circleColor: any,
  circleBorderColor: any,
}

class SwitchButton extends PureComponent<SwitchButtonProps, SwitchButtonState> {
  static defaultProps = {
    activeText: 'On',
    activeTextStyle: {},
    backgroundActive: commonTheme.COLOR_SUCCESS,
    backgroundInactive: commonTheme.COLOR_HINT,
    barHeight: 24,
    changeValueImmediately: true,
    circleActiveColor: commonTheme.COLOR_BRIGHT,
    circleBorderActiveColor: commonTheme.COLOR_DEFAULT_LIGHT,
    circleBorderInactiveColor: commonTheme.COLOR_DEFAULT,
    circleBorderWidth: 0,
    circleInActiveColor: commonTheme.COLOR_BRIGHT,
    circleSize: 24,
    containerStyle: {},
    disabled: false,
    inActiveText: 'Off',
    inactiveTextStyle: {},
    innerCircleStyle: commonStyle.switchInnerCircleStyle,
    outerCircleStyle: {},
    renderActiveText: false,
    renderInActiveText: false,
    switchLeftPx: 2,
    switchRightPx: 2,
    switchWidthMultiplier: 2,
    value: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value,
      transformSwitch: new Animated.Value(
        props.value
          ? props.circleSize / props.switchLeftPx
          : -props.circleSize / props.switchRightPx,
      ),
      backgroundColor: new Animated.Value(props.value ? 75 : -75),
      circleColor: new Animated.Value(props.value ? 75 : -75),
      circleBorderColor: new Animated.Value(props.value ? 75 : -75),
    };

    this.handleSwitch = this.handleSwitch.bind(this);
    this.animateSwitch = this.animateSwitch.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<SwitchButtonProps>, prevState: Readonly<SwitchButtonState>, snapshot): void {
    const {value, disabled} = this.props;
    if (prevProps.value === value) {
      return;
    }
    if (prevProps.disabled && disabled === prevProps.disabled) {
      return;
    }

    this.animateSwitch(value, () => this.setState({value}));
  }

  handleSwitch() {
    const {value} = this.state;
    const {
      onValueChange,
      disabled,
      changeValueImmediately,
      value: propValue,
    } = this.props;
    if (disabled) {
      return;
    }

    if (changeValueImmediately) {
      this.animateSwitch(!propValue);
      onValueChange?.(!propValue);
    } else {
      this.animateSwitch(!value, () => {
        this.setState({value: !value}, () => onValueChange?.(this.state.value));
      });
    }
  }

  animateSwitch(value, cb = () => {
  }) {
    Animated.parallel([
      Animated.spring(this.state.transformSwitch, {
        toValue: value
          ? this.props.circleSize / this.props.switchLeftPx
          : -this.props.circleSize / this.props.switchRightPx,
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
      Animated.timing(this.state.circleColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
      Animated.timing(this.state.circleBorderColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
    ]).start(cb);
  }

  render() {
    const {transformSwitch, backgroundColor, circleColor, circleBorderColor} = this.state;

    const {
      backgroundActive,
      backgroundInactive,
      circleActiveColor,
      circleInActiveColor,
      activeText,
      inActiveText,
      circleSize,
      containerStyle,
      activeTextStyle,
      inactiveTextStyle,
      barHeight,
      circleInactiveBorderColor,
      circleActiveBorderColor,
      circleBorderWidth,
      innerCircleStyle,
      outerCircleStyle,
      renderActiveText,
      renderInActiveText,
      renderInsideCircle,
      switchWidthMultiplier,
    } = this.props;

    const interpolatedColorAnimation = backgroundColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [backgroundInactive, backgroundActive],
    });

    const interpolatedCircleColor = circleColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInActiveColor, circleActiveColor],
    });

    const interpolatedCircleBorderColor = circleBorderColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInactiveBorderColor, circleActiveBorderColor],
    });

    return (
      <TouchableWithoutFeedback onPress={this.handleSwitch}>
        <Animated.View
          style={[componentStyle.container,
            {
              backgroundColor: interpolatedColorAnimation,
              width: circleSize * switchWidthMultiplier,
              height: barHeight || circleSize,
              borderRadius: circleSize,
            },
            containerStyle,
          ]}>
          <Animated.View
            style={[componentStyle.animatedContainer, outerCircleStyle,
              {
                left: transformSwitch,
                width: circleSize * switchWidthMultiplier,
              },
            ]}>
            {renderActiveText && (
              <Text style={[componentStyle.text, componentStyle.paddingRight, activeTextStyle]}>
                activeText
              </Text>
            )}

            <Animated.View
              style={[componentStyle.circle,
                {
                  borderWidth: circleBorderWidth,
                  borderColor: interpolatedCircleBorderColor,
                  backgroundColor: interpolatedCircleColor,
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize / 2,
                },
                innerCircleStyle,
              ]}>
              {renderInsideCircle?.()}
            </Animated.View>
            {renderInActiveText && (
              <Text style={[componentStyle.text, componentStyle.paddingLeft, inactiveTextStyle]}>
                {inActiveText}
              </Text>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export { SwitchButton };
