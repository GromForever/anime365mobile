import {FetchOneAnimeAsync} from "../api/series";
import {useEffect, useState} from "react";

export default function useFetchOneAnime(id) {
    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function FetchOneAnime() {
            const response = await FetchOneAnimeAsync(id);
            setAnime(response);
            setIsLoading(false)
        }
        FetchOneAnime();
    }, [])

    return [anime, isLoading]
}
