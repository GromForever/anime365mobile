import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function AudioSelectionScreen({ route, navigation }) {
    const {audioTracks, onAudioSelect} = route.params;
    const [searchText, setSearchText] = useState('');

    const filteredAudioTracks = useMemo(audioTracks.filter((audioTrack) =>
        audioTrack.label.toLowerCase().includes(searchText.toLowerCase())
    ), [searchText, audioTracks]);

    const handleAudioSelect = (audioTrack) => {
        onAudioSelect(audioTrack);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                onChangeText={setSearchText}
                value={searchText}
                placeholder="Поиск озвучки..."
            />
            {filteredAudioTracks.map((audioTrack) => (
                <TouchableOpacity
                    key={audioTrack.value}
                    style={styles.audioTrack}
                    onPress={() => handleAudioSelect(audioTrack)}
                >
                    <Text style={styles.audioTrackText}>{audioTrack.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
