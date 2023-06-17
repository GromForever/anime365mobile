import {ApiHeaders} from "./consts";
import {userStore} from "../store";
import {EmbedTranslationsResponse, EpisodesResponse, ErrorResponse} from "../types/api/series";


//TODO: Добавить нормальную обработку ошибок. Сделать поведение более очевидным.
export const fetchTranslationsForEpisode = async (episodeId : number) => {
    try {
        const result = await fetch(`https://smotret-anime.online/api/episodes/${episodeId}`, {
            headers: ApiHeaders
        })

        const translations : EpisodesResponse | ErrorResponse = await result.json()
        return translations;
    } catch (e) {
        return null
    }
}


//NOTE: Обязательно требуется авторизация и наличие подписки, иначе придет 403.
export const fetchTranslationStreams = async (episodeId : number, token : string) => {
    if (token) {
        const result = await fetch(`https://smotret-anime.com/api/translations/embed/${episodeId}?access_token=${token}`, {
            headers: ApiHeaders
        })
        const data : EmbedTranslationsResponse | ErrorResponse = await result.json();
        return data
    }
    throw new Error("Для запроса информации для скачивания или просмотра необходима авторизация!")
}