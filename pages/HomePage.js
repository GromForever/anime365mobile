import React from 'react';
import {StyleSheet, View} from "react-native";
import InDevelopment from "../components/InDevelopment";
import {useTheme} from "../hooks/useTheme";

const HomePage = () => {
    const {themeStyles} = useTheme();
    return (
        <View style={[Styles.container, themeStyles.background]}>
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
