import React from 'react';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {observer} from "mobx-react-lite";
import Profile from "../components/Profile/Profile";
import Settings from "../components/Profile/Settings";
import {useTheme} from "../hooks/useTheme";

const ProfilePage = observer(() => {
    const {themeStyles} = useTheme();
    return (
        <View style={[styles.container, themeStyles.background]}>
            <SafeAreaView style={styles.saveView}>
                {/*<Profile/>*/}
                <Settings/>
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
    }
})

export default ProfilePage;
