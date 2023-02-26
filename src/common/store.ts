import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStoreItem = async (key: string) => {
    let res;
    try {
        res = await AsyncStorage.getItem(key);
        if (!!res) {
            return JSON.parse(res);
        }
        return null;
    } catch (e) {
        throw new Error(e);
    }
}

export const setStoreItem = async (key: string, value: any) => {
    let json = JSON.stringify(value);
    try {
        await AsyncStorage.setItem(key, json);
    } catch (e) {
        throw new Error(e);
    }
}
