import CryptoJS from "react-native-crypto-js";
import AsyncStorage from '@react-native-community/async-storage';

export const setItem = (key, data) => {
    const encData =  CryptoJS.AES.encrypt(data, 'malfhp28349123f4hakjdsfhr2318921asjkfla').toString();
    return AsyncStorage.setItem(key, encData);
}

export const getItem = async (key) => {
    const item = await AsyncStorage.getItem(key);
    if (item) {
        return CryptoJS.AES.decrypt(item, 'malfhp28349123f4hakjdsfhr2318921asjkfla').toString(CryptoJS.enc.Utf8);
    }
    return item;
}
export const removeItem = async (key) => {
    return AsyncStorage.removeItem(key);
}