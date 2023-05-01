import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import {NavigationContainer} from "@react-navigation/native";
import CatalogNavigation from "./nav/CatalogNavigation";
import ToViewNavigation from "./nav/ToViewNavigation";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
      <SafeAreaView style={AppStyles.container}>
          <StatusBar barStyle={"dark-content"}/>
          <NavigationContainer>
              <Tab.Navigator>
                  <Tab.Screen options={{ headerShown: false }} name="Главная" component={HomePage} />
                  <Tab.Screen options={{ headerShown: false }} name="К просмотру" component={ToViewNavigation} />
                  <Tab.Screen options={{ headerShown: false }} name="Каталог" component={CatalogNavigation} />
                  <Tab.Screen options={{ headerShown: false }} name="Профиль" component={ProfilePage} />
              </Tab.Navigator>
          </NavigationContainer>
      </SafeAreaView>
  );
}

const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        justifyContent: "center"
    }
})
