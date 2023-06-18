import {useEffect, useState} from "react";
import {FetchAnimeAsync} from "../api/series";
import {useNavigation} from "@react-navigation/native";
import {SeriesResponse, SeriesResponseArray} from "../types/api/series";

export default function useFetchAnimeByQuery() {
    const [anime, setAnime] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
            setIsLoading(true)
            FetchAnimeAsync(0, 10, query).then((data) => {
                if ("data" in data) {
                    setAnime(data.data)
                } else {
                    setError(data.error.message)
                }
                setIsLoading(false)
            }).catch(error => {
                setError(error.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [query])

    async function onEndReached() {
        if (isLoading !== true) {
            const newAnime = await FetchAnimeAsync(anime.length, 10, query)
            if ("data" in newAnime) {
                const seriesNewAnime = newAnime as SeriesResponseArray
                setAnime(prevAnime => [...prevAnime, ...seriesNewAnime.data])
            }
        }
    }

    async function onRefresh() {
        try {
            setIsLoading(true)
            setIsRefreshing(true)
            const anime = await FetchAnimeAsync(0,10, "");
            if ("data" in anime) {
                setAnime(anime.data);
            } else {
                setError(anime.error.message)
            }
            setIsRefreshing(false)
            setIsLoading(false)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsRefreshing(false)
            setIsLoading(false)
        }
    }
    return [anime, isLoading, setQuery, onEndReached, onRefresh, isRefreshing, error]
}
