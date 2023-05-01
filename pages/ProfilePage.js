import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import InDevelopment from "../components/InDevelopment";
import {Observer} from "mobx-react-lite";
import {userStore} from "../store";
import LoadingComponent from "../components/LoadingComponent";

const ProfilePage = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [isAuthorizing, setIsAuthorizing] = useState(false)
    const [IsAuthSuccess, setIsAuthSuccess] = useState(true)
    const Auth = async () => {
        setIsAuthSuccess(true);
        setIsAuthorizing(true)
        const result = await userStore.login(login, pass)
        setIsAuthSuccess(result);
        setIsAuthorizing(false)
    }
    return (
        <View style={Styles.container}>
            {isAuthorizing && <LoadingComponent/>}
            <Observer>
                {() =>
                <View>
                    {userStore.token === null ? <View>
                        <Text>Вы не авторизованы</Text>
                        <TextInput onChangeText={(value) => setLogin(value)} placeholder={"Логин"}></TextInput>
                        <TextInput secureTextEntry={true} textContentType={"password"} onChangeText={(value) => setPass(value)} placeholder={"Пароль"}></TextInput>
                        <Button title={"Авторизоваться"} onPress={Auth}></Button>
                    </View> : <View>
                        <Text>Вы авторизованны!</Text>
                        <Text>Привет, {userStore.userData.name}!</Text>
                        <Text>Премиум подписка: {userStore.userData.isPremium ? "Да" : "Нет"}</Text>
                    </View>}
                </View>
                }
            </Observer>
            {!IsAuthSuccess && <View style={Styles.errorBlock}>
                <Text>Произошла ошибка при авторизации, проверьте свои данные и повторите попытку</Text>
            </View>}
            {/*<InDevelopment/>*/}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    errorBlock: {
        marginTop: 20,
        backgroundColor: "#f63f3f",
        borderRadiusL: 10
    }
})

export default ProfilePage;
