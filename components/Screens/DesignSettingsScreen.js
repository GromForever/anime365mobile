import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {observer} from "mobx-react-lite";
import {settingsStore} from "../../store";
import {useTheme} from "../../hooks/useTheme";
import SwitchSettingsItem from "../Profile/SwitchSettingsItem";
import SettingsGroup from "../Profile/SettingsGroup";

const DesignSettingsScreen = observer(() => {
    const {themeStyles, toggleTheme} = useTheme();
    const HandleDarkModeSwitchChanged = (value) => {
        settingsStore.setTheme(value ? "dark" : "light")
            .then(()=> console.log("Успешно изменена тема"))
            .catch((error) => console.log(`Тема не была изменена, ошибка: ${error.message}`))
        toggleTheme();
    }
    return (
        <View style={[styles.container,themeStyles.background]}>
           <Text style={[styles.title,themeStyles.text]}>Настройки внешнего вида приложения</Text>
            <SettingsGroup>
                <SwitchSettingsItem onSwitchValueChanged={HandleDarkModeSwitchChanged} title={"Темная тема"} switchValue={settingsStore.theme === "dark"}/>
            </SettingsGroup>
        </View>
    );
});

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 16
    },
    container: {
        height: "100%"
    }
})

export default DesignSettingsPage;