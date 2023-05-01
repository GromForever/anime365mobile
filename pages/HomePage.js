import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import InDevelopment from "../components/InDevelopment";

const HomePage = () => {
    return (
        <View style={Styles.container}>
            <InDevelopment/>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default HomePage;
