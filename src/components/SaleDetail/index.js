import React from 'react';
import {Block, BlockText} from '../../pages/Home/styles';
import {SaleText, SaleView} from '../../pages/Sales/styles';
import getFormattedDate from '../../utils/getFormattedDate';
import {Row, Scroll} from '../Checkout/styles';
import Header from '../Header';
import CloseButton from '../CloseButton';

import {Area, Container} from './styles';

const SaleDetail = ({sale, setSelectedSale}) => {
  return (
    <Area>
      {sale !== undefined && (
        <Container>
          <Header title="Detalhes da venda" />
          <Block>
            <BlockText>ID da venda: {sale._id}</BlockText>
            <BlockText>
              Realizada em: {getFormattedDate(sale.created_at)} {' - '}
              {sale.created_at.toLocaleTimeString()}
            </BlockText>
            <BlockText>Total (R$): {sale.total.toFixed(2)}</BlockText>
          </Block>
          <BlockText>Produtos ({sale.products.length})</BlockText>
          <Scroll>
            {sale.products.map(product => (
              <SaleView key={product._id}>
                <SaleText>{product.name}</SaleText>
                <Row>
                  <SaleText>Qtde: {product.quantity}</SaleText>
                  <SaleText>preço: R$ {product.price.toFixed(2)}</SaleText>
                </Row>
                <SaleText>
                  Total: R$ {(product.quantity * product.price).toFixed(2)}
                </SaleText>
                <SaleText>Cód. barras: {product.barcode}</SaleText>
              </SaleView>
            ))}
          </Scroll>
          <CloseButton onPress={() => setSelectedSale(undefined)} />
        </Container>
      )}
    </Area>
  );
};

export default SaleDetail;
