import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import CatalogNavigation from "./pages/CatalogNavigation";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
      <SafeAreaProvider>
          <StatusBar barStyle={"dark-content"}/>
          <NavigationContainer>
              <Tab.Navigator>
                  <Tab.Screen options={{ headerShown: false }} name="Главная" component={HomePage} />
                  <Tab.Screen options={{ headerShown: false }} name="Каталог" component={CatalogNavigation} />
                  <Tab.Screen options={{ headerShown: false }} name="Профиль" component={ProfilePage} />
              </Tab.Navigator>
          </NavigationContainer>
      </SafeAreaProvider>
  );
}
