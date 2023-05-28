import {Platform, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ThemeProvider} from "./common/ThemeProvider";
import BottomMainNav from "./nav/BottomMainNav";

const App = () => {
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
