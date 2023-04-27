import {useEffect, useState} from "react";

export const useInfiniteScroll = (LoadMoreFunc) => {
    const [loading, setLoading] = useState(false);
    const [endReached, setEndReached] = useState(false)
    useEffect(() => {
        if (!loading && endReached) {
            setLoading(true)
            setTimeout(() => {
                LoadMoreFunc().then(() => {
                    setLoading(false);
                }).finally(setLoading(false)).catch((error) => {
                    console.log(error)
                })
            }, 500)
            setEndReached(false)
        }
    }, [loading, endReached])
    return [loading, setEndReached]
}
