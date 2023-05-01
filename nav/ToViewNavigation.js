import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InDevelopment from "../components/InDevelopment";

const Stack = createNativeStackNavigator();
const ToViewNavigation = () => {
    //TODO: Доделать навигацию.
    return (
        <Stack.Navigator initialRouteName={"ToViewList"}>
            <Stack.Screen options={{headerShown: false}} name={"ToViewList"} component={InDevelopment}/>
        </Stack.Navigator>
    );
};

export default ToViewNavigation;
