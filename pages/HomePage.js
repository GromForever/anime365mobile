import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from "react-native";
import InDevelopment from "../components/InDevelopment";
import {useTheme} from "../hooks/useTheme";
import AnimePlayer from "../components/WatchPage/AnimePlayer";

const HomePage = () => {
    const {themeStyles} = useTheme();
    return (
        <View style={[Styles.container, themeStyles.background]}>
            {<InDevelopment/>}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default HomePage;
