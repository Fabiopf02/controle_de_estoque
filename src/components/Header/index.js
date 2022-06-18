import React from 'react';

import {Container, Title} from './styles';

const Header = ({title = '', bg}) => {
  return (
    <Container {...{bg}}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
