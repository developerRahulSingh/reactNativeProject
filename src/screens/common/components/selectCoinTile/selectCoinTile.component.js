import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import commonTheme from '../../../../themes/common.theme';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './selectCoinTile.style';

export type SelectCoinTileProps = {
  CurrencyName?: string,
  CurrencyURL?: string,
  onSelectionToggle?: ?(any) => void,
  Selected?: boolean,
  CoinBackgroundColor?: string,
}

export type SelectCoinTileState = {}

class SelectCoinTile extends PureComponent<SelectCoinTileProps, SelectCoinTileState> {
  static defaultProps = {
    CurrencyName: '',
    CurrencyURL: null,
    Selected: false,
    CoinBackgroundColor: commonTheme.COLOR_BRIGHT,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.onSelectionToggle ?
      (<TouchableOpacity onPress={this.props.onSelectionToggle} activeOpacity={0.8}>
          {this.renderTile()}
        </TouchableOpacity>
      ) :
      (this.renderTile());
  }

  renderTile() {
    return (
      <View style={[componentStyle.contentContainer]}>
        <View style={[componentStyle.currencyIconContainer, {
          backgroundColor: this.props.CoinBackgroundColor,
          display: this.props.CurrencyURL ? 'flex' : 'none',
        }]}>
          <Image style={[componentStyle.currencyIcon]} source={{uri: this.props.CurrencyURL}}/>
        </View>
        <RegularText style={[componentStyle.currencyLabel]}>
          {this.props.CurrencyName}
        </RegularText>
        <View style={[componentStyle.selectionMarkContainer, componentStyle.selectionMark, {display: this.props.Selected ? 'flex' : 'none'}]}>
          <Image style={[componentStyle.selectionMark, {display: this.props.Selected ? 'flex' : 'none'}]}
                 source={require('../../../../assets/coinCardCheck.png')}/>
        </View>
      </View>
    );
  }
}

export { SelectCoinTile };
