import {Platform, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ThemeProvider} from "./common/ThemeProvider";
import BottomMainNav from "./nav/BottomMainNav";
import {useFonts} from "expo-font";
import roboto from "./assets/fonts/Roboto-Regular.ttf"

const App = () => {
    const [fontsLoaded] = useFonts({
        'roboto': roboto,
        'customicons': {uri: "https://smotret-anime.com/font/customicons/customicons.woff?2="}
    })
  return (
          <GestureHandlerRootView style={{flex: 1}}>
              <ThemeProvider>
                  <BottomMainNav/>
              </ThemeProvider>
          </GestureHandlerRootView>
  );
}

export default App;

const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        justifyContent: "center"
    }
})
