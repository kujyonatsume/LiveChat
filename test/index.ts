import { writeFileSync } from "fs"
import { client } from "../src/core"
import { Message } from "../src/models"

//LiveChatMessage("LzdSAU34L10")
LiveChatMessage("Owke6Quk7T0")


function GetHeader(ytConfigData: ConfigData) {
    var headers = {}
    let xGoogAuthuser = "0";

    if (ytConfigData.DATASYNC_ID?.length)
        headers["X-Goog-Pageid"] = ytConfigData.DATASYNC_ID;

    if (!headers["X-Goog-Pageid"] && ytConfigData.DELEGATED_SESSION_ID?.length)
        headers["X-Goog-Pageid"] = ytConfigData.DELEGATED_SESSION_ID;

    if (ytConfigData.ID_TOKEN?.length)
        headers["X-Youtube-Identity-Token"] = ytConfigData.ID_TOKEN;

    if (ytConfigData.SESSION_INDEX?.length)
        xGoogAuthuser = ytConfigData.SESSION_INDEX;

    if (ytConfigData.InitPage?.length)
        headers["Referrer"] = ytConfigData.InitPage;

    headers["X-Goog-Authuser"] = xGoogAuthuser
    headers["X-Goog-Visitor-Id"] = ytConfigData.INNERTUBE_CONTEXT.client.visitorData
    headers["X-Youtube-Client-Name"] = ytConfigData.INNERTUBE_CONTEXT_CLIENT_NAME
    headers["X-Youtube-Client-Version"] = ytConfigData.INNERTUBE_CLIENT_VERSION

    return headers
}

async function LiveChatMessage(videoID: string, handler?: (message: Message) => any) {

    //  var videoID = getYouTubeVideoID(videoIDorUrl)
    var live = await client.get(`https://www.youtube.com/live_chat?v=${videoID}`)
    var initstr = live.data.match(/\{"responseContext".*\};</)?.[0].slice(0, -2) as string
    if (initstr.includes("messageRenderer")) return console.log("not live streaming")

    var { data } = await client.get(`https://www.youtube.com/watch?v=${videoID}`)
    initstr = data.match(/\{"responseContext".*\};</)?.[0].slice(0, -2)
    var init = JSON.parse(initstr)

    var cfgstr = data.match(/\{"CLIENT_CANARY_STATE".*\}\)/)?.[0].slice(0, -1)
    var ytcfg = JSON.parse(cfgstr)
    const ytclient = ytcfg.INNERTUBE_CONTEXT.client
    var config = {
        INNERTUBE_API_KEY: ytcfg.INNERTUBE_API_KEY as string,
        ID_TOKEN: ytcfg.ID_TOKEN as string,
        SESSION_INDEX: ytcfg.SESSION_INDEX as string,
        INNERTUBE_CONTEXT_CLIENT_NAME: ytcfg.INNERTUBE_CONTEXT_CLIENT_NAME as string,
        INNERTUBE_CONTEXT_CLIENT_VERSION: ytcfg.INNERTUBE_CONTEXT_CLIENT_VERSION as string,
        INNERTUBE_CLIENT_VERSION: ytcfg.INNERTUBE_CLIENT_VERSION as string,
        DATASYNC_ID: ytcfg.DATASYNC_ID as string,
        DELEGATED_SESSION_ID: ytcfg.DELEGATED_SESSION_ID as string,
        INNERTUBE_CONTEXT: {
            client: {
                browserName: ytclient.browserName,
                browserVersion: ytclient.browserVersion,
                clientFormFactor: ytclient.clientFormFactor,
                clientName: ytclient.clientName,
                clientVersion: ytclient.clientVersion,
                deviceMake: ytclient.deviceMake,
                deviceModel: ytclient.deviceModel,
                gl: ytclient.gl,
                hl: ytclient.hl,
                originalUrl: ytclient.originalUrl,
                osName: ytclient.osName,
                osVersion: ytclient.osVersion,
                platform: ytclient.platform,
                remoteHost: ytclient.remoteHost,
                userAgent: ytclient.userAgent,
                visitorData: ytclient.visitorData
            }
        }
    } as ConfigData

    client.post("","",{
        headers:GetHeader()
    })

    writeFileSync("data.json", JSON.stringify({ config, init }, null, 4), "utf8")

    // message contextMenuAccessibility 聊天室活動

    /*
    var key = data.match(/"INNERTUBE_API_KEY":"(\S*?)"/)![1] as string
    var continuation = data.match(/"continuation":"(\S*?)"/)![1] as string
    var clientName = data.match(/"clientName":"(\S*?)"/)![1] as string
    var clientVersion = data.match(/"clientVersion":"(\S*?)"/)![1] as string

    var time = 0
    while (true) {
        
        const data = (await client.post(`https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${key}`,
            {
                context: {
                    client: {
                        clientName,
                        clientVersion,
                        gl: lang.Region.gl,
                        hl: lang.Region.hl
                    }
                }, continuation
            })).data

        for (const element of ParseActions(data)) {
            if (element.timestampUsec < time) continue
            time = element.timestampUsec
            handler?.call(element)
        }

        await setTimeout(3000)
    }
    */
}

interface ConfigData {
    InitPage?: string
    INNERTUBE_API_KEY: string
    ID_TOKEN: string
    SESSION_INDEX: string
    INNERTUBE_CONTEXT_CLIENT_NAME: string
    INNERTUBE_CONTEXT_CLIENT_VERSION: string
    INNERTUBE_CLIENT_VERSION: string
    DATASYNC_ID: string
    DELEGATED_SESSION_ID: string
    INNERTUBE_CONTEXT: {
        client: {
            browserName: string
            browserVersion: string
            clientFormFactor: string
            clientName: string
            clientVersion: string
            deviceMake: string
            deviceModel: string
            gl: string
            hl: string
            originalUrl: string
            osName: string
            osVersion: string
            platform: string
            remoteHost: string
            userAgent: string
            visitorData: string
        }
    }
}