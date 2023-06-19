import {WebsiteLogin} from "../api/webPage";



// Тест не будет пройден, jest не сможет использовать cookieManager. Тест завершится с ошибкой
test("Login with Form should return auth token", async () => {
    const email = "HyperClapOff@yandex.ru";
    const password = "laik3737ka2000";
    const authToken = await WebsiteLogin(email, password);
    expect(authToken).not.toBeFalsy();
    expect(authToken).not.toBeNull();
})