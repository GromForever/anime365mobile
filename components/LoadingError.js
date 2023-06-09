import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native"
import {Image} from "expo-image"
import errorImage from "../assets/Icon/Errors/error1.png"
import {observer} from "mobx-react-lite";
import {useTheme} from "../hooks/useTheme";


const LoadingError = observer(({RefreshFunc}) => {
    const {themeStyles} = useTheme();
    return (
        <View style={[styles.container, themeStyles.background]}>
            <Image contentFit={"contain"} transition={250} source={errorImage} style={styles.image} alt={"Ошибка!"}/>
            <Text style={[styles.errorTitle, themeStyles.text]}>Ошибка</Text>
            <Text style={[styles.errorDescription, themeStyles.text]}>При загрузке данных произошла ошибка на стороне сервера</Text>
            <Pressable onPress={RefreshFunc}>
                <View style={[styles.refreshButton, themeStyles.buttonBlock]}>
                    <Text style={[styles.buttonText, themeStyles.text]}>Попробовать снова</Text>
                </View>
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "75%",
        height: "auto",
        aspectRatio: 1
    },
    refreshButton: {
        marginTop: 10,
        width: "75%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        paddingHorizontal: 10
    },
    errorTitle: {
        fontSize: 24,
        marginTop: 5,
        fontWeight: "bold"
    },
    errorDescription: {
        marginTop: 5,
        fontSize: 20,
        width: "80%",
        fontWeight: "normal",
        textAlign: "center"
    },
    buttonText: {
        fontSize: 20
    }
})

export default LoadingError;
