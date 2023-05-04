import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CatalogPage from "../pages/CatalogPage";
import OneAnimePage from "../pages/OneAnimePage";
import CatalogFilterPage from "../pages/CatalogFilterPage";
import InternetErrorPage from "../pages/InternetErrorPage";

const Stack = createNativeStackNavigator();
const CatalogNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"AnimeList"}>
            <Stack.Screen options={{headerShown: false}} name={"AnimeList"} component={CatalogPage}/>
            <Stack.Screen options={{headerShown: false}} name={"InternetError"} component={InternetErrorPage}/>
            <Stack.Screen name={"OneAnime"} options={({route}) => {title: route.params.title}} component={OneAnimePage}/>
            <Stack.Screen name={"CatalogFilter"} component={CatalogFilterPage}/>
        </Stack.Navigator>
    );
};

export default CatalogNavigation;
