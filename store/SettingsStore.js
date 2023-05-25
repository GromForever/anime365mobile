import {makeAutoObservable, runInAction} from "mobx";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {Platform, useColorScheme} from "react-native";
import SettingsHelper from "../common/SettingsHelper";

export default class SettingsStore {

    //
    //Fields
    //
    useSystemTheme = true;
    isDarkTheme = false;
    isCacheEnabled = false;
    cacheMode = "onlyPosters";
    commentTreeExp = false;
    isNotificationsEnabled = true;
    updateRate = 180;

    constructor() {
        makeAutoObservable(this)
        this.loadConfiguration().catch((reason) => console.log(`Произошла непредвиденная ошибка при загрузке настроек. ${reason}`));
    }

    async loadConfiguration() {
        if (Platform.OS !== "web") {
            console.log("Загрузка настроек...")
            const useSystemTheme = (await SettingsHelper.LoadSetting("useSystemThemeBool")) ?? true
            const isDarkTheme = (await SettingsHelper.LoadSetting("isDarkThemeBool") ?? true)
            const isCacheEnabled = (await SettingsHelper.LoadSetting("isCacheEnabledBool") ?? true)
            const cacheMode = (await SettingsHelper.LoadSetting("cacheModeString") ?? "onlyPosters")
            const commentTreeExp = (await SettingsHelper.LoadSetting("commentTreeBool") ?? false)
            const isNotificationsEnabled = (await SettingsHelper.LoadSetting("isNotificationsEnabledBool") ?? true)
            const updateRate = (await SettingsHelper.LoadSetting("updateRateInt") ?? 3 * 60)
            runInAction(() => {
                this.useSystemTheme = Boolean(useSystemTheme);
                this.isDarkTheme = Boolean(isDarkTheme);
                this.isCacheEnabled = Boolean(isCacheEnabled);
                this.cacheMode = cacheMode;
                this.commentTreeExp = Boolean(commentTreeExp);
                this.isNotificationsEnabled = Boolean(isNotificationsEnabled);
                this.updateRate = parseInt(updateRate);
            })
            console.log("Загрузка настроек завершена, проверьте лог на наличие ошибок.")
        }
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
