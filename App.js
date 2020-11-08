import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from 'react-native-elements';

import Login from './login';
import Home from './home';
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" >
        <Drawer.Screen 
          options={{gestureEnabled: false}}  
          name="Login" 
          component={Login} 
        />
        <Drawer.Screen 
          name="Home" 
          component={Home} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
