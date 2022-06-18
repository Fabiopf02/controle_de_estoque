import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

export const Graphic = styled(LineChart).attrs({
  width,
  height: width * 0.6,
  chartConfig: {
    backgroundGradientFrom: '#333333',
    backgroundGradientFromOpacity: 0.9,
    backgroundGradientTo: '#28292b',
    backgroundGradientToOpacity: 0.9,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  },
})``;
