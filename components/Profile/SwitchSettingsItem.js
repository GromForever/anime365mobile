import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {Switch} from "react-native-gesture-handler";
import {useTheme} from "../../hooks/useTheme";

const SwitchSettingsItem = ({title, switchValue, onSwitchValueChanged}) => {
    const {themeStyles} = useTheme();
    return (
        <View>
            <View style={styles.container}>
                <Text style={[styles.title,themeStyles.text]}>{title}</Text>
                <Switch value={switchValue} onValueChange={onSwitchValueChanged}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 16,
        fontFamily: "roboto-regular"
    }
})

export default SwitchSettingsItem;