import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Header, Input, ButtonGroup, Button } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { addProduct } from 'shared';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CadastrarProdutos = (props) => {
    const navigation = useNavigation();
    const buttons = ['Encomenda', 'Pronta entrega']
    const buttons_1 = ['Atacado', 'Varejo']
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedIndex_1, setSelectedIndex_1] = useState(0)
    const [product, setProduct] = useState("Banana");
    const [price, setPrice] = useState("");

    const handleAdd = async () => {
        await addProduct({
            product,
            price,
            entrega: buttons[selectedIndex],
            compra: buttons_1[selectedIndex_1]
        })
        navigation.goBack();
    }

    return (
        <>
            <Header
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => (props.navigation.goBack()) }}
                centerComponent={{ text: props.route.name, style: { color: '#fff', fontSize: 18 } }}
                containerStyle={{
                    backgroundColor: '#206a5d',
                    justifyContent: 'space-around',
                }}
            />

            <View style={styles.container}>
                <ScrollView>
                    <Text>Escolha o produto</Text>
                    <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.4)', margin: 7 }}>
                        <Picker
                            selectedValue={product}
                            onValueChange={(itemValue, itemIndex) =>
                                setProduct(itemValue)
                            }>
                            <Picker.Item label="Banana" value="Banana" />
                            <Picker.Item label="Tomate" value="Tomate" />
                            <Picker.Item label="Cenoura" value="Cenoura" />
                            <Picker.Item label="Couve" value="Couve" />
                        </Picker>
                    </View>
                    <View style={{ margin: 10 }} />
                    <Text>Preço/kg</Text>
                    <Input
                        style={{ height: 50 }}
                        placeholder="R$"
                        onChangeText={value => setPrice(value)}
                        keyboardType="number-pad"
                    />
                    <Text>Modalidade de entrega</Text>
                    <View style={{ margin: 5 }} />
                    <ButtonGroup
                        onPress={index => setSelectedIndex(index)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        selectedButtonStyle={{ backgroundColor: '#676A11' }}
                    />
                    <View style={{ margin: 10 }} />
                    <Text>Modalidade de compra</Text>
                    <View style={{ margin: 5 }} />
                    <ButtonGroup
                        onPress={index => setSelectedIndex_1(index)}
                        selectedIndex={selectedIndex_1}
                        buttons={buttons_1}
                        selectedButtonStyle={{ backgroundColor: '#676A11' }}
                    />
                    <View style={{ margin: 20 }} />
                    <Button
                        title="Continuar"
                        buttonStyle={{ backgroundColor: '#81b214', width: "100%", alignSelf: 'flex-end' }}
                        onPress={handleAdd}
                    />
                </ScrollView>
            </View>
        </>
    )
}

export default CadastrarProdutos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "#fff",
    },
});