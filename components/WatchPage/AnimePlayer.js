import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Video} from "expo-av";
import {useAnimePlayerData} from "../../hooks/useAnimePlayerData";

const AnimePlayer = ({animeId, episodeNumber, onVideoChanged}) => {
    const {
        videoSource,
        translations,
        selectedTranslation,
        quality,
        selectTranslation,
        notification,
        handleVideoError,
        streamData
    } = useAnimePlayerData(animeId, episodeNumber);

    const handleTranslationSelect = (translation) => {
        onVideoChanged(selectedTranslation);
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
            {videoSource && (
                <View>
                    <Video
                        onError={handleVideoError}
                        source={{ uri: videoSource }}
                        resizeMode="contain"
                        shouldPlay={true}
                        useNativeControls={true}
                        style={{ width: '100%', height: 300 }}
                    />
                </View>
            )}
            <View>
                <Text>{notification}</Text>
                <View>{translations && translations.length > 0 && translations.map((translation) => (
                    <TouchableOpacity key={translation.id} onPress={() => handleTranslationSelect(translation)}>
                        <Text>{translation.title}</Text>
                    </TouchableOpacity>
                ))}</View>
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
    video: {
        height: 400,
        width: 400
    },
    subtitles: {
        position: "absolute"
    }
})

export default AnimePlayer;