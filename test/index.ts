import { writeFileSync } from "fs";
import YoutubeChat from "../src";
new YoutubeChat('zh').LiveChatMessage("https://www.youtube.com/@IruniIanvs", (id, msg) => {
    msg.type =""
})


