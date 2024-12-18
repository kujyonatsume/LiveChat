import axios from 'axios';

async function resolveChanneId(input: string) {

    if (input.includes('youtube.com/channel/')) {
        // 頻道 URL，提取 CHANNEL_ID
        const channelIdMatch = input.match(/channel\/([^/?]+)/);
        if (channelIdMatch) return channelIdMatch[1];
    } else if (input.includes('youtube.com/c/') || input.includes('youtube.com/@')) {
        // 頻道名稱 URL
        const response = await axios.get(input);
        const html = response.data;

        // 提取 CHANNEL_ID
        const channelIdMatch = html.match(/"channelId":"(UC.*?)"/);
        if (channelIdMatch) return channelIdMatch[1];
    } else if (input.startsWith('UC')) return input;
}

async function getLiveStreamId(input: string) {
    var channel = await resolveChanneId(input)
    if (!channel) {
        console.log('No channelId found.');
        return
    }
    const response = await axios.get(`https://www.youtube.com/channel/${channel}/live`);
    const html = response.data as string;

    // 檢查是否有正在直播的影片
    const liveVideoMatch = html.match(/"videoId":"(.*?)"/);
    if (!liveVideoMatch) {
        console.log('No LiveStream found.');
        return
    }

    return liveVideoMatch[1];
}

// 從頻道網址或頻道 ID 獲取正在直播的影片 ID
async function getVideoId(input: string) {
    var videoId = input.replace(/(?:(http|https):\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:embed\/|watch\?v=|\?v=|v\/|e\/|[^\[]+\/|watch.*v=)?)/, "");

    if (videoId.includes("&")) {
        var tempArray = videoId.split("&");
        videoId = tempArray[0];
    }

    if (videoId?.length != 11) return await getLiveStreamId(input)

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await axios.get(url);
    const html = response.data;

    // 檢查影片是否為直播
    const liveStatusRegex = /"isLiveContent":true/;
    const isLive = liveStatusRegex.test(html);
    if (isLive) return videoId
}


// 獲取初始聊天室數據
async function fetchInitialChat(input: string) {
    var videoId = await getVideoId(input)
    console.log(videoId);

    if (!videoId) return
    const response = await axios.get(`https://www.youtube.com/watch?v=${videoId}`);
    const html = response.data;

    // 提取 INNERTUBE_API_KEY
    const apiKeyRegex = /"INNERTUBE_API_KEY":"(.*?)"/;
    const apiKeyMatch = apiKeyRegex.exec(html);
    const apiKey = apiKeyMatch?.[1];

    // 提取初始 continuation
    const continuationRegex = /"continuation":"(.*?)"/;
    const continuationMatch = continuationRegex.exec(html);
    const continuation = continuationMatch?.[1];

    if (apiKey && continuation) {
        console.log('INNERTUBE_API_KEY:', apiKey);
        console.log('continuation:', continuation);
        await fetchChatUpdates(apiKey, continuation)
    } else {
        console.log(apiKey, continuation);

        console.error('Failed to fetch required parameters.');
    }
}

// 獲取聊天室更新數據
async function fetchChatUpdates(apikey: string, continuation: string) {
    if (!continuation) return;

    const chatUrl = `https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${apikey}`; // 替換為實際 API 密鑰

    try {
        const response = await axios.post(chatUrl, {
            context: {
                client: {
                    clientName: "WEB",
                    clientVersion: "2.20230228.00.00", // YouTube 網頁版版本
                    gl: "TW",
                    hl: "zh-TW"
                },
            },
            continuation,
        });

        const chatData = response.data?.continuationContents?.liveChatContinuation
        const subMenuItem = (chatData?.header?.liveChatHeaderRenderer?.viewSelector?.sortFilterSubMenuRenderer?.subMenuItems as any[] || []).find(x => x?.title == "聊天室")
        const nextcontinuation = subMenuItem?.continuation?.reloadContinuationData?.continuation
        for (const action of (chatData.actions || [])) {
            if (action.addChatItemAction) {
                const item = action.addChatItemAction.item.liveChatTextMessageRenderer;
                if (item) {
                    const username = item.authorName?.simpleText || 'Unknown';
                    const message = item.message?.runs?.map(r => r.text).join('') || '';
                    console.log(`[${username}]: ${message}`);
                }
            }
        }

        // 設置定時器，繼續查詢
        setTimeout(() => fetchChatUpdates(apikey, nextcontinuation), 2000);
    } catch (error) {
        console.error('Error fetching chat updates:', error.message);
    }
}

fetchInitialChat("https://www.youtube.com/watch?v=zzh2I8t1hLw");