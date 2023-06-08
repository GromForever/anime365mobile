import {ApiHeaders} from "./consts";
import {userStore} from "../store";


//TODO: Добавить нормальную обработку ошибок. Сделать поведение более очевидным.
export const fetchTranslationsForEpisode = async (episodeId) => {
    try {
        const result = await fetch(`https://smotret-anime.online/api/episodes/${episodeId}`, {
            headers: ApiHeaders
        })

        const translations = await result.json()
        return translations.data;
    } catch (e) {
        return null
    }
}


//NOTE: Обязательно требуется авторизация и наличие подписки, иначе придет 403.
export const fetchTranslationStreams = async (episodeId) => {
    if (userStore.token && userStore.userData.isPremium) {
        const result = await fetch(`https://smotret-anime.com/api/translations/embed/${episodeId}?access_token=${userStore.token}`, {
            headers: ApiHeaders
        })
        if (result.statusCode !== 200)
            throw new Error("Для запроса информации для скачивания или просмотра необходимо наличие подписки или ваша сессия недействительна!")
        const data = await result.json();
        return data.data
    }
    throw new Error("Для запроса информации для скачивания или просмотра необходима авторизация!")
}