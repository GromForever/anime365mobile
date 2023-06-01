import React from 'react';
import {View, StyleSheet, Text, Pressable} from "react-native";
import {useTheme} from "../hooks/useTheme";
import {userStore} from "../store";
import Communications from 'react-native-communications';

const SubscriptionSettingsScreen = () => {
    const {themeStyles} = useTheme();
    const premiumDate = userStore.userData.isPremium ? new Date(userStore.userData.premiumUntil) : null
    return (
        <View style={[styles.container, themeStyles.background]}>
            <Text style={[themeStyles.text]}>ID аккаунта: {userStore.userData.id}</Text>
            <Text style={[themeStyles.text]}>Premium пользователь: {userStore.userData.isPremium ? "Да" : "Нет"}</Text>
            {userStore.userData.isPremium && <Text style={[themeStyles.text]}>Подписка до: {premiumDate.getDay() + '.' + premiumDate.getMonth() + '.' + premiumDate.getFullYear()}</Text>}
            <View style={styles.info}><Text style={[themeStyles.text]}>Продлить или оформить подписку можно на странице профиля <Pressable onPress={() => {Communications.web("https://smotret-anime.com/users/profile")}}><Text style={styles.profileLink}>сайта.</Text></Pressable></Text></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    info: {
        flexDirection: "row"
    },
    profileLink: {
        color: "blue",
        borderBottomWidth: 1,
        borderBottomColor: "blue"
    }
})

export default SubscriptionSettingsScreen;