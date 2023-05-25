import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage"
import {NavigationContainer} from "@react-navigation/native";
import CatalogNavigation from "./nav/CatalogNavigation";
import ToViewNavigation from "./nav/ToViewNavigation";
import {ProfileNavigation} from "./nav/ProfileNavigation";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
          <GestureHandlerRootView style={{flex: 1}}>
              <SafeAreaView style={AppStyles.container}>
                  <StatusBar barStyle={"dark-content"}/>
                  <NavigationContainer >
                      <Tab.Navigator>
                          <Tab.Screen options={{ headerShown: false }} name="Главная" component={HomePage} />
                          <Tab.Screen options={{ headerShown: false }} name="К просмотру" component={ToViewNavigation} />
                          <Tab.Screen options={{ headerShown: false }} name="Каталог" component={CatalogNavigation} />
                          <Tab.Screen options={{ headerShown: false }} name="Профиль" component={ProfileNavigation} />
                      </Tab.Navigator>
                  </NavigationContainer>
              </SafeAreaView>
          </GestureHandlerRootView>
  );
}

const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        justifyContent: "center"
    }
})
