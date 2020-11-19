import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Avatar, Header, ListItem, BottomSheet, SearchBar } from "react-native-elements";
import { getAllProducts } from "shared";
import { useFocusEffect } from "@react-navigation/native";
import { Assets, ProductNames } from "assets";
import { ScrollView } from "react-native-gesture-handler";

const Home = (props) => {
    const [productsData, setProductsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
   

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
                    <SearchBar
                        placeholder="Pesquisar produto..."
                        onChangeText={setSearch}
                        value={search}
                        platform="android"
                        lightTheme
                    />
                    {productsData &&
                        productsData
                            .filter(
                            p => ProductNames[p.data.product].toLowerCase().includes(search.toLowerCase())
                            )
                            .map(prod => (
                            <TouchableWithoutFeedback 
                                key={prod.key} 
                                >
                                <ListItem
                                    key={prod.key}
                                    bottomDivider
                                    onPress={() => props.navigation.navigate("Descrição Produto", prod.data)}
                                >
                                    <Avatar source={Assets[prod.data.product]} />
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {ProductNames[prod.data.product]}
                                        </ListItem.Title>
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
                                    <ListItem.Subtitle style={{fontWeight: 'bold', fontSize: 16 }}>{`R$ ${parseFloat(
                                            prod.data.price
                                        ).toFixed(2)}`}</ListItem.Subtitle>
                                        <ListItem.Chevron />
                                </ListItem>
                            </TouchableWithoutFeedback>
                        ))}
                </View>
            </ScrollView>
           
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
