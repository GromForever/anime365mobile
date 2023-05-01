import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const AnimeListHeader = ({searchValue, onChange}) => {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Аниме</Text>
            <TextInput style={Styles.input} value={searchValue} onChangeText={onChange} placeholder={"Поиск аниме..."}></TextInput>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight:"bold"
    },
    input: {
        marginTop: 7,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000",
        fontSize: 14
    }
})

export default AnimeListHeader;
