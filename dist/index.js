"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLanguage = void 0;
exports.LiveChatMessage = LiveChatMessage;
exports.getYouTubeVideoID = getYouTubeVideoID;
exports.getLatestStreamingVideoID = getLatestStreamingVideoID;
exports.getYouTubeChannelID = getYouTubeChannelID;
exports.parseYouTubeChannelID = parseYouTubeChannelID;
const core_1 = require("./core");
const promises_1 = require("timers/promises");
var core_2 = require("./core");
Object.defineProperty(exports, "setLanguage", { enumerable: true, get: function () { return core_2.setLanguage; } });
function LiveChatMessage(videoIDorUrl, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        var videoID = getYouTubeVideoID(videoIDorUrl);
        var liveRes = (yield core_1.client.get(`https://www.youtube.com/watch?v=${videoID}`)).data;
        if (liveRes.match(/LIVE_STREAM_OFFLINE/))
            return;
        var key = liveRes.match(/"INNERTUBE_API_KEY":"(\S*?)"/)[1];
        var continuation = liveRes.match(/"continuation":"(\S*?)"/)[1];
        var clientName = liveRes.match(/"clientName":"(\S*?)"/)[1];
        var clientVersion = liveRes.match(/"clientVersion":"(\S*?)"/)[1];
        var time = 0;
        while (true) {
            const data = (yield core_1.client.post(`https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${key}`, {
                context: {
                    client: {
                        clientName,
                        clientVersion,
                        gl: core_1.lang.Region.gl,
                        hl: core_1.lang.Region.hl
                    }
                }, continuation
            })).data;
            for (const element of (0, core_1.ParseActions)(data)) {
                if (element.timestampUsec < time)
                    continue;
                time = element.timestampUsec;
                handler(element);
            }
            yield (0, promises_1.setTimeout)(3000);
        }
    });
}
function getYouTubeVideoID(url) {
    var videoID = url.replace(/(?:(http|https):\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:embed\/|watch\?v=|\?v=|v\/|e\/|[^\[]+\/|watch.*v=)?)/, "");
    if (videoID.includes("&")) {
        var tempArray = videoID.split("&");
        videoID = tempArray[0];
    }
    if ((videoID === null || videoID === void 0 ? void 0 : videoID.length) == 11)
        return videoID;
}
function getLatestStreamingVideoID(channelIDorUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        let videoID = "";
        const channelID = yield getYouTubeChannelID(channelIDorUrl);
        const root = yield (0, core_1.getHtmlRoot)(`${core_1.Origin}/channel/${channelID}/live`);
        const linkElements = root.querySelectorAll("link");
        for (const element of linkElements) {
            // 找到 rel="canonical" 的 <link> 標籤
            if (element.getAttribute("rel") === "canonical") {
                const hrefStr = element.getAttribute("href") || "";
                // 使用正則表達式匹配影片 ID
                const regexVideoID = /(?:v=|\/)([0-9A-Za-z_-]{11})/g;
                const matches = [...hrefStr.matchAll(regexVideoID)];
                if (matches.length > 0 && matches[0][1]) {
                    videoID = matches[0][1]; // 提取影片 ID
                    break;
                }
            }
        }
        return videoID;
    });
}
function getYouTubeChannelID(channelUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        if (channelUrl.includes(`${core_1.Origin}/channel/`))
            return channelUrl.replace(`${core_1.Origin}/channel/`, "");
        if (channelUrl.includes(`${core_1.Origin}/c/`) || channelUrl.includes(`${core_1.Origin}/user/`) || channelUrl.includes("@"))
            return yield parseYouTubeChannelID(channelUrl);
        return channelUrl;
    });
}
function parseYouTubeChannelID(channelUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // 使用 node-html-parser 解析 HTML
        const root = yield (0, core_1.getHtmlRoot)(channelUrl);
        // 查找 meta 標籤，其屬性 property 為 "og:url"
        const metaElement = root.querySelector('meta[property="og:url"]');
        if (metaElement) {
            // 獲取 content 屬性值
            channelUrl = metaElement.getAttribute("content") || "";
        }
        if (channelUrl) {
            // 移除前綴部分
            const origin = "https://www.youtube.com";
            channelUrl = channelUrl.replace(`${origin}/channel/`, "");
        }
        return channelUrl;
    });
}
