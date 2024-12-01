import { LiveChatMessage, setLanguage } from "@natsume0304/livechat"
setLanguage("zh") // en | jp | kr | zh
LiveChatMessage("https://www.youtube.com/watch?v=LzdSAU34L10&ab_channel=%E7%A5%88IruniChannel", x => {
    if(x.channelID) console.log(x)
})