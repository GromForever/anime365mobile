import React from 'react';
import {Button, Text, TextInput, View, StyleSheet} from "react-native";
import {useAuth} from "../../hooks/useAuth";
import LoadingButton from "../LoadingButton";
import {useTheme} from "../../hooks/useTheme";
import {useNavigation} from "@react-navigation/native";
import {userStore} from "../../store";

const AuthScreen = () => {
    const {themeStyles} = useTheme();
    const auth = useAuth();
    const navigation = useNavigation();

    const handleAuth = () => {
        auth.Auth().then((result) => {
            if (result) {
                setTimeout(() => {
                    navigation.goBack()
                }, 1000)
            }
        }).catch(e => console.warn(e.message))
    }
    return (
        <View style={[styles.container, themeStyles.background]}>
            <View style={[styles.textInputBlock, themeStyles.settingsBlock]}>
                <TextInput placeholderTextColor={themeStyles.inputTextColor} onChangeText={auth.setLogin} value={auth.login} placeholder={"Логин..."}></TextInput>
            </View>
            <View style={[styles.textInputBlock, themeStyles.settingsBlock]}>
                <TextInput placeholderTextColor={themeStyles.inputTextColor} onChangeText={auth.setPass} value={auth.pass} secureTextEntry={true} placeholder={"Пароль..."}></TextInput>
            </View>
            <LoadingButton wrapperStyle={{marginTop: 10}} onPress={() => handleAuth()} loading={auth.isAuthorizing} textWhenLoading={"Авторизация..."}>
                <Text>Авторизоваться</Text>
            </LoadingButton>
            {!auth.isAuthSuccess && <View style={styles.errorBlock}>
                <Text style={themeStyles.text}>Произошла ошибка при авторизации, проверьте свои данные и повторите попытку</Text>
            </View>}
            {auth.isAuthSuccess && userStore.isLogined && <View style={styles.successAuthBlock}>
                <Text style={themeStyles.text}>Успешная авторизация, привет {userStore.userData.name}!</Text>
            </View>}
            <Text style={[themeStyles.text, styles.info]}>Разработчик приложения не хранит ваши данные для авторизации, авторизация производится единым запросом к сайту anime365 и после получения токена удаляется.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    textInputBlock: {
        borderRadius: 6,
        padding: 5,
        marginTop: 10,
        width: "80%"
    },
    errorBlock: {
        marginTop: 10,
        borderRadius: 6,
        padding: 5,
        backgroundColor: "#af2727"
    },
    successAuthBlock: {
        marginTop: 10,
        borderRadius: 6,
        padding: 5,
        backgroundColor: "#5bb729"
    },
    info: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "200",
        textAlign: "center"
    }

})

export default AuthScreen;