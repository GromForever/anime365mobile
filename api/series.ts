import {ErrorResponse, SeriesResponse} from "../types/api/series";


export const FetchAnimeAsync = async (start, limit, query = "") => {
    const response = await fetch(`https://smotret-anime.online/api/series/?query=${query}&limit=${limit}&offset=${start}&fields=id,myAnimeListScore,titles,posterUrl,genres,year`);

    if (!response.ok)
        throw new Error("ServerError")
    let json : SeriesResponse | ErrorResponse = await response.json();
    return json;
}

export const FetchOneAnimeAsync = async (id : number) => {
    let response = await fetch("https://smotret-anime.online/api/series/" + id);
    let json : SeriesResponse | ErrorResponse =  await response.json();
    return json;
}
