import React from 'react';
import {Text, TextInput, View} from "react-native";
import AnimeList from "../components/AnimeList";

const CatalogPage = () => {
    return (
        <View style={{height: "100%"}}>
            <View style={{height: "100%"}}>
                <Text style={{fontSize: 24, paddingTop: 60, fontWeight: "bold", paddingLeft: 30}}>Аниме</Text>
                <TextInput placeholder={"Поиск..."} style={{width: "90%", marginLeft: 15, marginTop: 20, padding: 3, borderStyle: "solid", borderWidth: 1, borderRadius: 5, marginBottom: 20}}></TextInput>
                <AnimeList></AnimeList>
            </View>
        </View>
    );
};

export default CatalogPage;
