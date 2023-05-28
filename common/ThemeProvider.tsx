import {createContext, useState} from 'react';
import {themes} from "./ThemesStyle";
import {settingsStore} from "../store";
import {StatusBar} from "react-native";
import {observer} from "mobx-react-lite";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export type ThemeContextType = {
    theme: string
    toggleTheme: any,
    themeStyles: typeof themes.light
}
// @ts-ignore
export const ThemeProvider = observer(({ children }) => {
    const [theme, setTheme] = useState(settingsStore.theme)
    const toggleTheme = () => {
        setTheme(settingsStore.theme === "dark" ? "dark" : "light");
    };

    const themeStyles = themes[theme];

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles}}>
            <StatusBar barStyle={theme === "light" ? "dark-content" : "light-content"}/>
            {children}
        </ThemeContext.Provider>
    );
});