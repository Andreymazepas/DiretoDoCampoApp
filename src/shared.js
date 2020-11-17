import { AsyncStorage } from 'react-native';
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
        await firebase.database().ref('users/' + user.role + '/' + user.username).once('value', snapshot => {
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

const getFarmName = async () => {
    console.log("getFarmName")
    const user = await getUserLocal();
    let data = null;
    try {
        firebase.database().ref('users/Produtor/' + user.username).once('value', snapshot => {
            data = snapshot.val();
            console.log("FarmName", data);
        })
    } catch (e) { console.log(e) }
    if (!data.farmName) {
        return "Fazendinha Cogumelinho";
    }
    return data.farmName;
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
        await firebase.database().ref('products/' + user.username).once('value', snapshot => {
            data = snapshot.val();
        })
    } catch (e) { return null; }
    return data;
}

const deleteProduct = async (key) => {
    console.log("deleteProduct")
    const user = await getUserLocal();
    try {
        console.log(key)
        firebase.database().ref('products/' + user.username).child(key).remove();
        console.log("foi")
    } catch (e) { }
}

const getAllProducts = async () => {
    console.log("getAllProducts")
    let prod_data = [];
    try {
        await firebase.database().ref('products/')
            .once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.key;
                    var value = childSnapshot.val();
                    Object.keys(value).map((k, i) => {
                        prod_data.push({ key: k, data: value[k] })
                    })
                })
            })
    } catch (e) { return null; }
    console.log("list prod_data", prod_data)
    if (prod_data.length > 0) {
        return prod_data;
    } else {
        return null;
    }
}

export {
    getDataRemote,
    getUserRemote,
    signup,
    storeUser,
    getFarmName,
    addProduct,
    getProducts,
    deleteProduct,
    getAllProducts,
}