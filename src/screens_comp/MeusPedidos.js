import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Avatar, Header, ListItem, BottomSheet, SearchBar } from "react-native-elements";
import { getOrders } from "shared";
import { useFocusEffect } from "@react-navigation/native";
import { Assets, ProductNames } from "assets";
import { ScrollView } from "react-native-gesture-handler";

const MeusPedidos = (props) => {
    const [ordersData, setOrdersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
   

    useEffect(() => {
        setOrdersData(ordersData);
    }, [ordersData])

    useFocusEffect(
        React.useCallback(() => {
            (async function f() {
                let orders_aux = await getOrders();
                setOrdersData(orders_aux);
                setLoading(false);
                console.log('test', orders_aux)
            })();
        }, [])
    );

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
                    {ordersData ? Object.keys(ordersData)
                            .map(orderKey => (
                            <TouchableWithoutFeedback 
                                key={orderKey} 
                                >
                                <ListItem
                                    bottomDivider
                                >
                                    <Avatar source={Assets[ordersData[orderKey].product.product]} />
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {ProductNames[ordersData[orderKey].product.product]} x 
                                            {ordersData[orderKey].quantity}
                                        </ListItem.Title>
                                        <ListItem.Subtitle>
                                            Pedido em: {ordersData[orderKey].date ? ordersData[orderKey].date : 'Indisponivel'}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle>
                                            Preço unitário: {`R$ ${parseFloat(
                                            ordersData[orderKey].product.price
                                        ).toFixed(2)}`}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle>
                                            <Text style={{ fontWeight: 'bold' }}>Vendido por: </Text>
                                            {ordersData[orderKey].product.farmName ? ordersData[orderKey].product.farmName : "-"}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Subtitle style={{fontWeight: 'bold', fontSize: 16 }}>{`R$ ${parseFloat(
                                            ordersData[orderKey].product.price * ordersData[orderKey].quantity
                                        ).toFixed(2)}`}</ListItem.Subtitle>
                                </ListItem>
                            </TouchableWithoutFeedback>
                        )) : <Text> Sem pedidos disponíveis</Text>}
                </View>
            </ScrollView>
           
        </>
    );
};

export default MeusPedidos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "#fff",
    },
});
