import { LiveChatMessage, setLanguage } from "../src"
setLanguage("zh") // en | jp | kr | zh
LiveChatMessage("https://www.youtube.com/@IruniIanvs", x => {
    if(x.channelID) console.log(x)
})