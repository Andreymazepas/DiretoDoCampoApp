import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Input,
  Overlay,
  Text,
  ListItem,
  Avatar,
  Accessory,
} from "react-native-elements";
import Container from "components/container";
import { getDataRemote, setFarmName as apiSetFarmName } from "shared";
import { getFarmOrders } from "../shared";
import { ProductNames, Assets } from "../assets";

export default function MinhaFazenda(props) {
  const [showSetFarm, setShowSetFarm] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function f() {
      let data = await getDataRemote();
      setUser(data);
      if (!data.farmName) {
        setShowSetFarm(true);
      }
      let orders = await getFarmOrders();
      setOrders(orders);
      console.log(orders);
    })();
  }, []);

  const handleSave = async () => {
    if (farmName.length < 6) {
      Alert.alert(
        "",
        "Nome da fazenda deve ter 6 caracteres ou mais.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
      return;
    }
    await apiSetFarmName(farmName);
    setUser({ ...user, farmName });
    setShowSetFarm(false);
  };

  return (
    <Container {...props}>
      <Overlay isVisible={showSetFarm}>
        <View style={{ flex: 1, padding: 30, justifyContent: "center" }}>
          <Text h2>
            Nome da sua fazenda
          </Text>
          <Text h4>
            Opa, parece que você ainda não deu nome à sua fazenda, insira no
            campo abaixo o nome
          </Text>
          <Input
            onChangeText={(value) => setFarmName(value.trim())}
            placeholder="ex.'Fazenda Cogumelinho'"
          />
          <Text>
            No mínimo 6 caractéres
          </Text>
          <Button onPress={handleSave} title="Salvar" />
        </View>
      </Overlay>
      <View style={styles.container}>
        <Text>Nome</Text>
        <Text h3>{user && user.farmName}</Text>
        <Text>Qnt de Pedidos</Text>
        <Text h3>{orders ? Object.keys(orders).length : 0}</Text>
        <Text>Pedidos</Text>

        {orders ?
          Object.keys(orders).map((orderKey) => (
            // <Text h4 key={orderKey}>
            //     {`${orders[orderKey].buyer} comprou ${orders[orderKey].quantity} x ${ProductNames[orders[orderKey].product.product]}! `}
            // </Text>
            <ListItem bottomDivider>
              <Avatar source={Assets[orders[orderKey].product.product]} />
              <ListItem.Content>
                <ListItem.Title>
                  {`${orders[orderKey].buyer} comprou ${orders[orderKey].quantity} x ${ProductNames[orders[orderKey].product.product]}!`}
                </ListItem.Title>
                <ListItem.Subtitle>
                  Pedido em:{" "}
                  {orders[orderKey].date
                    ? orders[orderKey].date
                    : "Indisponivel"}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  Preço unitário:{" "}
                  {`R$ ${parseFloat(orders[orderKey].product.price).toFixed(
                    2
                  )}`}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Subtitle
                style={{ fontWeight: "bold", fontSize: 16, color: 'green' }}
              >{`R$ ${parseFloat(
                orders[orderKey].product.price *
                orders[orderKey].quantity
              ).toFixed(2)}`}</ListItem.Subtitle>
            </ListItem>
          )) : <Text h4>Você ainda não tem pedidos...</Text>}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: "#fff",
  },
});
