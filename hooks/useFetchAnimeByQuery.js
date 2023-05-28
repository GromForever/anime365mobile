import {useEffect, useState} from "react";
import {FetchAnimeAsync} from "../api/series";
import {useNavigation} from "@react-navigation/native";

export default function useFetchAnimeByQuery() {
    const [anime, setAnime] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
            setIsLoading(true)
            FetchAnimeAsync(0, 10, query).catch(error => {
                setError(error)
            }).then(data => {
                setAnime(data)
                setIsLoading(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [query])

    async function onEndReached() {
        if (isLoading !== true) {
            const newAnime = await FetchAnimeAsync(anime.length, 10, query)
            setAnime(prevAnime => [...prevAnime, ...newAnime])
        }
    }

    async function onRefresh() {
        try {
            setIsLoading(true)
            setIsRefreshing(true)
            const anime = await FetchAnimeAsync(0,10, "");
            setAnime(anime);
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
