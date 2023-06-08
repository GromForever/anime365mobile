import {useEffect, useState} from "react";
import {fetchTranslationsForEpisode} from "../api/episodes";

export const useFetchTranslations = () => {
    const [translations, setTranslations] = useState(null);
    const [error, setError] = useState(null)
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        fetch(selectedEpisode);
    }, [selectedEpisode])

    function fetch (episodeId) {
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
    return {translations, error, isLoading, fetch, selectedEpisode, setSelectedEpisode}
}