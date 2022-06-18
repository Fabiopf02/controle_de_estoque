import React, {memo} from 'react';
import getFormattedDate from '../../utils/getFormattedDate';

import {
  ProductContainer,
  ProductImage,
  ProductName,
  ProductProperty,
  Col,
} from './styles';

const Product = ({data, setShow}) => {
  return (
    <ProductContainer onPress={() => setShow(data)}>
      {data.url_image && <ProductImage source={{uri: data.url_image}} />}
      <Col>
        <ProductName>{data.name}</ProductName>
        <ProductProperty>Marca: {data.brand}</ProductProperty>
        <ProductProperty>Preço: R$ {data.price.toFixed(2)}</ProductProperty>
        <ProductProperty>Estoque: {data.quantity} restante(s)</ProductProperty>
        <ProductProperty>
          Val.: {getFormattedDate(data.expiration_date)}
        </ProductProperty>
      </Col>
    </ProductContainer>
  );
};

export default memo(Product);
