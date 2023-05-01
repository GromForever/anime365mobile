import React from 'react';
import {Platform, StyleSheet, View, Image, Text} from "react-native";
import error from "../assets/Icon/Errors/error4.png"

const InDevelopment = () => {
    return (
        <View style={Styles.container}>
            <Image style={Styles.image} source={error}/>
            <Text style={Styles.title}>В разработке</Text>
            <Text style={Styles.description}>Данный функционал приложения в разработке, запаситесь терпением!</Text>
            <Text style={Styles.deviceInfo}>{Platform.Version}</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "75%",
        height: "auto",
        aspectRatio: 1
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    description: {
        fontSize: 20,
        fontWeight: "normal"
    },
    deviceInfo: {
        fontSize: 16,
        fontWeight: "300"
    }
})


export default InDevelopment;
