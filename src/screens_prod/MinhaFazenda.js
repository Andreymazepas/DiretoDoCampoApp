import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Overlay, Text } from "react-native-elements";
import Container from 'components/container';
import { getDataRemote, setFarmName as apiSetFarmName } from 'shared';

export default function MinhaFazenda(props) {
    const [showSetFarm, setShowSetFarm] = useState(false);
    const [farmName, setFarmName] = useState('');
    const [user, setUser] = useState({});
    useEffect(() => {
        (async function f() {
            let data = await getDataRemote();
            setUser(data);
            if(!data.farmName) {
                setShowSetFarm(true);
            }
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
