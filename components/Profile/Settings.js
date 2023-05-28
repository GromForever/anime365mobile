import React from 'react';
import {View, Text} from "react-native";
import SettingsGroup from "./SettingsGroup";
import {data} from "../../common/settingsData";
import {useTheme} from "../../hooks/useTheme";

const Settings = () => {
    const {themeStyles} = useTheme();
    return (
        <View style={{flex: 1, flexDirection: "column"}}>
            <Text style={themeStyles.text}>Настройки</Text>
            <View style={{paddingVertical: 10}}></View>
            <SettingsGroup data={data}/>
        </View>
    );
};

export default Settings;
