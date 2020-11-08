import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text, Image } from "react-native-elements";

export default function Login(props) {
  return (
    <View style={styles.container}>
      <Image
  source={{ uri: 'https://picsum.photos/200' }}
  style={{ width: 200, height: 200}}
/>
<View style={{backgroundColor: '#FFF'}}>
  <View style={{display: 'flex'}}>
      <Input
    placeholder="Nome de usuário"
    leftIcon={{ type: 'font-awesome', name: 'user' }}
  />
  <Input
    style={{height: 50}}
    placeholder="Senha"
    leftIcon={{ type: 'font-awesome', name: 'eye' }}
    secureTextEntry={true}
  />
  </View>
  <Text style={{color: 'blue', textAlign: 'right', textDecorationStyle: 'solid', alignSelf: 'flex-end', margin: 20}}>
    Esqueceu a senha?
  </Text>
  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '80%'}}>
    <Button  title="Login Produtor" onPress={() => {props.navigation.navigate('Home')}} />
    <Button  title="Login Comprador" onPress={() => {props.navigation.navigate('Home')}} />
  </View>
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20
  },
});
