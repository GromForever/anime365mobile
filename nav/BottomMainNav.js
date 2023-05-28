import React from 'react';
import {StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import ToViewNavigation from "./ToViewNavigation";
import CatalogNavigation from "./CatalogNavigation";
import {ProfileNavigation} from "./ProfileNavigation";
import {NavigationContainer} from "@react-navigation/native";
import {useTheme} from "../hooks/useTheme";

const Tab = createBottomTabNavigator();
const BottomMainNav = () => {
    const {theme} = useTheme();
    return (
        <NavigationContainer >
            <Tab.Navigator screenOptions={{tabBarStyle: theme === "dark" ? darkStylesFotTabs.container : null}}>
                <Tab.Screen options={{ headerShown: false }} name="Главная" component={HomePage} />
                <Tab.Screen options={{ headerShown: false }} name="К просмотру" component={ToViewNavigation} />
                <Tab.Screen options={{ headerShown: false }} name="Каталог" component={CatalogNavigation} />
                <Tab.Screen options={{ headerShown: false }} name="Профиль" component={ProfileNavigation} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const darkStylesFotTabs = StyleSheet.create({
    container: {
        backgroundColor: "#313131",
        color: "white",
        borderTopColor: "#313131"
    }
})


export default BottomMainNav;