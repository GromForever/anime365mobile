import {useState} from "react";
import {userStore} from "../store";

export const useAuth = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [isAuthorizing, setIsAuthorizing] = useState(false)
    const [isAuthSuccess, setIsAuthSuccess] = useState(true)
    const Auth = async () => {
        setIsAuthSuccess(true);
        setIsAuthorizing(true)
        const result = await userStore.login(login, pass)
        setIsAuthSuccess(result);
        setIsAuthorizing(false)
    }

    return {login, setLogin, pass, setPass, isAuthorizing, isAuthSuccess, Auth}
}
