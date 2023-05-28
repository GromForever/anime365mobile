import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfilePage from "../pages/ProfilePage";
import DesignSettingsPage from "../pages/DesignSettingsPage";

const Stack = createNativeStackNavigator();
export const ProfileNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"ProfileMain"}>
            <Stack.Screen name={"ProfileMain"} component={ProfilePage} options={{headerShown: false}}/>
            <Stack.Screen name={"designSettings"} component={DesignSettingsPage}/>
        </Stack.Navigator>
    )
}
