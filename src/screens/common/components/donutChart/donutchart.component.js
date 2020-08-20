import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { G, Image, Text } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import commonTheme from '../../../../themes/common.theme';
import { componentStyle } from './donutchart.style';

export type DonutChartComponentProps = {
  currenciesData?: Array
}

export type DonutChartComponentState = {}


class DonutChartComponent extends PureComponent<DonutChartComponentProps, DonutChartComponentState> {

  static defaultProps = {
    currenciesData: [],
  };

  constructor(props) {
    super(props);
  }

  render() {
    let iteratedData = this.props.currenciesData.map((coin, index) => (
      {
        key: index + 1,
        amount: coin.Percentage,
        svg: {fill: coin.hexCode},
        url: `${coin.flagURL}${coin.currencyCode}/symbol.png`,
      }
    ));

    const Labels = ({slices}) => {
      return slices.map((slice, index) => {
        const {labelCentroid, data} = slice;
        if (data.amount >= 10) {
          return (
            <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
              <Image x={-15} y={-15} width={30} height={30} preserveAspectRatio="xMidYMid slice" opacity="1" href={{uri: data.url}}/>
              <Text fill={commonTheme.COLOR_BRIGHT} fontSize={commonTheme.TEXT_SIZE_SMALL} textAnchor={'middle'} y={25}>
                {data.amount + '%'}
              </Text>
            </G>
          );
        } else if (data.amount <= 9 && data.amount >= 7) {
          return (
            <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
              <Image x={-15} y={-15} width={30} height={30} preserveAspectRatio="xMidYMid slice" opacity="1" href={{uri: data.url}}/>
            </G>
          );
        } else {
          return (
            <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}/>
          );
        }
      });
    };
    return (
      <View style={componentStyle.donutContainer}>
        <PieChart style={componentStyle.donutStyle} valueAccessor={({item}) => item.amount} data={iteratedData} spacing={0} outerRadius={'98%'}
                  innerRadius={'30%'} padAngle={0}>
          <Labels/>
        </PieChart>
      </View>
    );
  }
}

export { DonutChartComponent };
