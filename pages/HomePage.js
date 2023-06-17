import React from 'react';
import {StyleSheet, View} from "react-native";
import InDevelopment from "../components/InDevelopment";
import {useTheme} from "../hooks/useTheme";
import {main} from "../api/webPage";

const HomePage = () => {
    const {themeStyles} = useTheme();
    main().then(data => console.log("Успешно")).catch(e => `Произошла ошибка: ${e.message}`)
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
