import React from 'react';
import {Pressable, StyleSheet, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SettingsItem = ({icon, onPress, title}) => {
    return (
        <Pressable onPress={onPress} style={style.container}>
            {icon}
            <View style={style.textBlock}>
                <Text>{title}</Text>
                <MaterialIcons name={"navigate-next"} color={"grey"} size={20}/>
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
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        borderStyle: "solid"
    }
})

export default SettingsItem;
