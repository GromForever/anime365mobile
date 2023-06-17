import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Pressable} from "react-native";
import {Video} from "expo-av";
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
            const availableQualities = streamData.stream.map((stream) => stream.height);
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
                <Video
                    onError={handleVideoError}
                    source={{ uri: videoSource }}
                    posterSource={blackPoster}
                    resizeMode="contain"
                    shouldPlay={false}
                    useNativeControls={true}
                    style={{ width: '100%', height: 300 }}
                />
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
        backgroundColor: "black"
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