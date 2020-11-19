import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/login';
import MinhaFazenda from 'screens_prod/MinhaFazenda';
import Produtos from 'screens_prod/Produtos';
import CadastrarProdutos from 'screens_prod/CadastrarProdutos';
import DescricaoProduto from 'screens_comp/DescricaoProduto';

import Home from 'screens_comp/Home';

const Drawer_P = createDrawerNavigator();
const Drawer_C = createDrawerNavigator();
const Stack = createStackNavigator();

// FIREBASE DATABASE
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCQpu6GbrQN5vUyFwYbcEhlkp5Dv6d_GC8",
  authDomain: "diretodocampo-98030.firebaseapp.com",
  databaseURL: "https://diretodocampo-98030.firebaseio.com",
  projectId: "diretodocampo-98030",
  storageBucket: "diretodocampo-98030.appspot.com",
  messagingSenderId: "1027933216321",
  appId: "1:1027933216321:web:e023811fac0c71ae46f0c0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
//


export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  function ProdutorDrawer() {
    return (
      <Drawer_P.Navigator initialRouteName="Minha Fazenda">
        <Drawer_P.Screen name="Minha Fazenda" component={MinhaFazenda} />
        <Drawer_P.Screen name="Produtos" component={Produtos} />
        <Drawer_P.Screen name="Sair" component={Login} />
      </Drawer_P.Navigator>
    );
  }

  function CompradorDrawer() {
    return (
      <Drawer_C.Navigator>
        <Drawer_P.Screen name="Home" component={Home} />
        <Drawer_P.Screen name="Sair" component={Login} />
      </Drawer_C.Navigator>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ProdutorDrawer" component={ProdutorDrawer} />
        <Stack.Screen name="CompradorDrawer" component={CompradorDrawer} />
        <Stack.Screen name="Cadastrar Produtos" component={CadastrarProdutos} />
        <Stack.Screen name="Descrição Produto" component={DescricaoProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
