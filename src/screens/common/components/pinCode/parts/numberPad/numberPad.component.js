import React, { PureComponent } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { RegularText } from '../../..';
import { componentStyle } from './numberPad.style';

export type NumberPadProps = {
  onPressKey?: ?(item: string | boolean) => void,
  disabled?: boolean
}

export type NumberPadState = {
  width?: number;
  height?: number;
}

class NumberPad extends PureComponent<NumberPadProps, NumberPadState> {
  static defaultProps = {
    onPressKey: () => null,
    disabled: false,
  };
  digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderButton(text: any) {
    return (
      <View style={componentStyle.itemContainer}>
        {!!text ?
          <TouchableOpacity disabled={(this.props.disabled && text >= 0 && text <= 9)} activeOpacity={.5}
                            onPress={() => this.props.onPressKey(text)} style={componentStyle.itemClickContainer}>
            {text >= 0 && text <= 9 ?
              <RegularText style={componentStyle.itemText}>{text}</RegularText> :
              text === 'delete' ?
                <Image style={componentStyle.deleteImage} resizeMode={'contain'} source={require('../../../../../../assets/icon_backspace_black.png')}/>
                : null}
          </TouchableOpacity>
          : null}
      </View>
    );
  }

  render() {
    return (
      <View style={componentStyle.mainContainer}>
        <FlatList
          data={this.digits}
          numColumns={3}
          renderItem={({item, index}) => this.renderButton(item)}
          keyExtractor={index => index}
        />
      </View>
    );
  }
}

export { NumberPad };
