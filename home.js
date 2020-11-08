import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Header } from "react-native-elements";
import Container from './container';

export default function Home(props) {
  return (
    <Container {...props} >
    <View style={styles.container}>
      <Text>oi</Text>
      <Button title="voltar" onPress={()=>props.navigation.goBack()} />
    </View>
    </Container>
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
