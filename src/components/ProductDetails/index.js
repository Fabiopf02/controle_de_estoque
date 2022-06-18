import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {Container} from '../SaleDetail/styles';
import CloseButton from '../CloseButton';
import {ProductImage} from '../../components/Product/styles';
import moment from 'moment';
import getRealm from '../../services/realm';
import {Text, Name, Property} from './styles';

const ProdutDetails = ({show, setShow}) => {
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function get() {
      if (!show) return;
      setTotal(0);
      setAmount(0);
      const realm = await getRealm();
      const objects = realm
        .objects('ProductSold')
        .filtered('barcode == $0', show._id);
      const quantity = objects.sum('quantity');
      setTotal(quantity);
      if (!objects.length) return;
      const res = objects.reduce((prev, curr) => {
        return prev.price * prev.quantity + curr.quantity * curr.price;
      });
      if (typeof res === 'object') {
        setAmount(res.price * res.quantity);
        return;
      }
      setAmount(res);
    }
    get();
  }, [show]);

  return (
    <Modal isVisible={Boolean(show)}>
      <View style={{flex: 1}}>
        <Container>
          {show ? (
            <>
              <ProductImage
                width="80%"
                height="30%"
                onPress={() => console.log('press')}
                source={{
                  uri: show.url_image,
                }}
              />
              <Name>{show.name}</Name>
              <Text>
                <Property>Cód.: </Property>
                {show._id}
              </Text>
              <Text>
                <Property>Marca: </Property>
                {show.brand}
              </Text>
              <Text>
                <Property>Preço: R$ </Property>
                {show.price.toFixed(2)}
              </Text>
              <Text>
                <Property>Estoque: </Property>
                {show.quantity}
              </Text>
              <Text>
                <Property>Qtd. Vendida: </Property>
                {total}
              </Text>
              <Text>
                <Property>Total (R$): </Property>
                {amount.toFixed(2)}
              </Text>
              <Text>
                <Property>Validade: </Property>
                {moment(show.expiration_date).format('DD/MM/YYYY HH:MM:SS')}
              </Text>
              <Text>
                <Property>Criado em: </Property>
                {moment(show.created_at).format('DD/MM/YYYY HH:MM:SS')}
              </Text>
            </>
          ) : null}
          <CloseButton onPress={() => setShow(null)} />
        </Container>
      </View>
    </Modal>
  );
};

export default ProdutDetails;
