import {Image, StyleSheet, View} from "react-native";
import error from "../assets/Icon/Errors/error2.png";

const EmptyListComponent = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={error} alt={"Упс"}/>
            <Text style={styles.title}>Не найдено</Text>
            <Text style={styles.description}>По вашему запросу ничего не найдено или произошла ошибка при загрузке данных</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    description: {
        fontSize: 16,
        fontWeight: "normal"
    },
})
export default EmptyListComponent;
