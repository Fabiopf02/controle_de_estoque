import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Area = styled.View`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
  z-index: 4;
  background-color: #00000070;
  justify-content: center;
  align-items: center;
  padding: 6px;
`;

export const Container = styled.View`
  width: 100%;
  height: 96%;
  elevation: 2;
  background-color: #eee;
  border-radius: 10px;
  padding: 6px;
  align-items: center;
`;
