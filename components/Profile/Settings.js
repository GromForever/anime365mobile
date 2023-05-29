import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import SettingsGroup from "./SettingsGroup";
import {data} from "../../common/settingsData";
import {useTheme} from "../../hooks/useTheme";

const Settings = () => {
    const {themeStyles} = useTheme();
    return (
        <View style={styles.container}>
            <Text style={[styles.titleText, themeStyles.text]}>Настройки</Text>
            <View style={{paddingVertical: 10}}></View>
            <SettingsGroup data={data}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    titleText: {
        fontSize: 16,
        fontFamily: "roboto-bold"
    }
})

export default Settings;
