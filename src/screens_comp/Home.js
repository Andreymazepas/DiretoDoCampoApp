import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from "react-native";
import Container from "components/container";
import { Avatar, Header, ListItem, BottomSheet, Icon } from "react-native-elements";
import { getAllProducts } from "shared";
import { useFocusEffect } from "@react-navigation/native";
import { Assets, ProductNames } from "assets";
import { ScrollView } from "react-native-gesture-handler";

const Home = (props) => {
    const [productsData, setProductsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setProductsData(productsData);
    }, [productsData])

    useFocusEffect(
        React.useCallback(() => {
            (async function f() {
                let products_aux = await getAllProducts();
                setProductsData(products_aux);
                setLoading(false);
                console.log('test', products_aux)
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
            />
            <ScrollView>
                <View style={styles.container}>
                    {productsData &&
                        productsData.map(prod => (
                            <TouchableWithoutFeedback key={prod.key}>
                                <ListItem
                                    key={prod.key}
                                    bottomDivider
                                // onPress={() => setIsVisible(true)}
                                >
                                    <Avatar source={Assets[prod.data.product]} />
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {ProductNames[prod.data.product]}
                                        </ListItem.Title>
                                        <ListItem.Subtitle>{`R$ ${parseFloat(
                                            prod.data.price
                                        ).toFixed(2)}`}</ListItem.Subtitle>
                                        <ListItem.Subtitle>
                                            {prod.data.entrega}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle>
                                            {prod.data.compra}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle>
                                            <Text style={{ fontWeight: 'bold' }}>Vendido por: </Text>
                                            {prod.data.farmName ? prod.data.farmName : "-"}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
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

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "#fff",
    },
});
