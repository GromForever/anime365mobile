import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CatalogPage from "../pages/CatalogPage";
import OneAnimePage from "../components/Screens/OneAnimeScreen";
import CatalogFilterPage from "../pages/CatalogFilterPage";
import InternetErrorPage from "../components/LoadingError";
import WatchPage from "../components/Screens/WatchScreen";
import AudioSelectionScreen from "../components/Screens/AudioSelectionScreen";

const Stack = createNativeStackNavigator();
const CatalogNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={"AnimeList"}>
            <Stack.Screen options={{headerShown: false}} name={"AnimeList"} component={CatalogPage}/>
            <Stack.Screen options={{headerShown: false}} name={"InternetError"} component={InternetErrorPage}/>
            <Stack.Screen name={"OneAnime"} options={({route}) => ({title: route.params.title, headerShown: false})} component={OneAnimePage}/>
            <Stack.Screen name={"WatchPage"} component={WatchPage}/>
            <Stack.Screen name={"CatalogFilter"} component={CatalogFilterPage}/>
            <Stack.Screen name={"AudioSelection"} component={AudioSelectionScreen}/>
        </Stack.Navigator>
    );
};

export default CatalogNavigation;
