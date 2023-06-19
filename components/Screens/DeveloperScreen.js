import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {userStore} from "../../store";
import CookieManager from "@react-native-cookies/cookies";

const DeveloperScreen = () => {
    const [cookieMngAuth, setCookieMngAuth] = useState(null);
    CookieManager.get("https://smotret-anime.com").then(data => setCookieMngAuth(data))
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Инструменты разработчика</Text>
            <View>
                <Text>Кука авторизации: {userStore.loginCookie ? userStore.loginCookie : "null"}</Text>
                <Text>Токен авторизации: {userStore.token ? userStore.token : "null"}</Text>
                <Text>Кука в CookieManager: {cookieMngAuth && cookieMngAuth.aaaa8ed0da05b797653c4bd51877d861?.value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    }
})

export default DeveloperScreen;