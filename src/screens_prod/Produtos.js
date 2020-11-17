import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, ActivityIndicator } from "react-native";
import Container from "components/container";
import { Avatar, Header, ListItem, BottomSheet, Icon } from "react-native-elements";
import { getProducts, deleteProduct } from "shared";
import { useFocusEffect } from "@react-navigation/native";
import { Assets, ProductNames } from "assets";
import { ScrollView } from "react-native-gesture-handler";

const Produtos = (props) => {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let products_aux = null;

  useEffect(() => {
    setProductsData(productsData);
  }, [productsData])

  useFocusEffect(
    React.useCallback(() => {
      (async function f() {
        products_aux = await getProducts();
        setProductsData(products_aux);
        setLoading(false);
      })();
    }, [refresh])
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

  const handleDelete = async (key) => {
    await deleteProduct(key);
    console.log("test")
    setRefresh(!refresh);
  }

  if (loading) {
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
        <ActivityIndicator size="large" />
      </>
    )
  }

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
      <ScrollView>
        <View style={styles.container}>
          {productsData &&
            Object.keys(productsData).map((key, i) => (
              <TouchableWithoutFeedback key={key}>
                <ListItem
                  key={key}
                  bottomDivider
                // onPress={() => setIsVisible(true)}
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
                  <Icon
                    name='trash'
                    type='font-awesome'
                    color="red"
                    onPress={() => Alert.alert("Excluir produto",
                      "Você deseja mesmo excluir esse produto?", [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => handleDelete(key) }
                    ],
                      { cancelable: false })}
                  />
                </ListItem>
              </TouchableWithoutFeedback>
            ))}
        </View>
      </ScrollView>
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
