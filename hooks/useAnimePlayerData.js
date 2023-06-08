import { useState, useEffect } from 'react';
import {FetchOneAnimeAsync} from "../api/series";
import {fetchTranslationsForEpisode} from "../api/episodes";
import {userStore} from "../store";

export const useAnimePlayerData = (animeId, episodeNumber) => {
    const [videoSource, setVideoSource] = useState(null);
    const [translations, setTranslations] = useState([]);
    const [selectedTranslation, setSelectedTranslation] = useState(null);
    const [quality, setQuality] = useState(1080);
    const [notification, setNotification] = useState('');
    const [streamData, setStreamData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const seriesData = await FetchOneAnimeAsync(animeId)
                const targetEpisode = seriesData.episodes.find((episode) => episode.episodeInt == episodeNumber);
                if (!targetEpisode) {
                    throw new Error('Эпизод не найден');
                }

                const episodeData = await fetchTranslationsForEpisode(targetEpisode.id)
                setTranslations(episodeData.translations);

                const voiceRuTranslation = episodeData.translations.find((translation) => translation.type === 'voiceRu');
                //TODO: Переделать, добавить чтобы если не было русской озвучки, смотреть на другие типы и выбрать там первый из вариантов.
                if (!voiceRuTranslation) {
                    throw new Error('Перевод на русский не найден');
                }
                setSelectedTranslation(voiceRuTranslation);

                const translationResponse = await fetch(`https://smotret-anime.com/api/translations/embed/${voiceRuTranslation.id}?access_token=${userStore.token}`);
                const translationTemp = await translationResponse.json();
                const translationData = translationTemp.data;
                setStreamData(translationData)
                const streamSource = translationData.stream[0].urls[0];
                setVideoSource(streamSource);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        }
        fetchData();
    }, [animeId, episodeNumber]);

    const selectTranslation = async (translation, videoQuality, skipNotification = false) => {
        try {
            const translationResponse = await fetch(`https://smotret-anime.com/api/translations/embed/${translation.id}?access_token=${userStore.token}`);
            const translationData = await translationResponse.json();

            const availableQualities = translationData.data.stream.map((stream) => stream.height);
            if (!availableQualities.includes(videoQuality)) {
                videoQuality = availableQualities[0]; // Если выбранного качества нет, устанавливаем первое доступное
            }
            setQuality(videoQuality);

            const streamSource = translationData.data.stream.find((stream) => stream.height === videoQuality);
            setVideoSource(streamSource.urls[0]);
            setSelectedTranslation(translation);
            if (!skipNotification) {
                setNotification('');
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const handleVideoError = (error) => {
        console.error('Ошибка при воспроизведении видео:', error);

        if (!selectedTranslation) return;

        const availableQualities = selectedTranslation.stream.map((stream) => stream.quality);
        const currentQualityIndex = availableQualities.indexOf(quality);

        if (availableQualities[currentQualityIndex + 1]) {
            const lowerQuality = availableQualities[currentQualityIndex + 1];
            setNotification(`Качество видео было снижено с ${quality} на ${lowerQuality}, т.к. текущее не поддерживается.`);
            selectTranslation(selectedTranslation.id, lowerQuality, true);
        } else {
            setNotification('К сожалению, это видео не может быть воспроизведено на вашем устройстве.');
        }
    };

    return {
        videoSource,
        translations,
        selectedTranslation,
        setSelectedTranslation,
        quality,
        setQuality,
        selectTranslation,
        notification,
        handleVideoError,
        streamData
    };
};