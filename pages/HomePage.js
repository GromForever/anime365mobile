import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from "react-native";
import InDevelopment from "../components/InDevelopment";
import {useTheme} from "../hooks/useTheme";
import {userStore} from "../store";
import {getDiscussions} from "../api/web/mainWeb";
import {Image} from "expo-image"

const HomePage = () => {
    const {themeStyles} = useTheme();
    const [discussions, setDiscussions] = useState(null)
    const dayTime = () => {
        const currentHour = new Date().getHours();
        let resultString;
        switch (true) {
            case 4 <= currentHour && currentHour < 12: resultString = "Доброе утро!"; break;
            case 12 <= currentHour && currentHour < 17: resultString = "Добрый день!"; break;
            case 17 <= currentHour && currentHour < 22: resultString = "Добрый вечер!"; break;
            case 22 <= currentHour || currentHour < 4: resultString = "Доброй ночи!"; break;
            default: throw new Error("Произошла ошибка при определении времени дня")
        }
        return resultString;
    }
    useEffect(() => {
        getDiscussions().then(data => setDiscussions(data)).catch(error => console.warn(error.message))
    }, [])
    return (
        <SafeAreaView style={[Styles.container, themeStyles.background]}>
            <View>
                <Text style={[Styles.title, themeStyles.text]}>{dayTime()}</Text>
                {userStore.loginCookie && <Text>К просмотру</Text>}
                <Text>Активные обсуждения</Text>
                {discussions && discussions.map((item, index) => {
                    return <Image key={index} source={item.posterUrl} contentFit={"cover"} style={{aspectRatio: 1, width: 100}}/>
                })}
            </View>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    image: {
        width: 100
    }
})

export default HomePage;
