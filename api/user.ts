import {ApiMeResponse, LoginResponse} from "../types/api/series";
import {ErrorResponse} from "../types/api/series";

export const LoginRequest = async (login, password) => {
    const response = await fetch(`https://smotret-anime.online/api/login?app=universal&email=${login}&password=${password}`)
    if (!response.ok) {
        throw new Error("Произошла ошибка при попытке авторизации, повторите позже.");
    }
    const json : LoginResponse | ErrorResponse = await response.json();
    console.log(json)
    return json
}

export const GetInfoAboutUser = async (token) => {
    const response = await fetch(`https://smotret-anime.com/api/me?access_token=${token}`)
    if (response.status === 500) {
        throw new Error("Ошибка сервера")
    }
    const json : ApiMeResponse = await response.json();
    return json.data;
}
