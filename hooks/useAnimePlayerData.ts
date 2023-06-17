import { useState, useEffect } from 'react';
import {FetchOneAnimeAsync} from "../api/series";
import {fetchTranslationsForEpisode, fetchTranslationStreams} from "../api/episodes";
import {isErrorResponse, isSuccessResponse} from "../common/apiHelper";
import {SeriesResponse} from "../types/api/series";
import {userStore} from "../store";

export const useAnimePlayerData = (animeId : number, episodeId : number) => {
    const [videoSource, setVideoSource] = useState<string>(null);
    const [error, setError] = useState<string>(null)
    const [episodes, setEpisodes] = useState<SeriesResponse>(null)
    const [translations, setTranslations] = useState([]);
    const [selectedTranslation, setSelectedTranslation] = useState(null);
    const [quality, setQuality] = useState<number>(1080);
    const [notification, setNotification] = useState<string>('');
    const [streamData, setStreamData] = useState(null);

    async function fetchData() {
        try {
            const seriesData = await FetchOneAnimeAsync(animeId);
            if (isErrorResponse(seriesData)) {
                setError(`Произошла ошибка при загрузке информации об аниме FetchOneAnimeAsync, переданные параметры: ${animeId}`)
                return;
            }
            const SuccessSeriesData = seriesData as SeriesResponse
            setEpisodes(SuccessSeriesData)

            const targetEpisode = SuccessSeriesData.data.episodes.find((episode) => episode.id == episodeId);
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

            const translationResponse = await fetchTranslationStreams(voiceRuTranslation.id, userStore.token)
            setStreamData(translationResponse)
            setVideoSource(translationResponse.stream[0].urls[0]);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [animeId, episodeId]);

    const selectTranslation = async (translation, videoQuality, skipNotification = false) => {
        try {
            const translationResponse = await fetchTranslationStreams(translation.id, userStore.token)

            const availableQualities = translationResponse.stream.map((stream) => stream.height);
            if (!availableQualities.includes(videoQuality)) {
                videoQuality = availableQualities[0]; // Если выбранного качества нет, устанавливаем первое доступное
            }
            setQuality(videoQuality);

            const streamSource = translationResponse.stream.find((stream) => stream.height === videoQuality);
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
        episodes,
        streamData
    };
};