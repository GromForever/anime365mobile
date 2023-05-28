import {useEffect, useState} from "react";
import {fetchTranslationsForEpisode} from "../api/episodes";

export const useFetchTranslations = (episodeId) => {
    const [translations, setTranslations] = useState(null);
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        RefreshTranslations();
    }, [episodeId])

    function RefreshTranslations () {
        setError(null);
        setLoading(true)
        fetchTranslationsForEpisode(episodeId)
            .then(data => {
                if (data === null) {
                    setError("При загрузке произошла ошибка или переводы к этой серии не были найдены")
                    return
                }
                setTranslations(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }
    return {translations, error, isLoading, RefreshTranslations}
}