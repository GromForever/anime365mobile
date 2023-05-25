import React from 'react';
import {View} from "react-native";
import {observer} from "mobx-react-lite";
import Profile from "../components/Profile/Profile";
import Settings from "../components/Profile/Settings";

const ProfilePage = observer(() => {
    return (
        <View style={{height: "100%"}}>
            <Profile/>
            <Settings/>
        </View>
    );
});

export default ProfilePage;
