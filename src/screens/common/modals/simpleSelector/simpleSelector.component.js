import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import commonTheme from '../../../../themes/common.theme';
import { RegularText, StandardButton } from '../../components';
import { BaseModal } from '../base.modal';
import { componentStyle } from './simpleSelector.style';

const _propTypes = {
  items: PropTypes.array,
  onItemSelected: PropTypes.func,
};

const _defaultProps = {
  items: [],
  onItemSelected: () => {
  },
};

export default class SimpleSelector extends BaseModal {
  constructor(props) {
    super(props);
  }

  _onItemSelected = async (item: any) => {
    return this.close()
      .then(async () => {
        return this.props.onItemSelected(item);
      });
  };

  render() {
    return (
      <View style={[componentStyle.backdrop]}>
        <View style={[componentStyle.container]}>
          <ScrollView bounces={false} contentContainerStyle={[componentStyle.listView]}>
            <View style={componentStyle.subContainer}>
              {this.props.items.map((item, index: number) => {
                const itemStyle = {
                  color: item.selected ? commonTheme.COLOR_PRIMARY_DARK : null,
                  fontSize: item.selected ? commonTheme.TEXT_SIZE_LARGE : commonTheme.TEXT_SIZE_MEDIUM,
                  fontFamily: item.selected ? commonTheme.FONT_MEDIUM : commonTheme.FONT_REGULAR,
                };
                return (
                  <TouchableOpacity activeOpacity={0.6} key={index} style={componentStyle.labelContainer}
                                    onPress={async () => this._onItemSelected(item)}>
                    <RegularText style={[itemStyle, componentStyle.labelTextStyle]}>{item.label}</RegularText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <StandardButton showCompact={true} isBottomButton={true} color={commonTheme.COLOR_PRIMARY_DARK}
                          labelText={strings('simpleSelectorComponent.label_button_cancel')} onPress={this.close}/>
        </View>
      </View>
    );
  }
}

SimpleSelector.propTypes = _propTypes;
SimpleSelector.defaultProps = _defaultProps;
