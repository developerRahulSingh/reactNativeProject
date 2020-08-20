import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { strings } from '../../../../config/i18/i18n';
import commonTheme from '../../../../themes/common.theme';
import { MediumText, StandardButton } from '../../components';
import { BaseModal } from '../base.modal';
import { componentStyle } from './actionModel.style';

const _propTypes = {
  items: PropTypes.array,
  onItemSelected: PropTypes.func,
};
const _defaultProps = {
  items: [],
  onItemSelected: () => {
  },
};

export default class ActionModel extends BaseModal {
  constructor(props) {
    super(props);
  }

  _onItemSelected = async (item: any) => {
    return this.close()
      .then(async () => {
        return this.props.onItemSelected(item);
      });
  };

  renderItems = () => {
    return this.props.items.map((item, index) => {
      return (
        <TouchableOpacity key={index} activeOpacity={0.8} style={componentStyle.itemMainContainer}
                          onPress={async () => this._onItemSelected(item)}>
          <View><Image source={item.image} style={[componentStyle.itemImageStyle, {tintColor: item.tintColor}]}/></View>
          <View><MediumText>{item.label}</MediumText></View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <View style={[componentStyle.screenContainer]}>
        <View style={[componentStyle.mainContainer]}>
          <MediumText style={componentStyle.selectMessageText}>
            {strings('actionModelComponent.label_select_image_from')}
          </MediumText>
          <View style={componentStyle.itemsContainer}>
            {this.renderItems()}
          </View>
          <StandardButton width={'auto'}
                          isBottomButton={true}
                          color={commonTheme.COLOR_PRIMARY_DARK}
                          labelColor={commonTheme.COLOR_BRIGHT}
                          labelText={strings('actionModelComponent.label_button_cancel')} onPress={this.close}/>
        </View>
      </View>
    );
  }
}

ActionModel.propTypes = _propTypes;
ActionModel.defaultProps = _defaultProps;
