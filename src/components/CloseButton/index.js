import React from 'react';
import {CloseBtn, CloseBtnText, CloseIcon} from './styles';

const CloseButton = props => {
  return (
    <CloseBtn {...props}>
      <CloseBtnText>Fechar</CloseBtnText>
      <CloseIcon />
    </CloseBtn>
  );
};

export default CloseButton;
