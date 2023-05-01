export const FetchAnimeAsync = async (start, limit, query = "") => {
    let response = await fetch(`https://smotret-anime.online/api/series/?query=${query}&limit=${limit}&offset=${start}&fields=id,myAnimeListScore,titles,posterUrl,genres,year`);
    if (!response.ok)
        throw new Error("ServerError")
    let json =  await response.json();
    return json.data;
}

export const FetchOneAnimeAsync = async (id) => {
    let response = await fetch("https://smotret-anime.online/api/series/" + id);
    let json =  await response.json();
    return json.data;
}
