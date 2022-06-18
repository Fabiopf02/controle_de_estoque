import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import Header from '../../components/Header';
import Product from '../../components/Product';
import getRealm from '../../services/realm';
import NoDataIndicator from '../../components/NoDataIndicator';
import ProductDetails from '../../components/ProductDetails';

import {Container, List} from './styles';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const realm = await getRealm();
      const response = realm.objects('Product');
      console.log(response);
      setProducts([...response]);
    }
    getProducts();
  }, []);

  return (
    <Container>
      <Header bg="#5dc97aaa" title="Produtos" />
      {!products.length ? <NoDataIndicator /> : null}
      <List
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => <Product setShow={setShow} data={item} />}
      />
      <ProductDetails show={show} setShow={setShow} />
    </Container>
  );
};

export default Products;
