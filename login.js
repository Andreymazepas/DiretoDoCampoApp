import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text, Image, CheckBox } from "react-native-elements";

export default function Login(props) {
  const [signUp, setSignUp] = useState(false);
  const [checked, setChecked] = useState(false);

  return signUp ? (
    <View style={styles.container}>
      <View>
        <View style={{ display: "flex", width: 400}}>
          <Input placeholder="Nome Completo" />
          <Input placeholder="Email" />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <CheckBox title="Produtor" checked={checked} onPress={()=>setChecked(!checked)}/>
            <CheckBox title="Comprador" checked={!checked} onPress={()=>setChecked(!checked)}/>
          </View>
          <Input
            placeholder="Senha"
            leftIcon={{ type: "font-awesome", name: "eye" }}
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirmar Senha"
            leftIcon={{ type: "font-awesome", name: "eye" }}
            secureTextEntry={true}
          />
        </View>
        <Button title="Cadastrar" onPress={() => setSignUp(false)} />
        <Text style={{ textAlign: "center", marginTop: 25 }}>Já tem uma conta?</Text>
        <Text
          style={{
            textAlign: "center",
            textDecorationLine: "underline",
            color: "blue",
          }}
          onPress={() => setSignUp(false)}
        >
          Fazer Login
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 200, height: 200 }}
      />
      <View style={{ backgroundColor: "#FFF" }}>
        <View style={{ display: "flex" }}>
          <Input
            placeholder="Nome de usuário"
            leftIcon={{ type: "font-awesome", name: "user" }}
          />
          <Input
            style={{ height: 50 }}
            placeholder="Senha"
            leftIcon={{ type: "font-awesome", name: "eye" }}
            secureTextEntry={true}
          />
        </View>
        <Text
          style={{
            color: "blue",
            textAlign: "right",
            textDecorationStyle: "solid",
            alignSelf: "flex-end",
            margin: 20,
          }}
          onPress={()=>alert('sinto muito')}
        >
          Esqueceu a senha?
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
            marginVertical: 10,
            marginBottom: 40,
          }}
        >
          <Button
            title="Login Produtor"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <Button
            title="Login Comprador"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
        </View>
        <Text style={{ textAlign: "center" }}>Não tem uma conta?</Text>
        <Text
          style={{
            textAlign: "center",
            textDecorationLine: "underline",
            color: "blue",
          }}
          onPress={() => setSignUp(true)}
        >
          Cadastre-se aqui
        </Text>
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
    paddingHorizontal: 20,
  },
});
