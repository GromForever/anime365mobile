import {makeAutoObservable} from "mobx";
import {GetInfoAboutUser, LoginRequest} from "../api/user";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import UserHelper from "../common/userHelper";


export default class UserStore {
    userData
    token

    constructor() {
        makeAutoObservable(this);
        this.restoreSession();
    }

    async restoreSession() {
        const token = await AsyncStorageNative.getItem("access_token");
        if (token === null) {
            this.userData = {}
            this.token = null;
            return;
        }
        this.token = token;
        const data = await GetInfoAboutUser(token);
        if (UserHelper.isGuest(data)) {
            this.token = null;
            this.userData = {};
            await AsyncStorageNative.removeItem("access_token");
            return;
        }
        this.userData = data;
    }

    async login(login, password) {
        const tokenOrError = await LoginRequest(login, password);
        if (tokenOrError.message === undefined) {
            this.token = tokenOrError;
            this.userData = await GetInfoAboutUser(tokenOrError)
            await AsyncStorageNative.setItem("access_token", tokenOrError)
            return true;
        }
        return false;
    }

    async logout() {
        await AsyncStorageNative.removeItem("access_token");
        this.userData = {}
        this.token = null;
    }
}
