import React from 'react';
import {View, Text} from "react-native";
import SettingsGroup from "./SettingsGroup";

const Settings = () => {
    return (
        <View style={{flex: 1, flexDirection: "column"}}>
            <Text>Настройки</Text>
            <SettingsGroup/>
            <View style={{paddingVertical: 10}}></View>
            <SettingsGroup/>
        </View>
    );
};

export default Settings;
