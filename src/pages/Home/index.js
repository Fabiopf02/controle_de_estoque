import React from 'react';
import {
  Container,
  Item,
  BigItem,
  ItemText,
  BigItemText,
  Row,
  Lottie,
  Block,
  Scroll,
  Col,
} from './styles';

import {useNavigation} from '@react-navigation/native';

import * as Scanner from '../../assets/scanner.json';
import * as Analytics from '../../assets/analytics.json';
import * as Product from '../../assets/product.json';
import * as Sales from '../../assets/sales.json';
import Header from '../../components/Header';

const Home = () => {
  const navigation = useNavigation();

  const navigateToAddProduct = () => {
    return navigation.navigate('AddProduct');
  };
  const navigateToProducts = () => {
    return navigation.navigate('Products');
  };
  const navigateToSellProducts = () => {
    return navigation.navigate('SellProducts');
  };
  const navigateToSales = () => {
    return navigation.navigate('Sales');
  };
  const navigateToAnalysis = () => {
    return navigation.navigate('Analysis');
  };

  const otherOptions = [
    {text: 'Produtos', lottie: Product, action: navigateToProducts},
    {text: 'Vendas', lottie: Sales, action: navigateToSales},
    {text: 'Análise', lottie: Analytics, action: navigateToAnalysis},
  ];

  return (
    <Container>
      <Header title="Boas-vindas!" />
      <Scroll>
        <Block>
          <Row>
            <Item bg="#925bf0" onPress={navigateToAddProduct}>
              <Lottie source={Scanner} autoPlay loop />
              <ItemText>Adic./edit.</ItemText>
            </Item>
            <Item bg="#48cf79" onPress={navigateToSellProducts}>
              <Lottie source={Scanner} autoPlay loop speed={1.02} />
              <ItemText>Vender</ItemText>
            </Item>
          </Row>
        </Block>
        <Block>
          <Col>
            {otherOptions.map((option, index) => (
              <BigItem bg="#00009910" key={index} onPress={option.action}>
                <Lottie
                  source={option.lottie}
                  resizeMode="cover"
                  autoPlay
                  loop={index === 1}
                />
                <BigItemText>{option.text}</BigItemText>
              </BigItem>
            ))}
          </Col>
        </Block>
      </Scroll>
    </Container>
  );
};

export default Home;
