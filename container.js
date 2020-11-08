import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";

const Container = (props) => {
    return (
    <>
    <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress:(props.navigation.toggleDrawer )}}
          centerComponent={{ text: props.route.name, style: { color: '#fff' } }}
    />
        {props.children}
    </>
    );
}

export default Container;