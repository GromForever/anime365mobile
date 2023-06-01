import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useMemo, useRef} from "react";
import {useNavigation} from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import {useAuth} from "../../hooks/useAuth";
import LoadingButton from "../LoadingButton";
import {useTheme} from "../../hooks/useTheme";

const NotAuthorizedComponent = () => {
    const navigation = useNavigation();
    const {themeStyles} = useTheme();
    return (
        <View style={styles.container}>
            <Text style={[themeStyles.text, styles.title]}>Ты не авторизован!</Text>
            <Button title={"Авторизоваться"} onPress={() => navigation.navigate("authScreen")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default NotAuthorizedComponent;
