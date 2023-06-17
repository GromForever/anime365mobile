import {ScrollView} from "react-native";
import AnimePlayer from "../WatchPage/AnimePlayer";
import {useRoute} from "@react-navigation/native";
const WatchScreen = () => {
    const params = useRoute().params

    return (
        <ScrollView style={{height: "100%", width: "100%"}}>
            <AnimePlayer animeId={params.animeId} episodeId={params.episodeId}/>
        </ScrollView>
    )
};

export default WatchScreen;