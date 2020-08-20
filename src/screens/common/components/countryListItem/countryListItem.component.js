import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import { MediumText } from '../mediumText/mediumText.component';
import { RegularText } from '../regularText/regularText.component';
import { componentStyle } from './countryListItem.style';

export type CountryListItemProps = {
  imageSource?: any,
  countryCode?: string,
  countryName?: string,
}

export type CountryListItemState = {}

class CountryListItem extends PureComponent<CountryListItemProps, CountryListItemState> {
  static defaultProps = {
    imageSource: null,
    countryCode: '',
    countryName: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={componentStyle.contentContainer}>
        <View style={componentStyle.imageContainer}>
          <Image source={this.props.imageSource} style={componentStyle.image}/>
        </View>
        <RegularText style={componentStyle.text}>
          <MediumText>{this.props.countryName + ' '}</MediumText>
          ({this.props.countryCode})
        </RegularText>
      </View>
    );
  }
}

export { CountryListItem };
