import React from 'react';
import {Text, View} from "react-native";
import {Switch} from "react-native-gesture-handler";
import {observer} from "mobx-react-lite";
import {settingsStore} from "../store";
import {useTheme} from "../hooks/useTheme";

const DesignSettingsPage = observer(() => {
    const {themeStyles, toggleTheme} = useTheme();
    const HandleSwitchChanged = (value) => {
        settingsStore.setTheme(value ? "dark" : "light")
            .then(()=> console.log("Успешно изменена тема"))
            .catch((error) => console.log(`Тема не была изменена, ошибка: ${error.message}`))
        toggleTheme();
    }
    return (
        <View style={[themeStyles.background]}>
           <Text style={[themeStyles.text]}>Настройки внешнего вида приложения!</Text>
            <Switch
                    onValueChange={(e) => HandleSwitchChanged(e)}
                    value={settingsStore.theme === "dark"}
            >
            </Switch>
        </View>
    );
});

export default DesignSettingsPage;