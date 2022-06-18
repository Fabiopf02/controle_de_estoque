import React, {useState, useEffect} from 'react';

import {Container, Block, BlockText, Scroll} from '../Home/styles';
import {Picker} from '@react-native-picker/picker';
import {pickerItemStyle, pickerStyle} from './styles';
import NoDataIndicator from '../../components/NoDataIndicator';

import getRealm from '../../services/realm';
import {
  countByDay,
  countByMonth,
  countByYear,
  countSales,
  getTheBestSellers,
} from '../../utils/analyze';
import Pie from '../../components/Pie';
import {days, months} from '../../Constants';
import Header from '../../components/Header';
import Graphic from '../../components/Graphic';

const Analysis = () => {
  const [top, setTop] = useState();
  const [byYear, setByYear] = useState();
  const [byMonth, setByMonth] = useState();
  const [byDay, setByDay] = useState();
  const [selected, setSelected] = useState('all');
  const [products, setProducts] = useState();

  useEffect(() => {
    async function init() {
      const realm = await getRealm();
      const productsSold = realm.objects('ProductSold');
      if (productsSold.isEmpty()) {
        return;
      }
      const sales = realm.objects('Sales');
      const pdt = realm.objects('Product');
      setProducts([...pdt]);
      if (productsSold.isEmpty()) {
        return;
      }
      setByYear(countByYear(sales, selected));
      setByMonth(countByMonth([...sales], selected));
      setByDay(countByDay(sales, selected));

      const byQuantity = countSales([...productsSold]);
      setTop(getTheBestSellers(byQuantity));

      // realm.close();
    }
    init();
  }, [selected]);

  return (
    <Container>
      <Header title="Análise" />
      {!products && !top && !byYear && !byMonth && !byDay ? (
        <NoDataIndicator />
      ) : null}
      {products !== undefined && (
        <Picker
          style={pickerStyle}
          onValueChange={setSelected}
          selectedValue={selected}
          mode="dialog">
          <Picker.Item label="TODOS" value="all" style={pickerItemStyle} />
          {products.map(product => (
            <Picker.Item
              key={product._id}
              label={product.name}
              value={product._id}
              style={pickerItemStyle}
            />
          ))}
        </Picker>
      )}
      <Scroll>
        {top !== undefined && (
          <Block>
            <BlockText>Top {top.length} produtos (mais vendidos)</BlockText>
            <Pie data={top} acessor="quantity" />
          </Block>
        )}
        {byYear !== undefined && (
          <Block>
            <BlockText>Volume de vendas (anual)</BlockText>
            <Graphic data={byYear.data} labels={byYear.labels} />
          </Block>
        )}
        {byMonth !== undefined && (
          <Block>
            <BlockText>Volume de vendas (mensal)</BlockText>
            <Graphic data={byMonth} labels={months} />
          </Block>
        )}
        {byDay !== undefined && (
          <Block>
            <BlockText>Volume de vendas (semanal)</BlockText>
            <Graphic data={byDay} labels={days} />
          </Block>
        )}
      </Scroll>
    </Container>
  );
};

export default Analysis;
