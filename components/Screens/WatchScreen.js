import {Pressable, ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import AnimePlayer from "../WatchPage/AnimePlayer";
import {useNavigation, useRoute} from "@react-navigation/native";
const WatchScreen = () => {
    const params = useRoute().params

    return (
        <ScrollView style={{height: "100%", width: "100%"}}>
            <AnimePlayer animeId={params.episodes} episodeId={episodeNumber}/>
        </ScrollView>
    )
};

export default WatchPage;