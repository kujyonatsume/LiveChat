import { LiveChatMessage, setLanguage } from "../src"
setLanguage("zh") // en | jp | kr | zh
LiveChatMessage("https://www.youtube.com/watch?v=Blxwkop8l_U&ab_channel=%E7%A5%88IruniChannel", x => {
    if(x.channelID) console.log(x)
})