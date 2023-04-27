import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CatalogPage from "./CatalogPage";
import OneAnimePage from "./OneAnimePage";

const Stack = createNativeStackNavigator();
const CatalogNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"AnimeList"}>
            <Stack.Screen options={{headerShown: false}} name={"AnimeList"} component={CatalogPage}/>
            <Stack.Screen name={"OneAnime"} component={OneAnimePage}/>
        </Stack.Navigator>
    );
};

export default CatalogNavigation;
