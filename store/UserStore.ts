import {action, makeObservable, observable, runInAction} from "mobx";
import {GetInfoAboutUser, LoginRequest} from "../api/user";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import UserHelper from "../common/userHelper";
import {Platform} from "react-native";
import {LoginResponse} from "../types/api/series";
import {WebsiteLogin} from "../api/webPage";
import CookieManager from "@react-native-cookies/cookies";


export default class UserStore {
    userData = {}
    token = null;
    isLogined = false;
    loginCookie = null;

    constructor() {
        makeObservable(this, {
            userData: observable,
            token: observable,
            isLogined: observable,
            loginCookie: observable,
            restoreSession: action,
            login: action,
            logout: action
        })
        this.restoreSession();
    }

    async restoreSession() {
        if (Platform.OS !== "web") {
            const token = await AsyncStorageNative.getItem("access_token");
            const websiteCookie = await AsyncStorageNative.getItem("websiteCookie")
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
                this.loginCookie = websiteCookie;
                this.token = token;
                this.userData = data;
                this.isLogined = true
            })
        }
    }

    async login(login, password) {
        const tokenOrError = await LoginRequest(login, password);
        if ("data" in tokenOrError) {
            const websiteCookie = await WebsiteLogin(login, password);
            if (!websiteCookie)
                return false;
            const websiteCookieString = websiteCookie as string;
            console.log(websiteCookieString)
            const authData = tokenOrError as LoginResponse
            const infoAboutUser = await GetInfoAboutUser(authData.data.access_token)
            runInAction(() => {
                this.token = authData.data.access_token;
                this.loginCookie = websiteCookieString;
                this.userData = infoAboutUser;
                this.isLogined = true;
            })
            await AsyncStorageNative.setItem("access_token", authData.data.access_token)
            await AsyncStorageNative.setItem("websiteCookie", websiteCookieString)
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
