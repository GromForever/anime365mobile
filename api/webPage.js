const HEADERS = {

}

export const getResponseFromAnimeSite = async () => {
    const result = await fetch("https://smotret-anime.com/animelist/edit/14245?mode=mini", {
        method: "POST",
        credentials: "omit"
    });
}
