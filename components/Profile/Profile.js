import {StyleSheet, View} from "react-native";
import {userStore} from "../../store";
import {observer} from "mobx-react-lite";
import AuthorizedComponent from "./AuthorizedComponent";
import NotAuthorizedComponent from "./NotAuthorizedComponent";
import AuthScreen from "../Screens/AuthScreen";

const Profile = observer(() => {
    return (
        <View style={styles.wrapper}>
            {userStore.isLogined ? <AuthorizedComponent/> : <NotAuthorizedComponent/>}
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Profile;
