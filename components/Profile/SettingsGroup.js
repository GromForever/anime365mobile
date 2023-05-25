import React from 'react';
import {StyleSheet, View} from "react-native";
import SettingsItem from "./SettingsItem";

const SettingsGroup = ({data}) => {
    return (
        <View style={style.container}>
            {data && data.map((item) => {
                return <SettingsItem onPress={item.onPress} title={item.title} icon={item.icon}/>
            })}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        backgroundColor: "#E9E7E7",
        borderRadius: 12
    }
})

export default SettingsGroup;
