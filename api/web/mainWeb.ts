import IDOMParser from 'advanced-html-parser'
import {Discussion} from "../../types/web";

let document = null;
const getDocument = async (url: string, updateRequested: boolean = false) => {
    if (!document || updateRequested) {
        const html = await fetch("https://smotret-anime.com");
        const htmlText = await html.text();
        document = IDOMParser.parse(htmlText, {
            ignoreTags: ['script', 'style', 'head'],
            onlyBody: true,
        })
        return document
    }
    return document;
}

export const getDiscussions = async () => {
    const doc = await getDocument("https://smotret-anime.com")
    const discussionsItems = doc.documentElement.querySelectorAll("#m-index-recent-comments > div:nth-child(1)")[0].childNodes
    const discussions : Discussion[] = []
    const regexPosterUrl = /url\((['"]?)(.*?)\1\)/;
    const regexSeriesId = /(\d+)(?!.*\d)/;
    let posterUrl;
    let url;
    let idMatch;
    let seriesId;
    let titleRu;
    let titleRomaji;
    let whoAndWhen;
    for (let i = 0; i < discussionsItems.length; i++) {
        if (discussionsItems[i].nodeType === 3)
            continue;
        posterUrl = "https://smotret-anime.com" + discussionsItems[i].firstChild.childNodes[0].attributes.getNamedItem("style").value.match(regexPosterUrl)[2]
        url = "https://smotret-anime.com" + discussionsItems[i].firstChild.children[1].firstChild.attributes.getNamedItem("href").value
        idMatch = url.match(regexSeriesId)
        seriesId = idMatch ? parseInt(idMatch[1]) : 0
        titleRu = discussionsItems[i].firstChild.children[1].firstChild.innerText() ?? "";
        titleRomaji = discussionsItems[i].firstChild.children[2].firstChild.innerText() ?? "";
        whoAndWhen = discussionsItems[i].firstChild.children[3].innerText() ?? "";
        discussions.push({
            posterUrl: posterUrl,
            url: url,
            seriesId: seriesId,
            titleRu: titleRu,
            titleRomaji: titleRomaji,
            whoAndWhen: whoAndWhen
        })
    }
    return discussions;
}