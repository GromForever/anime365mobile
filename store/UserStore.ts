import {action, makeObservable, observable, runInAction} from "mobx";
import {GetInfoAboutUser, LoginRequest} from "../api/user";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import UserHelper from "../common/userHelper";
import {Platform} from "react-native";
import {LoginResponse} from "../types/api/series";


export default class UserStore {
    userData = {}
    token = null;
    isLogined = false;

    constructor() {
        makeObservable(this, {
            userData: observable,
            token: observable,
            isLogined: observable,
            restoreSession: action,
            login: action,
            logout: action
        })
        this.restoreSession();
    }

    async restoreSession() {
        if (Platform.OS !== "web") {
            const token = await AsyncStorageNative.getItem("access_token");
            if (token === null) {
                runInAction(() => {
                    this.userData = {}
                    this.token = null;
                    this.isLogined = false;
                })
                return;
            }
            const data = await GetInfoAboutUser(token);
            if (UserHelper.isGuest(data)) {
                runInAction(() => {
                    this.token = null;
                    this.userData = {};
                    this.isLogined = false
                })
                await AsyncStorageNative.removeItem("access_token");
                return;
            }
            runInAction(() => {
                this.token = token;
                this.userData = data;
                this.isLogined = true
            })
        }
    }

    async login(login, password) {
        const tokenOrError = await LoginRequest(login, password);
        if ("data" in tokenOrError) {
            const authData = tokenOrError as LoginResponse
            const infoAboutUser = await GetInfoAboutUser(authData.data.access_token)
            runInAction(() => {
                this.token = authData.data.access_token;
                this.userData = infoAboutUser;
                this.isLogined = true;
            })
            await AsyncStorageNative.setItem("access_token", authData.data.access_token)
            return true;
        }
        return false;
    }

    async logout() {
        runInAction(() => {
            this.userData = {}
            this.token = null;
            this.isLogined = false;
        })
        await AsyncStorageNative.removeItem("access_token");
    }
}
