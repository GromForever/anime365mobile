import {FetchOneAnimeAsync} from "../api/series";
import {useEffect, useState} from "react";
import {SeriesResponse} from "../types/api/series";

export default function useFetchOneAnime(id) {
    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function FetchOneAnime() {
            const response = await FetchOneAnimeAsync(id);
            if ("data" in response) {
                const seriesResponse = response as SeriesResponse;
                setAnime(response.data);
            }
            setIsLoading(false)
        }
        FetchOneAnime();
    }, [])

    return [anime, isLoading]
}
