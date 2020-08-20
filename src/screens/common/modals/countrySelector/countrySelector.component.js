import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import commonTheme from '../../../../themes/common.theme';
import { CountryListItem, StandardButton, StandardTextInput } from '../../components';
import { BaseModal } from '../base.modal';
import { componentStyle } from './countrySelector.style';

const _propTypes = {
  itemData: PropTypes.any,
  onItemSelected: PropTypes.func,
};

const _defaultProps = {
  itemData: {},
  onItemSelected: () => {
  },
};

export default class CountrySelector extends BaseModal {
  constructor(props) {
    super(props);
    this.textInput = {};
    this.state = {
      countries: [],
    };
  }

  componentDidMount() {
    super.componentDidMount();
    const newData = this.props.itemData.Countries
      .filter(country => !!country.PhonePrefixes && country.PhonePrefixes.length > 0)
      .sort((firstItem, secondItem) => firstItem.CountryName.localeCompare(secondItem.CountryName));

    this.setState({
      countries: newData,
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

  renderCountryView = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={async () => this._onItemSelected(item)}>
        <CountryListItem imageSource={{uri: `${this.props.itemData.CountryFlagBaseURL}${item.CountryCode}/flag.png`}}
                         countryCode={item.PhonePrefixes[0]} countryName={item.CountryName}/>
      </TouchableOpacity>
    );
  };

  searchCountryCode(text) {
    const textData = text.toUpperCase();
    const newData = this.props.itemData.Countries
      .filter(country => {
        const itemData = `${country.PhonePrefixes[0]} ${country.CountryName}`.toUpperCase();
        return itemData.indexOf(textData) > -1 && !!country.PhonePrefixes && country.PhonePrefixes.length > 0;
      })
      .sort((firstItem, secondItem) => firstItem.CountryName.localeCompare(secondItem.CountryName));
    this.setState({
      countries: newData,
    });
  }

  _searchBounce = (text: string) => {
    if (!!this.timerHook) {
      clearTimeout(this.timerHook);
    }
    this.timerHook = setTimeout(() => {
      this.searchCountryCode(text);
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
                placeholder={strings('countrySelectorComponent.placeholder_search')}
                placeholderTextColor={commonTheme.COLOR_HINT}
                onChangeText={text => this._searchBounce(text)}
              />
            </View>
          </View>
          {this.state.countries && this.state.countries.length > 0 ?
            <FlatList
              bounces={false}
              contentContainerStyle={[componentStyle.listView]}
              data={this.state.countries}
              renderItem={({item, index, separators}) => this.renderCountryView(item)}
              keyExtractor={(item, index) => index.toString()}
            /> :
            null}
          <StandardButton showCompact={true} isBottomButton={true} color={commonTheme.COLOR_PRIMARY_DARK}
                          labelText={strings('countrySelectorComponent.label_button_cancel')} onPress={this.close}/>
        </View>
      </View>
    );
  }
}

CountrySelector.propTypes = _propTypes;
CountrySelector.defaultProps = _defaultProps;
