import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header, Input, ButtonGroup, Button, Avatar } from "react-native-elements";
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Assets, ProductNames } from 'assets';
import { addProduct, getFarmName } from 'shared';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CadastrarProdutos = (props) => {
    const navigation = useNavigation();
    const buttons = ['Encomenda', 'Pronta entrega']
    const buttons_1 = ['Atacado', 'Varejo']
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedIndex_1, setSelectedIndex_1] = useState(0)
    const [product, setProduct] = useState("apple");
    const [price, setPrice] = useState("");
    const moneyValue = 0;

    const handleAdd = async () => {
        let numericPrice = moneyValue.getRawValue();
        if(numericPrice < 0.01){
            alert('Valor do produto não pode ser menor que R$0,01!');
            return;
        }
        let farmName = await getFarmName();
        await addProduct({
            product,
            numericPrice,
            entrega: buttons[selectedIndex],
            compra: buttons_1[selectedIndex_1],
            farmName
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
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.4)', margin: 7, flex: 9 }}>
                            <Picker
                                selectedValue={product}
                                onValueChange={(itemValue, itemIndex) =>
                                    setProduct(itemValue)
                                }>
                                {Object.keys(ProductNames).map((key, i) => (
                                    <Picker.Item key={key + i} label={ProductNames[key]} value={key} />
                                ))}
                            </Picker>
                        </View>
                        <View style={{ flex: 1, padding: 10 }}>
                            {product &&
                                <Avatar source={Assets[product]} />}
                        </View>
                    </View>
                    <View style={{ margin: 10 }} />
                    <Text>Preço/kg</Text>
                    <Input
                        style={{ height: 50 }}
                        InputComponent={
                            <TextInputMask
                                type={'money'}
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={price}
                                onChangeText={text => {
                                    setPrice(text)
                                }}
                                ref={(ref) => moneyvalue = ref}
                        />
                        }
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