import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {useTheme} from "../hooks/useTheme";

const AnimeListHeader = ({searchValue, onChange}) => {
    const {themeStyles} = useTheme();
    return (
        <View style={Styles.container}>
            <Text style={[Styles.title, themeStyles.text]}>Аниме</Text>
            <View style={[Styles.inputBlock, themeStyles.input]}>
                <TextInput returnKeyType={"search"} placeholderTextColor={themeStyles.inputTextColor} style={Styles.input} value={searchValue} onChangeText={onChange} placeholder={"Поиск..."}></TextInput>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontWeight:"bold"
    },
    input: {
        fontSize: 16,
        paddingLeft: 5
    },
    inputBlock: {
        padding: 3,
        borderRadius: 8,
        marginTop: 10
    }
})

export default AnimeListHeader;
