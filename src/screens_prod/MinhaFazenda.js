import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Overlay, Text } from "react-native-elements";
import Container from 'components/container';
import { getDataRemote, setFarmName as apiSetFarmName } from 'shared';
import { getFarmOrders } from "../shared";
import { ProductNames } from "../assets";

export default function MinhaFazenda(props) {
    const [showSetFarm, setShowSetFarm] = useState(false);
    const [farmName, setFarmName] = useState('');
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async function f() {
            let data = await getDataRemote();
            setUser(data);
            if(!data.farmName) {
                setShowSetFarm(true);
            }
            let orders = await getFarmOrders();
            setOrders(orders);
            console.log(orders);
        })();
    }, []);

    const handleSave = () => {
        if (farmName.length < 6) {
            Alert.alert(
              "",
              "Nome da fazenda deve ter 6 caracteres ou mais.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: true }
            )
            return;
          }
          apiSetFarmName(farmName);
          setUser({...user, farmName} );
          setShowSetFarm(false);
    }

    return (
        <Container {...props}>
            <Overlay isVisible={showSetFarm}>
                <View style={{flex: 1, padding: 30, justifyContent: 'center'}}>
                <Text h4>Opa, parece que você ainda não deu nome à sua fazenda, insira no campo abaixo o nome</Text>
                <Input onChangeText={value => setFarmName(value.trim())} placeholder="Insira o nome. ex.'Fazenda Cogumelinho'"/>
                <Button onPress={handleSave} title="Salvar" />
                </View>
            </Overlay>
            <View style={styles.container}>
                <Text>Nome</Text>
                <Text h3>{user.farmName}</Text>
                <Text>Pedidos</Text>
                {Object.keys(orders).map(orderKey => (
                    <Text h4 key={orderKey}>
                        {`${orders[orderKey].buyer} comprou ${orders[orderKey].quantity} x ${ProductNames[orders[orderKey].product.product]}! `}
                    </Text>
                ))}
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
