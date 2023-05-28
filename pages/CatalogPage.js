import React from 'react';
import {View, StyleSheet, SafeAreaView} from "react-native";
import AnimeList from "../components/AnimeList";
import {useTheme} from "../hooks/useTheme";

const CatalogPage = () => {
    const {themeStyles} = useTheme()
    return (
        <View style={[styles.container, themeStyles.background]}>
            <SafeAreaView>
                <AnimeList></AnimeList>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})

export default CatalogPage;
