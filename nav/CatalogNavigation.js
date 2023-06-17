import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CatalogPage from "../pages/CatalogPage";
import CatalogFilterPage from "../pages/CatalogFilterPage";
import InternetErrorPage from "../components/LoadingError";
import AudioSelectionScreen from "../components/Screens/AudioSelectionScreen";
import OneAnimeScreen from "../components/Screens/OneAnimeScreen";
import WatchScreen from "../components/Screens/WatchScreen";

const Stack = createNativeStackNavigator();
const CatalogNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"AnimeList"}>
            <Stack.Screen options={{headerShown: false}} name={"AnimeList"} component={CatalogPage}/>
            <Stack.Screen options={{headerShown: false}} name={"InternetError"} component={InternetErrorPage}/>
            <Stack.Screen name={"OneAnime"} options={({route}) => ({title: route.params.title, headerShown: false})} component={OneAnimeScreen}/>
            <Stack.Screen name={"WatchPage"} component={WatchScreen}/>
            <Stack.Screen name={"CatalogFilter"} component={CatalogFilterPage}/>
            <Stack.Screen name={"AudioSelection"} component={AudioSelectionScreen}/>
        </Stack.Navigator>
    );
};

export default CatalogNavigation;
