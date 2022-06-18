import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const SaleView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 96%;
  margin-left: 2%;
  background-color: #66666605;
  border-radius: 8px;
  padding: 4px;
  margin-vertical: 6px;
`;

export const SaleTitle = styled.Text`
  font-size: 20px;
  color: #555555;
  font-weight: 600;
`;

export const SaleText = styled.Text`
  font-size: 20px;
  color: #777777;
`;
