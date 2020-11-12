import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Container from 'components/container';
import { getDataRemote } from 'shared';

export default function MinhaFazenda(props) {
    useEffect(() => {
        (async function f() {
            await getDataRemote();
        })();
    }, []);

    return (
        <Container {...props}>
            <View style={styles.container}>
                <Text>Nome</Text>
                <Text h3>Fazendinha Cogumelo</Text>
                <View style={{ margin: 8 }} />
                <Text>Estatísticas</Text>
                <Text h3>0 vendas nos últimos 30 dias</Text>
                <View style={{ margin: 8 }} />
                <Text>Faturamento Total</Text>
                <Text h3>R$ 00,00</Text>
                <View style={{ margin: 8 }} />
                <Text>Gráficos</Text>
                <Text h3>-</Text>
                <Text h3>-</Text>
                <Text h3>-</Text>
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
