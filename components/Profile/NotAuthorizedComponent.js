import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useMemo, useRef} from "react";
import {useNavigation} from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import {useAuth} from "../../hooks/useAuth";
import LoadingButton from "../LoadingButton";

const NotAuthorizedComponent = () => {
    const snapPoints = useMemo(() =>
        ["1%", "80%"], []
    )
    const BottomSheetRef = useRef(null);
    const auth = useAuth();
    return (
        <View style={Styles.container}>
            <Text>Ты не авторизован!</Text>
            <Button title={"Авторизоваться"} onPress={() => BottomSheetRef.current.expand()}/>
            <BottomSheet ref={BottomSheetRef} enablePanDownToClose={true} snapPoints={snapPoints}>
                <TextInput onChangeText={auth.setLogin} value={auth.login} placeholder={"Введите логин..."}></TextInput>
                <TextInput onChangeText={auth.setPass} value={auth.pass} secureTextEntry={true} placeholder={"Введите пароль..."}></TextInput>
                <LoadingButton onPress={() => auth.Auth()} loading={auth.isAuthorizing} textWhenLoading={"Авторизация..."}>
                    <Text>Авторизоваться</Text>
                </LoadingButton>
                {!auth.isAuthSuccess && <View style={Styles.errorBlock}>
                    <Text>Произошла ошибка при авторизации, проверьте свои данные и повторите попытку</Text>
                </View>}
            </BottomSheet>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    errorBlock: {
        marginTop: 20,
        backgroundColor: "#f63f3f",
        borderRadius: 10
    }
})

export default NotAuthorizedComponent;
