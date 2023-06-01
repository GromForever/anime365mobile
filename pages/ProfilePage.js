import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Modal from "react-native-modal";
import {observer} from "mobx-react-lite";
import Profile from "../components/Profile/Profile";
import Settings from "../components/Profile/Settings";
import {useTheme} from "../hooks/useTheme";
import {userStore} from "../store";

const ProfilePage = observer(() => {
    const {themeStyles} = useTheme();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const logoutHandle = () => {
        userStore.logout().catch((e) => console.warn(`При попытки выйти из аккаунта произошла ошибка: ${e.message}`))
        setIsModalVisible(false)
    }
    return (
        <View style={[styles.container, themeStyles.background]}>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalView}>
                    <Text>Вы уверены, что хотите выйти? Для возможности просмотра или обновления списков вам будет необходимо авторизоваться снова.</Text>
                    <View style={styles.modalButtons}>
                        <Pressable onPress={logoutHandle}>
                            <Text>Выйти</Text>
                        </Pressable>
                        <Pressable onPress={() => setIsModalVisible(false)}>
                            <Text>Отмена</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <SafeAreaView style={styles.saveView}>
                <Profile/>
                <View style={{marginTop: 30}}></View>
                <Settings/>
                {userStore.isLogined && <View style={styles.logout}>
                    <Pressable onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.logoutText}>Выйти</Text>
                    </Pressable>
                </View>}
            </SafeAreaView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%"
    },
    saveView: {
        height: "100%",
        width: "100%"
    },
    logout: {
        flex: 1,
        flexDirection: "column-reverse",
        alignItems: "center",
        marginBottom: 20
    },
    logoutText: {
        fontSize: 16,
        color: "red"
    },
    modalButtons: {
        marginTop: 10,
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    modalView: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignSelf: "center",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})

export default ProfilePage;
