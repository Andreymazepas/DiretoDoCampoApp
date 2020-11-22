import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import {
  Avatar,
  Header,
  ListItem,
  BottomSheet,
  SearchBar,
  Text as Text2,
  Button,
  Card,
} from "react-native-elements";
import { getAllProducts } from "shared";
import { useFocusEffect } from "@react-navigation/native";
import { Assets, ProductNames } from "assets";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import { addOrder } from "../shared";

const DescricaoProduto = (props) => {
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      (async function f() {
        const prod = props.route.params;
        setProduct(prod);
        fetch(
          `https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&titles=${
            ProductNames[prod.product]
          }`
        )
          .then((res) => res.json())
          .then((out) => {
            setDescription(
              out.query.pages[Object.keys(out.query.pages)[0]].extract
            );
          })
          .catch((err) => {
            throw err;
          });
      })();
    }, [])
  );

  const handleAdd = async () => {
    if(quantity < 1){
        alert('Quantidade não pode ser menor que 1!');
        return;
    }
    await addOrder({
        product,
        quantity,
        date: new Date().toLocaleDateString()
    })
    alert('Produto adicionado com sucesso!')
    props.navigation.goBack();
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
      />
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Title>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Avatar source={Assets[product.product]} size="medium" />
                <Text2 h3 style={{ textAlignVertical: "center" }}>
                  {ProductNames[product.product]}
                </Text2>
              </View>
            </Card.Title>
            <Card.Divider />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {product.compra} • {product.entrega}
            </Text>
            <Text style={{ fontWeight: "100", fontSize: 16, lineHeight: 20 }}>
              {description
                ? description.substr(0, 200) + "..."
                : "Sem descrição disponível."}
            </Text>
          </Card>
          <View style={styles.containerValues}>
            <View style={styles.text}>
              <Text2 style={{ fontSize: 20 }}>Valor Unitário:</Text2>
              <Text2 style={{ fontSize: 20 }}>
                R$ {parseFloat(product.price).toFixed(2)}
              </Text2>
            </View>
            <Card.Divider />
            <View style={styles.text}>
              <Text2 style={{ fontSize: 20, textAlignVertical: "center" }}>
                Quantidade:
              </Text2>
              <NumericInput
                onChange={setQuantity}
                value={quantity}
                totalWidth={140}
                totalHeight={50}
                iconSize={25}
              />
            </View>
            <Card.Divider />

            <View style={styles.text}>
              <Text2 h4>Total:</Text2>
              <Text2 h4>
                R$ {(parseFloat(product.price) * quantity).toFixed(2)}
              </Text2>
            </View>
            <Button title="Adicionar ao Carrinho" buttonStyle={{ backgroundColor: '#81b214', fontSize: 20 }} raised onPress={() => handleAdd()} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DescricaoProduto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: "#fff",
  },
  containerValues: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  text: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
});
