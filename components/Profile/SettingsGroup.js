import React from 'react';
import {StyleSheet, View} from "react-native";
import SettingsItem from "./SettingsItem";
import {useTheme} from "../../hooks/useTheme";

const SettingsGroup = ({data}) => {
    const {themeStyles} = useTheme();
    return (
        <View style={[style.container, themeStyles.settingsBlock]}>
            <View style={style.wrapper}>
                {data && data.map((item) => {
                    return <SettingsItem key={item.title} route={item.route} title={item.title} icon={item.icon}/>
                })}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        display: "flex",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    wrapper: {
        width: "90%",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column"
    }
})

export default SettingsGroup;
