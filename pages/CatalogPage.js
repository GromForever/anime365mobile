import React from 'react';
import {Text, TextInput, View} from "react-native";
import AnimeList from "../components/AnimeList";

const CatalogPage = () => {
    return (
        <View style={{height: "100%"}}>
            <View style={{height: "100%"}}>
                <AnimeList></AnimeList>
            </View>
        </View>
    );
};

export default CatalogPage;
