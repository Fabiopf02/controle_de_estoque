import React from 'react';
import * as EmptyJSON from '../../assets/empty.json';
import LottieView from 'lottie-react-native';
import styled from 'styled-components';
import {View, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const Container = styled(View)`
  min-width: 100%;
  height: ${height - 100}px;
  align-items: center;
  justify-content: center;
`;

const NoDataIndicator = () => {
  return (
    <Container>
      <LottieView source={EmptyJSON} autoPlay style={{width: '100%'}} />
    </Container>
  );
};

export default NoDataIndicator;
