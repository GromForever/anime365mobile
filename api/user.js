export const LoginRequest = async (login, password) => {
    const response = await fetch(`https://smotret-anime.online/api/login?app=universal&email=${login}&password=${password}`)
    if (!response.ok) {
        throw new Error("Произошла ошибка при попытке авторизации, повторите позже.");
    }
    const json = await response.json();
    if (json.error !== undefined)  {
        return json.error
    }
    return json.data.access_token;
}

export const GetInfoAboutUser = async (token) => {
    const response = await fetch(`https://smotret-anime.com/api/me?access_token=${token}`)
    if (response.status === 500) {
        throw new Error("Ошибка сервера")
    }
    const json = await response.json();
    return json.data;
}
