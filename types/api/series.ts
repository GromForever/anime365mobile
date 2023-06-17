/**
 * Ответ сервера по ссылке /api/series
 */
export interface SeriesResponse {
    data: {
        /**
         * id аниме на основном сайте
         */
        id: number;
        /**
         * id аниме на aniDb.net
         */
        aniDbId: number
        /**
         * id аниме на animenewsnetwork.com
         */
        animeNewsNetworkId: number;
        /**
         * id аниме на fansabs.ru
         */
        fansubsId: number;
        /**
         * id аниме на imdb
         */
        imdbId: number;
        /**
         * id аниме на worldArt
         */
        worldArtId: number;
        /**
         * определяет доступно ли аниме или нет
         */
        isActive: number;
        /**
         * определяет onGoing ли аниме или нет
         */
        isAiring: number;
        /**
         * определяет относиться ли жанр к хентаю или нет.
         */
        isHentai: number;
        /**
         * Ссылки, которые отображаются на сайте на странице аниме справа и связаны с этим аниме.
         */
        links: {
            /**
             * Название ресурса, на котоырый ведет ссылка.
             */
            title: string;
            /**
             * Ссылка на внешний ресурс.
             */
            url: string;
        }[];
        /**
         * id аниме на myAnimeList
         */
        myAnimeListId: number;
        /**
         * Рейтинг аниме на myAnimeListScore. Используется как основной для отображения на сайте.
         */
        myAnimeListScore: string;
        /**
         * Рейтинг на worldArtScore
         */
        worldArtScore: string;
        /**
         * Позиция аниме в рейтинге на сайте worldArt
         */
        worldArtTopPlace: number | null;
        /**
         * Количество эпизодов в сезоне аниме.
         */
        numberOfEpisodes: number;
        /**
         * Сезон выхода аниме (Весна 2023, Зима 2022, etc)
         */
        season: string;
        /**
         * Год выхода аниме.
         */
        year: number;
        /**
         * Тип аниме (tv, film, ova, ona, special)
         */
        type: string;
        /**
         * Отображаемое имя для типа аниме.
         */
        typeTitle: string;
        /**
         * Название аниме на разных языках.
         */
        titles: {
            [key: string]: string;
        };
        /**
         * Ссылка на постер к аниме (высокое разрешение)
         */
        posterUrl: string;
        /**
         * Ссылка на постер к аниме (низкое разрешение)
         */
        posterUrlSmall: string;
        /**
         * Название аниме в двух основных отображаемых языках.
         */
        titleLines: string[];
        /**
         * Различные названия аниме (синонимы, названия на других языках)
         */
        allTitles: string[];
        /**
         * Полное название аниме состоящее из русского и ramaji
         */
        title: string;
        /**
         * Ссылка на аниме на сайте.
         */
        url: string;
        /**
         * Описания аниме, взятые с различных сайтов.
         */
        descriptions: {
            /**
             * Название сайта, с которого взято описание.
             */
            source: string;
            /**
             * Само описание.
             */
            value: string;
            /**
             * Дата, когда было обновлено описание с сайта.
             */
            updatedDateTime: string;
        }[];
        episodes: Episode[];
        /**
         * Список жанров аниме.
         */
        genres: {
            /**
             * id жанра
             */
            id: number;
            /**
             * Строковое представление жанра.
             */
            title: string;
            /**
             * Ссылка на каталог с настроенным фильтром на этот жанр.
             */
            url: string;
        }[];
    }
}

export interface Episode {
    /**
     * id эпизода на сайте.
     */
    id: number;
    /**
     * Полное название серии (1 серия, фильм, ova 1)
     */
    episodeFull: string;
    /**
     * Число, определяющее эпизод.
     */
    episodeInt: string;
    /**
     * Название эпизода (не у всех есть)
     */
    episodeTitle: string;
    /**
     * Тип эпизода (film, ova, ona, tv)
     */
    episodeType: string,
    /**
     * Дата, когда первый перевод для эпизода был загружен.
     */
    firstUploadedDateTime: string,
    /**
     * Доступен ли эпизод или нет.
     */
    isActive: number,
    /**
     * не совсем понимаю что должен значить этот параметр
     */
    isFirstUploaded: number,
    /**
     * Id аниме, к которому относиться этот эпизод.
     */
    seriesId: number
}

export interface ErrorResponse {
    error: {
        code: number,
        message: string
    }
}

export interface EpisodesResponse {
    data: {
        id: number,
        episodeFull: string,
        episodeInt: string,
        episodeTitle: string,
        episodeType: string,
        firstUploadedDateTime: string,
        isActive: number,
        isFirstUploaded: number,
        serialId: number,
        translations: Translation[],
    }
}

export interface ExtendedTranslation extends Translation{
    episode: Episode,
    series: SeriesResponse["data"]
}

export interface TranslationsResponse {
    data: ExtendedTranslation
}

export interface EmbedTranslationsResponse {
    data: {
        embedUrl: string,
        download: {
            height: number,
            url: string
        }[],
        stream: {
            height: number,
            urls: string[]
        }[],
        subtitlesUrl?: string,
        subtitlesVttUrl?: string
    }
}

export interface LoginResponse {
    data: {
        access_token: string
    }
}

export interface ApiMeResponse {
    data: {
        isLogined: boolean,
        id: number,
        name: string,
        isPremium: boolean,
        premiumUntil: string
    }
}

export interface Translation {
    id: number,
    addedDateTime: string,
    activeDateTime: string,
    authorsList: string[],
    fansubsTranslationId: number,
    isActive: number,
    priority: number,
    qualityType: string,
    type: string,
    typeKind: string,
    typeLang: string,
    updatedDateTime: string,
    title: string,
    seriesId: number,
    episodeId: number,
    url: string,
    embedUrl: string,
    authorsSummary: string,
    duration: string,
    width: number,
    height: number
}