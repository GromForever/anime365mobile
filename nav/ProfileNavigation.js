import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfilePage from "../pages/ProfilePage";
import DesignSettingsPage from "../pages/DesignSettingsPage";
import {useTheme} from "../hooks/useTheme";
import AuthScreen from "../pages/AuthScreen";

const Stack = createNativeStackNavigator();
export const ProfileNavigation = () => {
    const {themeStyles} = useTheme();
    return (
        <Stack.Navigator initialRouteName={"ProfileMain"} screenOptions={{headerBackTitle: "Назад", headerStyle: {backgroundColor: themeStyles.background}, headerTintColor: themeStyles.text}}>
            <Stack.Screen name={"ProfileMain"} component={ProfilePage} options={{headerShown: false}}/>
            <Stack.Screen name={"designSettings"} component={DesignSettingsPage} options={({route}) => ({title: route.params.title})}/>
            <Stack.Screen name={"authScreen"} component={AuthScreen} options={{title: "Авторизация"}}/>
        </Stack.Navigator>
    )
}
