import React from 'react';
import {Text, View} from "react-native";
import {Switch} from "react-native-gesture-handler";
import {observer} from "mobx-react-lite";
import {settingsStore} from "../store";
import {useTheme} from "../hooks/useTheme";
import SwitchSettingsItem from "../components/Profile/SwitchSettingsItem";
import SettingsGroup from "../components/Profile/SettingsGroup";

const DesignSettingsPage = observer(() => {
    const {themeStyles, toggleTheme} = useTheme();
    const HandleDarkModeSwitchChanged = (value) => {
        settingsStore.setTheme(value ? "dark" : "light")
            .then(()=> console.log("Успешно изменена тема"))
            .catch((error) => console.log(`Тема не была изменена, ошибка: ${error.message}`))
        toggleTheme();
    }
    return (
        <View style={[themeStyles.background]}>
           <Text style={[themeStyles.text]}>Настройки внешнего вида приложения!</Text>
            <SettingsGroup>
                <SwitchSettingsItem onSwitchValueChanged={HandleDarkModeSwitchChanged} title={"Темная тема"} switchValue={settingsStore.theme === "dark"}/>
            </SettingsGroup>
        </View>
    );
});

export default DesignSettingsPage;