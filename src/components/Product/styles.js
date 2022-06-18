import styled from 'styled-components/native';

export const ProductContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 98%;
  z-index: 2;
  min-height: 100px;
  padding: 6px;
  margin-left: 1%;
  background-color: #66666610;
  border-radius: 8px;
  margin-vertical: 6px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Col = styled.View`
  flex: 1;
  padding-left: 4px;
`;

export const ProductImage = styled.Image`
  width: ${props => (props.width ? props.width : '90px')};
  height: ${props => (props.height ? props.height : '90px')};
  border-radius: 8px;
`;

export const ProductName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #444444;
`;

export const ProductProperty = styled(ProductName)`
  font-weight: normal;
`;
