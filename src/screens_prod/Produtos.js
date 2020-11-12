import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from 'components/container';
import { Header, ListItem } from "react-native-elements";
import { getProducts } from 'shared';

const Produtos = (props) => {
    const [productsData, setProductsData] = useState(null);

    useEffect(() => {
        (async function f() {
            let products_aux = await getProducts();
            setProductsData(products_aux);
        })();
    }, [])

    return (
        <>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: (props.navigation.toggleDrawer) }}
                centerComponent={{ text: props.route.name, style: { color: '#fff', fontSize: 18 } }}
                containerStyle={{
                    backgroundColor: '#206a5d',
                    justifyContent: 'space-around',
                }}
                rightComponent={{ icon: 'add', color: '#fff', onPress: () => (props.navigation.navigate("Cadastrar Produtos")) }}
            />
            <View style={styles.container}>
                {productsData &&
                    Object.keys(productsData).map((key, i) => (
                        <ListItem key={key} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{productsData[key].product}</ListItem.Title>
                                <ListItem.Subtitle>{productsData[key].price}</ListItem.Subtitle>
                                <ListItem.Subtitle>{productsData[key].entrega}</ListItem.Subtitle>
                                <ListItem.Subtitle>{productsData[key].compra}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </>
    )
}

export default Produtos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "#fff",
    },
});
