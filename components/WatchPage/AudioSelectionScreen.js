import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';

export default function AudioSelectionScreen({ route, navigation }) {
    const {audioTracks, onAudioSelect} = route.params;
    const [searchText, setSearchText] = useState('');

    const filteredAudioTracks = useMemo(() => audioTracks.filter((audioTrack) =>
        audioTrack.authorsSummary.toLowerCase().includes(searchText.toLowerCase())
    ), [searchText, audioTracks]);

    const handleAudioSelect = (audioTrack) => {
        onAudioSelect(audioTrack);
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.searchInput}
                onChangeText={setSearchText}
                value={searchText}
                placeholder="Поиск озвучки..."
            />
            {filteredAudioTracks.map((audioTrack) => (
                <TouchableOpacity
                    key={audioTrack.id}
                    style={styles.audioTrack}
                    onPress={() => handleAudioSelect(audioTrack)}
                >
                    <Text style={styles.audioTrackText}>{audioTrack.authorsSummary + ` ${audioTrack.type}`}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        width: '80%',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    audioTrack: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    audioTrackText: {
        fontSize: 18,
    },
});
