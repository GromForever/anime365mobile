import React from 'react';
import {Pressable, StyleSheet, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {MaterialIcons} from "@expo/vector-icons";
import {useTheme} from "../../hooks/useTheme";

const NavigationSettingsItem = ({icon, route, title}) => {
    const {themeStyles} = useTheme()
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate(route, {title: title})} style={style.pressable}>
            <View style={style.container}>
                <View style={style.icon}>
                    {icon}
                </View>
                <View style={style.textBlock}>
                    <Text style={[style.title,themeStyles.text]}>{title}</Text>
                    <MaterialIcons name={"navigate-next"} color={"grey"} size={20}/>
                </View>
            </View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    pressable: {
      width: "100%"
    },
    textBlock: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        borderStyle: "solid",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    icon: {
        flex: 0,
        paddingLeft: 3,
        paddingRight: 5
    },
    title: {
        fontFamily: 'roboto-regular',
        fontSize: 15
    }
})

export default NavigationSettingsItem;
