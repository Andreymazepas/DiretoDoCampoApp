import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Container from "components/container";
import { Avatar, Header, ListItem, BottomSheet } from "react-native-elements";
import { getProducts } from "shared";
import { useFocusEffect } from "@react-navigation/native";
import { Assets, ProductNames } from "../assets";

const Produtos = (props) => {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      (async function f() {
        let products_aux = await getProducts();
        setProductsData(products_aux);
        setLoading(false);
        console.log(products_aux);
      })();
    }, [])
  );

  const optionsList = [
    { title: "Editar item", onPress: () => alert("editar item") },
    { title: "Apagar Item", onPress: () => alert("apagar item") },
    {
      title: "Cancelar",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: props.navigation.toggleDrawer,
        }}
        centerComponent={{
          text: props.route.name,
          style: { color: "#fff", fontSize: 18 },
        }}
        containerStyle={{
          backgroundColor: "#206a5d",
          justifyContent: "space-around",
        }}
        rightComponent={{
          icon: "add",
          color: "#fff",
          onPress: () => props.navigation.navigate("Cadastrar Produtos"),
        }}
      />
      <View style={styles.container}>
        {productsData &&
          Object.keys(productsData).map((key, i) => (
            <ListItem
              key={key}
              bottomDivider
              onPress={() => setIsVisible(true)}
            >
              <Avatar source={Assets[productsData[key].product]} />
              <ListItem.Content>
                <ListItem.Title>
                  {ProductNames[productsData[key].product]}
                </ListItem.Title>
                <ListItem.Subtitle>{`R$ ${parseFloat(
                  productsData[key].price
                ).toFixed(2)}`}</ListItem.Subtitle>
                <ListItem.Subtitle>
                  {productsData[key].entrega}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  {productsData[key].compra}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
      </View>
      <BottomSheet isVisible={isVisible}>
        {optionsList.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: "#fff",
  },
});
