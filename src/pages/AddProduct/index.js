import React, {useState, useRef} from 'react';
import {TextInput as Input, Alert} from 'react-native';
import RNFS from 'react-native-fs';

import {
  Container,
  Camera,
  Scan,
  View,
  ViewText,
  ConfirmButton,
  ConfirmButtonText,
  Row,
  CancelButton,
  TextInput,
  Image,
  Center,
  NumberInput,
  CameraIcon,
  TakeButton,
  TakeText,
} from './styles';
import {getProduct} from '../../services/getProduct';
import getRealm from '../../services/realm';
import Realm from 'realm';
import Toast from 'react-native-toast-message';

import {IProduct} from '../../components/Product';
import getFormattedDate from '../../utils/getFormattedDate';

const AddProduct = () => {
  const [code, setCode] = useState(null);
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState();

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const brandRef = useRef(null);
  const dateRef = useRef(null);
  const quantityRef = useRef(null);
  const cameraRef = useRef(null);

  const onBarcodeDetected = event => {
    if (event.barcodes.length === 0 || code !== null) {
      return;
    }
    const barcode = event.barcodes[0].data;
    setCode(barcode);
    return handleProduct(barcode);
  };

  const handleProduct = async barcode => {
    try {
      const realm = await getRealm();
      const exists =
        realm.objectForPrimaryKey < IProduct > ('Product', barcode);
      if (exists?.name) {
        setName(exists.name);
        setBrand(exists.brand);
        setThumbnail(exists.url_image);
        setPrice(String(exists.price));
        setQuantity(String(exists.quantity));
        setDate(getFormattedDate(exists.expiration_date));
        return;
      }
      const data = await getProduct(barcode);
      setName(data.name);
      setBrand(data.brand);
      setThumbnail(data.thumbnail);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleCancel = () => {
    setName(undefined);
    setPrice(undefined);
    setBrand(undefined);
    setDate('');
    setQuantity(undefined);
    setCode(null);
  };

  const formatDate = text => {
    if (date.charAt(text.length) === '/') {
      text = text.substring(0, text.length - 1);
    }
    text = text.replace(/[/.-]/g, '');
    let newText = '';
    if (text.length === 1) {
      if (Number(text) > 3) {
        return;
      }
    }
    if (text.length >= 2) {
      let c = text.substr(0, 2);
      if (Number(c) > 31 || Number(c) <= 0) {
        return;
      }
      newText += c + '/';
    }
    if (text.length >= 3) {
      let c = text.substr(2, 2);
      if (Number(c) > 12 || (Number(c) <= 0 && c.length === 2)) {
        return setDate(newText);
      }
      c.length === 1 ? '' : (c += '/');
      newText += c;
    }
    if (text.length >= 5) {
      let c = text.substring(4, text.length);
      const year = new Date().getFullYear();
      if (Number(c) < year && text.length === 8) {
        return setDate(newText);
      }
      newText += text.substring(4, text.length);
    }
    return setDate(newText || text);
  };

  const handleForm = async () => {
    if (!name) {
      Toast.show({type: 'error', text1: 'O campo nome é obrigatório'});
      return nameRef.current.focus();
    }
    if (!price) {
      Toast.show({type: 'error', text1: 'O campo preço é obrigatório'});
      return priceRef.current.focus();
    }
    if (!quantity) {
      Toast.show({type: 'error', text1: 'O campo quantidade é obrigatório'});
      return quantityRef.current.focus();
    }
    if (date.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'O campo data de vencimento é obrigatório',
      });
      return dateRef.current.focus();
    }
    const [day, month, year] = date.split('/').map(v => Number(v));
    const expiration = new Date(year, month - 1, day);

    const realm = await getRealm();
    const product = {
      _id: code,
      name,
      brand,
      price: Number(price),
      quantity: Number(quantity),
      url_image: thumbnail,
      expiration_date: expiration,
    };

    realm.write(() => {
      realm.create('Product', product, Realm.UpdateMode.Modified);
    });

    realm.close();
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'O produto foi adicionado/atualizado!',
      autoHide: true,
    });
    handleCancel();
  };

  const takePicture = async () => {
    try {
      const response = await cameraRef.current?.takePictureAsync({
        base64: true,
        quality: 0.7,
      });
      if (!(await RNFS.exists(RNFS.DocumentDirectoryPath + '/images'))) {
        await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/images');
      }

      const destPath = `${RNFS.DocumentDirectoryPath}/images/${code}.jpg`;
      await RNFS.writeFile(destPath, `${response.base64}`, 'base64');

      return setThumbnail('file://' + destPath);
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao capturar a imagem');
    }
  };

  return (
    <Container>
      {code === null && <Scan />}
      <Camera
        ref={cameraRef}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a câmera',
          message: 'Precisamos de sua permissão para acessar a câmera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={onBarcodeDetected}
      />
      {code !== null && (
        <View>
          <Center>
            <Image source={{uri: thumbnail}} />
            <TakeButton onPress={takePicture}>
              <CameraIcon />
              <TakeText>Tirar foto</TakeText>
            </TakeButton>
          </Center>
          <ViewText>Cód. Barras: {code}</ViewText>
          <Row>
            <ViewText>Produto: </ViewText>
            <TextInput
              ref={nameRef}
              placeholder="Nome do produto"
              value={name}
              onChangeText={setName}
              onSubmitEditing={() => brandRef.current?.focus()}
            />
          </Row>
          <Row>
            <ViewText>Marca: </ViewText>
            <TextInput
              ref={brandRef}
              placeholder="Nome da marca"
              value={brand}
              onChangeText={setBrand}
              onSubmitEditing={() => priceRef.current?.focus()}
            />
          </Row>
          <Row>
            <ViewText>Preço: </ViewText>
            <NumberInput
              ref={priceRef}
              placeholder="00.00"
              value={price}
              onChangeText={setPrice}
              onSubmitEditing={() => quantityRef.current?.focus()}
            />
          </Row>
          <Row>
            <ViewText>Quantidade: </ViewText>
            <NumberInput
              ref={quantityRef}
              placeholder="0"
              value={quantity}
              onChangeText={setQuantity}
              onSubmitEditing={() => dateRef.current?.focus()}
            />
          </Row>
          <Row>
            <ViewText>Data venc.: </ViewText>
            <NumberInput
              ref={dateRef}
              placeholder="dd/mm/aaaa"
              value={date}
              onChangeText={formatDate}
            />
          </Row>
          <Row>
            <ConfirmButton onPress={handleForm}>
              <ConfirmButtonText>Confirmar</ConfirmButtonText>
            </ConfirmButton>
            <CancelButton onPress={handleCancel}>
              <ConfirmButtonText>Cancel.</ConfirmButtonText>
            </CancelButton>
          </Row>
        </View>
      )}
    </Container>
  );
};

export default AddProduct;
