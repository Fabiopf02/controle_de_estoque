import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {RemoveButton} from '../../pages/SellProducts/styles';

export const CloseIcon = styled(Icon).attrs({
  name: 'close-outline',
})`
  font-size: 36px;
  color: #ff5555;
`;

export const CloseBtnText = styled.Text`
  color: #ff6666;
  font-size: 20px;
`;

export const CloseBtn = styled(RemoveButton)`
  padding: 3px;
  position: absolute;
  bottom: 20px;
  width: 50%;
  background-color: #ff888820;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
