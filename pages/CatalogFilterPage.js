import {StyleSheet, View} from "react-native";
import InDevelopment from "../components/InDevelopment";

const CatalogFilterPage = () => {
    return (
        <View style={Styles.container}>
            <InDevelopment/>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
})

export default CatalogFilterPage;
