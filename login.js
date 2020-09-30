import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

export default function Login(props) {
  return (
    <View style={styles.container}>
      <Input
    placeholder="Nome de usuário"
    leftIcon={{ type: 'font-awesome', name: 'user' }}
  />
  <Input
    placeholder="Senha"
    leftIcon={{ type: 'font-awesome', name: 'eye' }}
  />
  <Button title="Entrar" onPress={() => {props.navigation.navigate('Home')}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
