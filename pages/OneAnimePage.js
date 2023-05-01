import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FetchOneAnimeAsync} from "../api/series";
import LoadingComponent from "../components/LoadingComponent";
import {useNavigation, useRoute} from "@react-navigation/native";

const OneAnimePage = () => {
    const {id, title} = useRoute().params;
    const navigation = useNavigation();
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function FetchOneAnime() {
            const response = await FetchOneAnimeAsync(id);
            setAnime(response);
            setLoading(false)
        }
        FetchOneAnime();
        navigation.setOptions({headerTitle: title})
    }, [])


    return (
        <View>
            {loading && <LoadingComponent/>}
            <Image style={{height: 100, width: 100}} source={{uri: anime?.posterUrl}}/>
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
