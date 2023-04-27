import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const ToViewNavigation = () => {
    //TODO: Доделать навигацию.
    return (
        <Stack.Navigator initialRouteName={"ToViewList"}>
            <Stack.Screen name={"ToViewList"}/>
        </Stack.Navigator>
    );
};

export default ToViewNavigation;
