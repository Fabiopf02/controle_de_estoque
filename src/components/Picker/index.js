import React from 'react';
import {Picker as RNPicker} from '@react-native-picker/picker';

const style = {
  backgroundColor: '#ffffff35',
  fontWeight: 'bold',
  marginVertical: 16,
  width: '92%',
  left: '4%',
};

const Picker = ({selected, options, onChange = () => {}}) => {
  return (
    <RNPicker
      selectedValue={selected}
      style={style}
      onValueChange={onChange}
      mode="dialog">
      {options.map(product => (
        <RNPicker.Item
          key={product._id}
          label={product.name}
          value={product._id}
        />
      ))}
    </RNPicker>
  );
};

export default Picker;
