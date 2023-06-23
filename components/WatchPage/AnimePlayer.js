import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Pressable, Image} from "react-native";
import Video, {TextTrackType} from "react-native-video";
import {useAnimePlayerData} from "../../hooks/useAnimePlayerData";
import blackPoster from "../../assets/common/blackOnePixel.png"
import {useNavigation, useRoute} from "@react-navigation/native";

const AnimePlayer = ({animeId, episodeId, onVideoChanged}) => {
    const navigation = useNavigation();
    const params = useRoute().params
    const {
        videoSource,
        translations,
        selectedTranslation,
        quality,
        selectTranslation,
        notification,
        handleVideoError,
        streamData
    } = useAnimePlayerData(animeId, episodeId);

    const handleTranslationSelect = (translation) => {
        if (onVideoChanged)
            onVideoChanged(translation)
        selectTranslation(translation, quality);
    };

    const handleQualitySelect = (videoQuality) => {
        if (selectedTranslation) {
            selectTranslation(selectedTranslation, videoQuality);
        }
    };

    // Отображение доступных качеств видео
    const renderQualities = () => {
        if (!selectedTranslation) return null;
        if (streamData) {
            const availableQualities = streamData.data.stream.map((stream) => stream.height);
            return availableQualities.map((videoQuality) => (
                <TouchableOpacity key={videoQuality} onPress={() => handleQualitySelect(videoQuality)}>
                    <Text>{videoQuality}</Text>
                </TouchableOpacity>
            ));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                {videoSource &&
                    <Video
                        onError={e => handleVideoError(e)}
                        textTracks={
                        [
                            {
                                title: "main subtitiles",
                                uri: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt",
                                type: TextTrackType.VTT,
                                language: "en"
                            }
                        ]
                        }
                        key={videoSource}
                        source={{ uri: videoSource }}
                        poster={Image.resolveAssetSource(blackPoster).uri}
                        resizeMode={"contain"}
                        ignoreSilentSwitch={"ignore"}
                        controls={true}
                        style={{ width: '100%', height: 300 }}
                    />
                }
                </View>
            <View>
                <Text>{notification}</Text>
                <View style={styles.audioSelectionBlock}>
                    {/*TODO: Ломается state (в теории) при передаче callback на другой экран, изменить в будущем*/}
                    <Pressable onPress={() => navigation.navigate("AudioSelection", {audioTracks: translations, onAudioSelect: handleTranslationSelect})}>
                        <View>
                            <Text>{selectedTranslation && (selectedTranslation.authorsSummary + ` ${selectedTranslation.type}`)}</Text>
                        </View>
                    </Pressable>
                    <Pressable>

                    </Pressable>
                </View>
                <View>{renderQualities()}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        width: "100%"
    },
    videoContainer: {
        height: 300,
        width: "100%",
    },
    video: {
        height: 400,
        width: 400
    },
    subtitles: {
        position: "absolute"
    },
    audioSelectionBlock: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    }
})

export default AnimePlayer;