import React, {useEffect, useState} from 'react';
import {BigText} from '../../pages/SellProducts/styles';
import getRealm from '../../services/realm';
import {generateUniqueId} from '../../utils/generateUniqueId';

import {useNavigation} from '@react-navigation/native';

import {
  Block,
  BlockText,
  Center,
  Container,
  FinishButton,
  ProductText,
  ProductView,
  Row,
  Scroll,
  Title,
} from './styles';
import {Alert, StatusBar} from 'react-native';

const Checkout = ({products}) => {
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    function init() {
      let t = 0;
      let am = 0;
      products.map(product => {
        const value = product.price * product.quantity;
        am += product.quantity;
        t += value;
      });
      setQuantity(am);
      setTotal(t);
    }
    init();
  }, [products]);

  const finalizeSale = async () => {
    const realm = await getRealm();
    const sale = {
      _id: generateUniqueId(),
      products,
      total,
      quantity_of_products: quantity,
    };

    realm.write(() => {
      products.map(product => {
        const obj = realm.objectForPrimaryKey('Product', product.barcode);
        obj.quantity -= product.quantity;
      });
      realm.create('Sales', sale);
    });

    realm.close();

    Alert.alert('Sucesso!', 'A venda foi finalizada');

    return navigation.navigate('Home');
  };

  return (
    <Container>
      <StatusBar backgroundColor="#28a74599" barStyle="light-content" />
      <Title>Finalizar venda</Title>
      <Block>
        <BlockText>Produtos selecionados</BlockText>
        <BigText>{products.length}</BigText>
      </Block>
      <Block>
        <BlockText>Produtos (qtde. total)</BlockText>
        <BigText>{quantity}</BigText>
      </Block>
      <Block>
        <BlockText>Total (R$)</BlockText>
        <BigText>R$ {total.toFixed(2)}</BigText>
      </Block>
      <BlockText>Produtos (desc.)</BlockText>
      <Scroll>
        {products.map(product => (
          <ProductView key={product._id}>
            <ProductText>{product.name}</ProductText>
            <Row>
              <ProductText>Preço: R$ {product.price.toFixed(2)}</ProductText>
              <ProductText>Qtde: {product.quantity}</ProductText>
            </Row>
            <ProductText>
              Total: R$ {(product.price * product.quantity).toFixed(2)}
            </ProductText>
            <ProductText>Cód. barras: {product.barcode}</ProductText>
          </ProductView>
        ))}
      </Scroll>
      <Center>
        <FinishButton onPress={finalizeSale}>
          <BlockText>Finalizar</BlockText>
        </FinishButton>
      </Center>
    </Container>
  );
};

export default Checkout;
