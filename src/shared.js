import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';

const getUserLocal = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) { return null; }
}

const getUserRemote = async (user) => {
    let data = null;
    try {
        firebase.database().ref('users/' + user.role + '/' + user.username).on('value', snapshot => {
            data = snapshot.val();
        });
    } catch (e) { return null; }
    return data;
}

const getDataRemote = async () => {
    const user = await getUserLocal();
    let data = null;
    try {
        firebase.database().ref('users/' + user.role + '/' + user.username).on('value', snapshot => {
            data = snapshot.val();
        });
    } catch (e) { return null; }
    return data;
}

const storeUser = async (value) => {
    try {
        await AsyncStorage.setItem('@user', value)
    } catch (e) { }
}

const signup = async (user) => {
    console.log("signup")
    try {
        firebase
            .database()
            .ref('users/' + user.role + '/' + user.username)
            .set({
                role: user.role
            });
    } catch (e) { return null; }
}

const addProduct = async (prod) => {
    console.log("addProduct")
    const user = await getUserLocal();
    try {
        firebase
            .database()
            .ref('products/' + user.username)
            .push(prod);
    } catch (e) { return null; }
}

const getProducts = async () => {
    console.log("getProducts")
    const user = await getUserLocal();
    let data = null;
    try {
        firebase.database().ref('products/' + user.username).on('value', snapshot => {
            data = snapshot.val();
            console.log("prod", data)
        });
    } catch (e) { return null; }
    return data;
}

export {
    getDataRemote,
    getUserRemote,
    signup,
    storeUser,
    addProduct,
    getProducts
}