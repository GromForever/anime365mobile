import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import LoadingComponent from "../components/LoadingComponent";
import {useNavigation, useRoute} from "@react-navigation/native";
import useFetchOneAnime from "../hooks/useFetchOneAnime";

const OneAnimePage = () => {
    const {id, title} = useRoute().params;
    const navigation = useNavigation();
    const [anime, isLoading] = useFetchOneAnime(id)

    useEffect(() => {
        navigation.setOptions({headerTitle: title})
    })

    return (
        <View>
            {isLoading && <LoadingComponent/>}
            <Image style={{width: "100%", aspectRatio: 1}} source={{uri: anime?.posterUrl}}/>
            <Text>{anime?.title}</Text>
            <Text>{anime?.url}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 10,
    }
})

export default OneAnimePage;
