import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";

const Container = (props) => {
    return (
        <>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: (props.navigation.toggleDrawer) }}
                centerComponent={{ text: props.route.name, style: { color: '#fff', fontSize: 18 } }}
                containerStyle={{
                    backgroundColor: '#206a5d',
                    justifyContent: 'space-around',
                }}
            />
            {props.children}
        </>
    );
}

export default Container;