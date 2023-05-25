import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

export default class SettingsHelper {
    static async LoadSetting(key) {
        try {
            return await AsyncStorageNative.getItem(key);
        } catch (error) {
            console.log(`Произошла ошибка при загрузке настройки ${key}. Ошибка: ${error}`)
        }
    }
}
