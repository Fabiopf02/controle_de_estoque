import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import SellProducts from './pages/SellProducts';
import Sales from './pages/Sales';
import Analysis from './pages/Analysis';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="SellProducts" component={SellProducts} />
        <Stack.Screen name="Sales" component={Sales} />
        <Stack.Screen name="Analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
