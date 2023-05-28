import React from 'react';
import {Pressable, StyleSheet, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {MaterialIcons} from "@expo/vector-icons";
import {useTheme} from "../../hooks/useTheme";

const SettingsItem = ({icon, route, title}) => {
    const {themeStyles} = useTheme()
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate(route)} style={style.container}>
            <View style={style.block}>
                <View style={{paddingLeft: 3, paddingRight: 5}}>
                    {icon}
                </View>
                <View style={style.textBlock}>
                    <Text style={themeStyles.text}>{title}</Text>
                    <MaterialIcons name={"navigate-next"} color={"grey"} size={20}/>
                </View>
            </View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    container: {
        width: "100%"
    },
    textBlock: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        borderStyle: "solid"
    },
    block: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    }
})

export default SettingsItem;
