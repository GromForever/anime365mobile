import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native"
import {useNavigation} from "@react-navigation/native";


const InternetErrorPage = () => {
    const errorImage = useMemo(() => {
        const randValue = Math.floor(Math.random() * 4) + 1;
        switch (randValue) {
            case 1: return require(`../assets/Icon/Errors/error1.png`)
            case 2: return require(`../assets/Icon/Errors/error2.png`)
            case 3: return require(`../assets/Icon/Errors/error3.png`)
            case 4: return require(`../assets/Icon/Errors/error4.png`)
        }
    })

    const navigation = useNavigation();
    const PageStyles = () => {
        //TODO: Доделать реализацию смены стилей при изменении темы приложения
        return PageStylesLight;
    }
    return (
        <View style={PageStyles.container}>
            <Image source={errorImage} alt={"Ошибка!"}/>
            <Text style={PageStyles.errorTitle}>Нет интернета</Text>
            <Text style={PageStyles.errorDescription}>Проверьте соединение с сетью и попробуйте снова.</Text>
            <Pressable onPress={() => navigation.goBack()}>
                <View style={PageStyles.refreshButton}>
                    <Text style={PageStyles.buttonText}>Попробовать снова</Text>
                </View>
            </Pressable>
        </View>
    );
};

const PageStylesLight = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "50%",
        height: "auto"
    },
    refreshButton: {
        width: "75%",
        height: "35",
        backgroundColor: "#7FF361",
        justifyContent: "center",
        alignItems: "center"
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    errorDescription: {
        fontSize: 20,
        fontWeight: "normal",
    },
    buttonText: {
        fontSize: 20
    }
})

const PageStylesDark = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#313131"
    },
    image: {
        width: "50%",
        height: "auto"
    },
    refreshButton: {
        width: "75%",
        height: "35",
        backgroundColor: "#575757",
        justifyContent: "center",
        alignItems: "center"
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    errorDescription: {
        fontSize: 20,
        fontWeight: "normal",
        color: "#FFFFFF"
    },
    buttonText: {
        fontSize: 20,
        color: "#FFFFFF"
    }
})

export default InternetErrorPage;
