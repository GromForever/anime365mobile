import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import SettingsGroup from "./SettingsGroup";
import {data} from "../../common/settingsData";
import {useTheme} from "../../hooks/useTheme";
import {observer} from "mobx-react-lite";
import {userStore} from "../../store";
import NavigationSettingsItem from "./NavigationSettingsItem";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

const Settings = observer(() => {
    const {themeStyles} = useTheme();
    const {isLogined} = userStore
    return (
        <View style={styles.container}>
            {isLogined && <SettingsGroup>
                <NavigationSettingsItem title={"Управление подпиской"} icon={<MaterialCommunityIcons name="crown" size={24} color="yellow" />} route={"subscriptionSettings"}/>
            </SettingsGroup>}
            {__DEV__ &&
                <View>
                    <View style={{paddingVertical: 10}}></View>
                    <SettingsGroup>
                        <NavigationSettingsItem title={"Инструменты разработчика"} icon={<MaterialIcons name="developer-mode" size={24} color="black" />} route={"developerSettings"}/>
                    </SettingsGroup>
                </View>
            }
            <View style={{paddingVertical: 10}}></View>
            <SettingsGroup data={data}/>
        </View>
    );
});

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
