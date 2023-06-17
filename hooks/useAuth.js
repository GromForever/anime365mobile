import {useState} from "react";
import {userStore} from "../store";
import {InitialRequest, LoginWithForm} from "../api/webPage";

export const useAuth = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [isAuthorizing, setIsAuthorizing] = useState(false)
    const [isAuthSuccess, setIsAuthSuccess] = useState(true)
    const Auth = async () => {
        try {
            setIsAuthSuccess(true);
            setIsAuthorizing(true)
            const result = await userStore.login(login, pass)
            setIsAuthorizing(false)
            setIsAuthSuccess(result);
            return result;
        } catch (e) {
            setIsAuthorizing(false)
            setIsAuthSuccess(false);
            return false;
        }
    }

    return {login, setLogin, pass, setPass, isAuthorizing, isAuthSuccess, Auth}
}
