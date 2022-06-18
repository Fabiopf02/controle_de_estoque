import React, {useEffect, useState} from 'react';
import {Scroll} from '../../components/Checkout/styles';
import Header from '../../components/Header';
import SaleDetail from '../../components/SaleDetail';
import getRealm from '../../services/realm';
import getFormattedDate from '../../utils/getFormattedDate';
import NoDataIndicator from '../../components/NoDataIndicator';

import {Container, SaleText, SaleTitle, SaleView} from './styles';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState();
  useEffect(() => {
    async function getData() {
      const realm = await getRealm();
      const data = realm.objects('Sales');
      setSales([...data]);
    }
    getData();
  }, []);
  return (
    <Container>
      {selectedSale !== undefined && (
        <SaleDetail sale={selectedSale} setSelectedSale={setSelectedSale} />
      )}
      <Header title="Vendas" />
      {!sales.length ? <NoDataIndicator /> : null}
      {sales.length ? (
        <Scroll>
          {sales?.map(sale => (
            <SaleView key={sale._id} onPress={() => setSelectedSale(sale)}>
              <SaleText>
                <SaleTitle>Produtos selecionados: </SaleTitle>
                {sale.products.length}
              </SaleText>
              <SaleTitle>
                Produtos (unidades):
                <SaleText> {sale.quantity_of_products}</SaleText>
              </SaleTitle>
              <SaleText>
                <SaleTitle>Total: </SaleTitle>
                R$ {sale.total.toFixed(2)}
              </SaleText>
              <SaleText>
                <SaleTitle>Realizada em: </SaleTitle>
                {getFormattedDate(sale.created_at)} -{' '}
                {sale.created_at.toLocaleTimeString()}
              </SaleText>
            </SaleView>
          ))}
        </Scroll>
      ) : null}
    </Container>
  );
};

export default Sales;
