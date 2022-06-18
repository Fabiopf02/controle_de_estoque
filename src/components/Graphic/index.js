import React from 'react';

import {Graphic as GC} from './styles';

const Graphic = ({data, labels}) => {
  return (
    <GC
      data={{
        labels,
        datasets: [
          {
            data: data,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 4,
          },
        ],
      }}
      bezier
    />
  );
};

export default Graphic;
