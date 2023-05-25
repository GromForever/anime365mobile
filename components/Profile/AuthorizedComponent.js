import {Image, View, Text, Pressable, StyleSheet} from "react-native";
import avatar from "../../assets/avatars/AnimeAnonymous.png"
import {observer} from "mobx-react-lite";
import { EvilIcons } from '@expo/vector-icons';
import {userStore} from "../../store";
import {useCallback} from "react";
import Communications from 'react-native-communications';

const AuthorizedComponent = observer(() => {
    const {isPremium, userData} = userStore
    const linkToProfile = useCallback(() => {
        Communications.web("https://smotret-anime.com/users/profile")
    })
    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <Pressable onPress={linkToProfile}>
                    <EvilIcons name="external-link" size={24} color="blue" />
                </Pressable>
                <Pressable>
                    <Text style={styles.button}>Изм.</Text>
                </Pressable>
            </View>
            <Image style={styles.avatarImage} source={avatar}/>
            <Text style={styles.nickname}>{userData.name}</Text>
            <Text style={isPremium ? styles.premium : styles.noPremium}>{isPremium ? "Premium" : "Standard"}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    headerContent: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 30
    },
    button: {
        color: "blue",
        fontSize: 14
    },
    avatarImage: {
        width: "40%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: 1000
    },
    nickname: {
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 15
    },
    premium: {
        color: "#ffd700",
        fontSize: 14,
    },
    noPremium: {
        color: "black",
        fontSize: 16
    },
})

export default AuthorizedComponent;
