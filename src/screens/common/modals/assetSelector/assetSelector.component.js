import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import commonTheme from '../../../../themes/common.theme';
import { MediumText, RegularText, StandardButton, StandardTextInput } from '../../components';
import { BaseModal } from '../base.modal';
import { componentStyle } from './assetSelector.style';

const _propTypes = {
  itemData: PropTypes.any,
  onItemSelected: PropTypes.func,
};

const _defaultProps = {
  itemData: {},
  onItemSelected: () => {
  },
};

export default class AssetSelector extends BaseModal {
  constructor(props) {
    super(props);
    this.textInput = {};
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.setState({
      currencies: this.props.itemData.Currencies,
    });
  }

  focus() {
    this.textInput.focus();
  }

  _onItemSelected = async (item: any) => {
    return this.close()
      .then(async () => {
        return this.props.onItemSelected(item);
      });
  };

  renderCurrencyView = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={async () => this._onItemSelected(item)}>
        <View style={componentStyle.currencyItemContainer}>
          <View style={[componentStyle.imageItemContainer, {backgroundColor: item.HexCode}]}>
            <Image style={componentStyle.imageStyle}
                   source={{uri: `${this.props.itemData.CurrencyFlagBaseURL}${item.CurrencyCode}/symbol.png`}}/>
          </View>
          <RegularText style={componentStyle.currencyNameTextContainer}>
            <MediumText>{item.CurrencyName + ' '}</MediumText>
            ({item.CurrencyCode})
          </RegularText>
        </View>
      </TouchableOpacity>
    );
  };

  searchCurrencyCode(text) {
    const textData = text.toUpperCase();
    const newData = this.props.itemData.Currencies
      .filter(currency => {
        const itemData = `${currency.CurrencyName} (${currency.CurrencyCode})`.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      .sort((firstItem, secondItem) => firstItem.CurrencyName.localeCompare(secondItem.CurrencyName));
    this.setState({
      currencies: newData,
    });
  }

  _searchBounce = (text: string) => {
    if (!!this.timerHook) {
      clearTimeout(this.timerHook);
    }
    this.timerHook = setTimeout(() => {
      this.searchCurrencyCode(text);
    }, 300);
  };

  render() {
    return (
      <View style={[componentStyle.backdrop]}>
        <View style={[componentStyle.container]}>
          <View style={componentStyle.subContainer}>
            <View style={componentStyle.textInputContainer}>
              <StandardTextInput
                style={[componentStyle.textInput]}
                ref={input => this.textInput = input}
                placeholder={strings('assetSelectorComponent.placeholder_search')}
                placeholderTextColor={commonTheme.COLOR_HINT}
                onChangeText={text => this._searchBounce(text)}
              />
            </View>
          </View>
          {this.state.currencies && this.state.currencies.length > 0 ?
            <FlatList
              bounces={false}
              contentContainerStyle={[componentStyle.listView]}
              data={this.state.currencies}
              renderItem={({item, index, separators}) => this.renderCurrencyView(item)}
              keyExtractor={(item, index) => index.toString()}
            /> :
            null}
          <StandardButton showCompact={true} isBottomButton={true} color={commonTheme.COLOR_PRIMARY_DARK}
                          labelText={strings('assetSelectorComponent.label_button_cancel')} onPress={this.close}/>
        </View>
      </View>
    );
  }
}

AssetSelector.propTypes = _propTypes;
AssetSelector.defaultProps = _defaultProps;
