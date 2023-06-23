import {getDiscussions} from "../api/web/mainWeb";

test("getDiscussions should return Discussion array", async () => {
    const discussions = await getDiscussions();
    console.log(discussions)
})