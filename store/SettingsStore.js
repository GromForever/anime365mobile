import {makeAutoObservable} from "mobx";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {useColorScheme} from "react-native";

export default class SettingsStore {

    //
    //Fields
    //

    useSystemTheme;
    isDarkTheme;
    isCacheEnabled;
    cacheMode;
    commentTreeExp;
    isNotificationsEnabled;
    updateRate;

    constructor() {
        makeAutoObservable(this)
        this.loadConfiguration().catch(() => console.log("Произошла непредвиденная ошибка"));
    }

    async loadConfiguration() {
        this.useSystemTheme = (await AsyncStorageNative.getItem("useSystemThemeBool")) ?? true
        this.isDarkTheme = (await AsyncStorageNative.getItem("isDarkThemeBool") ?? this.useSystemTheme ? useColorScheme() === "dark" : false)
        this.isCacheEnabled = (await AsyncStorageNative.getItem("isCacheEnabledBool") ?? true)
        this.cacheMode = (await AsyncStorageNative.getItem("cacheModeString") ?? "onlyPosters")
        this.commentTreeExp = (await AsyncStorageNative.getItem("commentTreeBool") ?? false)
        this.isNotificationsEnabled = (await AsyncStorageNative.getItem("isNotificationsEnabledBool") ?? true)
        this.updateRate = (await AsyncStorageNative.getItem("updateRateInt") ?? 3 * 60)
    }

    //
    // Actions
    //
    async toggleUseSystemTheme() {
        this.useSystemTheme = !this.useSystemTheme;
        await AsyncStorageNative.setItem("useSystemThemeBool", this.useSystemTheme)
        if (this.useSystemTheme) {
            this.isDarkTheme = useColorScheme() === "dark"
            await AsyncStorageNative.setItem("isDarkThemeBool", this.isDarkTheme)
        }
    }

    async toggleCache() {
        this.isCacheEnabled = !this.isCacheEnabled
        await AsyncStorageNative.setItem("isCacheEnabledBool", this.isCacheEnabled)
    }

    async setCacheMode(mode: string){
        this.cacheMode = mode;
        await AsyncStorageNative.setItem("cacheModeString", this.cacheMode)
    }

    async toggleCommentTreeExp() {
        this.commentTreeExp = !this.commentTreeExp;
        await AsyncStorageNative.setItem("commentTreeBool", this.commentTreeExp)
    }

    async toggleNotifications() {
        this.isNotificationsEnabled = !this.isNotificationsEnabled;
        await AsyncStorageNative.setItem("isNotificationsEnabledBool", this.isNotificationsEnabled)
    }

    async setServerSyncRate(rate) {
        this.updateRate = rate;
        await AsyncStorageNative.setItem("isNotificationsEnabledBool", this.updateRate)
    }

}
