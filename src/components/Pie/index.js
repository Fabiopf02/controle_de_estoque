import React from 'react';
import {Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

const Pie = ({data, acessor}) => {
  return (
    <PieChart
      data={data}
      width={width}
      height={width * 0.6}
      chartConfig={{
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      }}
      accessor={acessor}
      backgroundColor="#08130Dee"
      paddingLeft="0"
      center={[3, 5]}
    />
  );
};

export default Pie;
