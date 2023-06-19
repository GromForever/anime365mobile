import CookieManager from '@react-native-cookies/cookies';

export async function WebsiteLogin(email, password) {
    try {
        const Networking = require('react-native/Libraries/Network/RCTNetworking')
        Networking.clearCookies(() => {})
        const cookiesRequest = await fetch("https://smotret-anime.com");
        await CookieManager.setFromResponse("https://smotret-anime.com", cookiesRequest.headers.get('set-cookie'))
        const cookies = await CookieManager.get(`https://smotret-anime.com`);
        return await LoginWithForm(email, password, cookies);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function LoginWithForm(email, password, cookies) : Promise<string | boolean> {
    const formData = `csrf=${cookies.csrf.value}&LoginForm%5Busername%5D=${encodeURIComponent(email)}&LoginForm%5Bpassword%5D=${encodeURIComponent(password)}&yt0=&dynpage=1`;
    const result = await fetch("https://smotret-anime.com/users/login", {
        method: "POST",
        credentials: "include",
        body: formData,
        headers : {
            'User-Agent': "Anime365Mobile/0.1",
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    //Кука aaaa8ed0da05b797653c4bd51877d861 хранит в себе данные об авторизации пользователя, она сохранится в куках устройства
    //Но на всякий случай лучше сохранить ее еще в AsyncStorage, чтобы не волноваться об ее исчезновении.
    const authCookie = result.headers.get("set-cookie").includes("aaaa8ed0da05b797653c4bd51877d861")
    if (authCookie) {
        await CookieManager.setFromResponse("https://smotret-anime.com", result.headers.get("set-cookie"));
        return (await CookieManager.get("https://smotret-anime.com")).aaaa8ed0da05b797653c4bd51877d861.value
    }
    return false;
}
