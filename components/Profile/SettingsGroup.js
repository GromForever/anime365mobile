import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import SettingsItem from "./SettingsItem";
import {useTheme} from "../../hooks/useTheme";

const SettingsGroup = ({data}) => {
    const {themeStyles} = useTheme();
    return (
        <View style={style.container}>
            <View style={[style.wrapper, themeStyles.settingsBlock]}>
                <FlatList ItemSeparatorComponent={SettingsSeparator} scrollEnabled={false} data={data} renderItem={({item}) => {
                    return <SettingsItem key={item.title} route={item.route} title={item.title} icon={item.icon}/>
                }}/>
            </View>
        </View>
    );
};

const SettingsSeparator = () => {
    return(
        <View style={{paddingVertical: 5}}></View>
    )
}

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
        paddingVertical: 7,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    }
})

export default SettingsGroup;
