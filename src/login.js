import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, Text, Dimensions } from "react-native";
import { Input, Button, Image, ButtonGroup } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { Assets } from "./assets";
import { getUserRemote, signup, storeUser } from 'shared';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login() {
  const navigation = useNavigation();
  const buttons = ['Comprador', 'Produtor']
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [username, setUsername] = useState("")

  const handleLogin = async () => {
    if (username.length < 6) {
      Alert.alert(
        "",
        "Nome de usuário deve ter 6 caracteres ou mais.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      )
      return;
    }
    let user = { username: username, role: buttons[selectedIndex] }
    await storeUser(JSON.stringify(user));
    const has_account = await getUserRemote(user);
    !has_account && signup(user)
    selectedIndex == 0
      ? navigation.replace("CompradorDrawer")
      : navigation.replace("ProdutorDrawer")
  }

  const updateIndex = index => {
    setSelectedIndex(index)
  }

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#f1f1e8" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <View style={{ margin: windowHeight / 35 }} />
          <Image
            source={Assets.logo}
            style={{ width: 150, height: 150 }}
          />
          <View style={{ margin: windowHeight / 35 }} />
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            selectedButtonStyle={{ backgroundColor: '#676A11' }}
          />
          <View style={{ margin: windowHeight / 50 }} />
          <Input
            style={{ height: 50 }}
            placeholder=" Nome de usuário"
            leftIcon={{ type: "font-awesome", name: "user" }}
            onChangeText={value => setUsername(value)}
          />
          <Input
            disabled
            style={{ height: 50 }}
            placeholder=" Senha"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            secureTextEntry={true}
          />
          <Text
            style={{
              color: "#676A11",
              textAlign: "right",
              textDecorationStyle: "solid",
              alignSelf: "flex-end",
              marginRight: 10,
              fontWeight: 'bold',
              padding: 5
            }}
            onPress={() => Alert.alert(
              "Sentimos muito!",
              "Essa funcionalidade ainda não está disponível.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: true }
            )}
          >
            Esqueceu a senha?
              </Text>
          <View style={{ margin: windowHeight / 65 }} />
          <Button
            raised
            title="Login"
            buttonStyle={{ backgroundColor: '#81b214', width: windowWidth * 0.7 }}
            onPress={handleLogin}
          />
          <View style={{ margin: windowHeight / 60 }} />
          <Text style={{ textAlign: "center", color: 'black' }}>Não tem uma conta?</Text>
          <Text
            style={{
              textAlign: "center",
              textDecorationLine: "underline",
              color: "#676A11",
              fontWeight: 'bold'
            }}
            onPress={() => Alert.alert(
              "Sentimos muito!",
              "Essa funcionalidade ainda não está disponível.\n\nVocê pode criar uma conta ao logar com um nome de usuário qualquer.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: true }
            )}
          >
            Cadastre-se aqui
        </Text>
        </View>
      </ScrollView>
    </View >
  );
}
