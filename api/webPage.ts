import CookieManager from '@react-native-cookies/cookies';
import axios from "axios";

const client = axios.create({
    baseURL: "https://smotret-anime.com",
    headers: {'User-Agent': 'anime365Mobile/0.1'},
    withCredentials: true
})

export async function WebsiteLogin(email, password) {
    try {
        await CookieManager.getFromResponse(`https://smotret-anime.com/animelist/edit/25875?mode=mini`)
        const cookies = await CookieManager.get(`https://smotret-anime.com`);
        return await LoginWithForm(email, password, cookies);

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function LoginWithForm(email, password, cookies) : Promise<string | boolean> {
    const formData = `csrf=${cookies.csrf.value}&LoginForm%5Busername%5D=${encodeURIComponent(email)}&LoginForm%5Bpassword%5D=${encodeURIComponent(password)}&yt0=&dynpage=1`;
    const result = await client.post("/users/login", formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF8',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    //Кука aaaa8ed0da05b797653c4bd51877d861 хранит в себе данные об авторизации пользователя, она сохранится в куках устройства
    //Но на всякий случай лучше сохранить ее еще в AsyncStorage, чтобы не волноваться об ее исчезновении.
    if (result.headers["set-cookie"].find(cookie => cookie.includes("aaaa8ed0da05b797653c4bd51877d861"))) {
        return (await CookieManager.get("https://smotret-anime.com")).aaaa8ed0da05b797653c4bd51877d861.value
    }
    return false;
}
