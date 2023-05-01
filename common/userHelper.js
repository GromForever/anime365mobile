export default class UserHelper {
    static isGuest(apiMeResponse) {
        if (apiMeResponse.isLogined === false)
            return true;
        return apiMeResponse.name === "Гость";

    }
}
