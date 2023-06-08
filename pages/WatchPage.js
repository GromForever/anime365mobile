import {ScrollView, Text} from "react-native";
import {useState} from "react";
import AnimePlayer from "../components/WatchPage/AnimePlayer";
import {useNavigation, useRoute} from "@react-navigation/native";
const WatchPage = () => {
    const params = useRoute().params
    const [episodeNumber, setEpisodeNumber] = useState(params.episode)
    const [title, setTitle] = useState('');

    const handleVideoChanged = (selectedTranslation) => {
        setTitle(selectedTranslation.title)
    }

    return (
        <ScrollView style={{height: "100%", width: "100%"}}>
            <Text>{title && title.length > 0 && title}</Text>
            <AnimePlayer animeId={params.animeId} episodeNumber={episodeNumber} onVideoChanged={handleVideoChanged}/>
        </ScrollView>
    )
};

export default WatchPage;