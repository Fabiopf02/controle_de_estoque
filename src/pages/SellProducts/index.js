import React, {useEffect, useState} from 'react';
import {Camera, Center, Scan} from '../AddProduct/styles';
import Picker from '../../components/Picker';
import {
  ButtonText,
  Card,
  CardText,
  Container,
  ConfirmButton,
  ManualButton,
  Block,
  Value,
  Image,
  Row,
  AddButton,
  RemoveButton,
  PlusIcon,
  RemoveIcon,
  BigText,
  AmountView,
  CartIcon,
  OptionButton,
  OptionText,
  CancelButton,
  Bottom,
  Msg,
  PencilIcon,
} from './styles';
import getRealm from '../../services/realm';
import getFormattedDate from '../../utils/getFormattedDate';
import {generateUniqueId} from '../../utils/generateUniqueId';
import Checkout from '../../components/Checkout';
import {CloseIcon} from '../../components/CloseButton/styles';

const SellProducts = () => {
  const [product, setProduct] = useState();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState(1);
  const [products, setProducts] = useState();
  const [msg, setMsg] = useState('');
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    async function get() {
      const realm = await getRealm();
      const response = realm.objects('Product');
      setOptions(response);
    }
    get();
  }, []);

  const onBarcodeDetected = async event => {
    if (event.barcodes.length === 0) {
      return;
    }
    const barcode = event.barcodes[0].data;
    const data = await getProduct(barcode);
    if (!data) {
      return;
    }
    setSelected(barcode);
    setProduct(data);
    const exists = products?.filter(p => p.barcode === data._id);
    if (exists && exists.length > 0) {
      setMsg(
        '* O produto já foi adicionado anteriormente. Seus valores serão somados aos existentes. *',
      );
    }
  };

  const getProduct = async code => {
    const realm = await getRealm();
    const prod = realm.objectForPrimaryKey('Product', code);
    if (!prod?._id) {
      return;
    }
    return prod;
  };

  const handleAmount = v => {
    if (amount === 1 && v === -1) {
      return;
    }
    setAmount(amount + v);
  };

  const addProduct = () => {
    if (product === undefined) {
      return;
    }
    setMsg('');
    const exists = products?.filter(p => p.barcode === product._id);
    if (exists && exists.length > 0) {
      const newValues = products?.map(p => {
        if (p.barcode === product._id) {
          p.quantity += amount;
          return p;
        }
        return p;
      });
      setAmount(1);
      setProduct(undefined);
      return setProducts(newValues);
    }
    const newProduct = {
      _id: generateUniqueId(),
      name: product.name,
      price: product.price,
      quantity: amount,
      barcode: product._id,
    };
    setAmount(1);
    if (products === undefined) {
      setProducts([newProduct]);
      return setProduct(undefined);
    }
    setProducts([...products, newProduct]);
    setProduct(undefined);
  };

  async function onChange(e) {
    setSelected(e);
    const realm = await getRealm();
    const data = realm.objectForPrimaryKey('Product', e);
    setProduct(data);
  }

  const manual = () => {
    setProduct({
      url_image: '',
      name: '',
      price: 0,
      quantity: 0,
      expiration_date: new Date(),
    });
  };

  return (
    <Container>
      {checkout === true && <Checkout products={products} />}
      {!product && (
        <>
          {!checkout ? (
            <>
              <Scan />
              <Camera
                androidCameraPermissionOptions={{
                  title: 'Permissão para usar a câmera',
                  message: 'Precisamos de sua permissão para acessar a câmera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={onBarcodeDetected}
              />
            </>
          ) : null}
          {products !== undefined && !checkout ? (
            <OptionButton onPress={() => setCheckout(true)}>
              <CartIcon />
              <OptionText>{products.length}</OptionText>
            </OptionButton>
          ) : null}
          {!checkout ? (
            <ManualButton onPress={manual}>
              <PencilIcon />
            </ManualButton>
          ) : null}
        </>
      )}
      {product !== undefined && (
        <Card>
          <Picker options={options} selected={selected} onChange={onChange} />
          <Center>
            {product.url_image ? (
              <Image source={{uri: product.url_image}} />
            ) : null}
          </Center>
          <Block>
            <CardText>Produto:</CardText>
            <Value>{product.name}</Value>
          </Block>
          <Block>
            <CardText>
              Preço: <Value>R$ {product.price.toFixed(2)}</Value>
            </CardText>
          </Block>
          <Block>
            <CardText>
              Estoque: <Value> {product.quantity}</Value>
            </CardText>
          </Block>
          <Block>
            <CardText>
              Data de validade:{' '}
              <Value>{getFormattedDate(product.expiration_date)}</Value>
            </CardText>
          </Block>
          <Block>
            <Msg>{msg}</Msg>
          </Block>
          <Block>
            <Center>
              <AmountView>
                <CardText>Quantidade:</CardText>
                <BigText>{amount}</BigText>
                <Row>
                  <AddButton onPress={() => handleAmount(1)}>
                    <PlusIcon />
                  </AddButton>
                  <RemoveButton onPress={() => handleAmount(-1)}>
                    <RemoveIcon />
                  </RemoveButton>
                </Row>
              </AmountView>
            </Center>
          </Block>
          <Block>
            <Center>
              <CardText>Total</CardText>
              <BigText>R$ {(amount * product.price).toFixed(2)}</BigText>
            </Center>
          </Block>
          <Bottom>
            <ConfirmButton onPress={addProduct}>
              <ButtonText>Adicionar</ButtonText>
              <CartIcon />
            </ConfirmButton>
            <CancelButton onPress={() => setProduct(undefined)}>
              <ButtonText>Fechar</ButtonText>
              <CloseIcon />
            </CancelButton>
          </Bottom>
        </Card>
      )}
    </Container>
  );
};

export default SellProducts;
