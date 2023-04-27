export const FetchAnimeAsync = async (page, limit) => {
    let response = await fetch("https://smotret-anime.online/api/series/?limit=" + limit + "&offset=" + limit * page);
    console.log("https://smotret-anime.online/api/series/?limit=" + limit + "&offset=" + limit * page)
    let json =  await response.json();
    return json.data;
}

export const FetchOneAnimeAsync = async (id) => {
    let response = await fetch("https://smotret-anime.online/api/series/" + id);
    let json =  await response.json();
    return json.data;
}
