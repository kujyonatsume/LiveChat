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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.Origin = exports.YouTube = exports.Localize = void 0;
exports.setLanguage = setLanguage;
exports.getHtmlRoot = getHtmlRoot;
exports.ParseActions = ParseActions;
exports.ParseContinuation = ParseContinuation;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const models_1 = require("./models");
var models_2 = require("./models");
Object.defineProperty(exports, "Localize", { enumerable: true, get: function () { return models_2.Localize; } });
exports.YouTube = "YouTube";
exports.Origin = "https://www.youtube.com";
var lang;
exports.client = setLanguage("zh");
function setLanguage(key) {
    lang = models_1.Localize[key];
    return exports.client = axios_1.default.create({
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Sec-CH-Prefers-Reduced-Motion": "",
            "Sec-CH-UA": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "Sec-CH-UA-Arch": "",
            "Sec-CH-UA-Bitness": "",
            "Sec-CH-UA-Full-Version-List": "",
            "Sec-CH-UA-Mobile": "?0",
            "Sec-CH-UA-Model": "",
            "Sec-CH-UA-Platform": "Windows",
            "Sec-CH-UA-Platform-Version": "",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "same-origin",
            "Sec-Fetch-Dest": "empty",
            "Origin": exports.Origin,
            "X-Origin": exports.Origin,
            'Accept-Language': lang.Region.AcceptLanguage
        }
    });
}
function getHtmlRoot(url) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield exports.client.get(url);
        if (res.status != 200) {
            console.error(`連線發生錯誤(${res.status})`);
            return;
        }
        return (0, node_html_parser_1.default)(res.data);
    });
}
function ParseActions(jsonElement) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const output = [];
    if (jsonElement) {
        let actions = (_b = (_a = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.continuationContents) === null || _a === void 0 ? void 0 : _a.liveChatContinuation) === null || _b === void 0 ? void 0 : _b.actions;
        if (!actions) {
            actions = (_d = (_c = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.contents) === null || _c === void 0 ? void 0 : _c.liveChatRenderer) === null || _d === void 0 ? void 0 : _d.actions;
        }
        if (Array.isArray(actions)) {
            for (const singleAction of actions) {
                // Handle `addChatItemAction`.
                const item = (_e = singleAction === null || singleAction === void 0 ? void 0 : singleAction.addChatItemAction) === null || _e === void 0 ? void 0 : _e.item;
                if (item)
                    output.push(...parseRenderer(item));
                // Handle `addBannerToLiveChatCommand`.
                const singleBannerRenderer = (_f = singleAction === null || singleAction === void 0 ? void 0 : singleAction.addBannerToLiveChatCommand) === null || _f === void 0 ? void 0 : _f.bannerRenderer;
                if (singleBannerRenderer)
                    output.push(...parseRenderer(singleBannerRenderer));
                // Handle `videoOffsetTimeMsec`.
                const videoOffsetTimeMsec = (_g = singleAction === null || singleAction === void 0 ? void 0 : singleAction.addChatItemAction) === null || _g === void 0 ? void 0 : _g.videoOffsetTimeMsec;
                const videoOffsetTimeText = getVideoOffsetTimeMsec(videoOffsetTimeMsec);
                // Handle `replayChatItemAction`.
                const replayActions = (_h = singleAction === null || singleAction === void 0 ? void 0 : singleAction.replayChatItemAction) === null || _h === void 0 ? void 0 : _h.actions;
                if (Array.isArray(replayActions)) {
                    for (const replayAction of replayActions) {
                        const replayItem = (_j = replayAction === null || replayAction === void 0 ? void 0 : replayAction.addChatItemAction) === null || _j === void 0 ? void 0 : _j.item;
                        if (replayItem) {
                            const rendererDatas = parseRenderer(replayItem);
                            rendererDatas.forEach((rendererData) => {
                                if (!rendererData.timestampText && !rendererData.timestampUsec) {
                                    rendererData.timestampText = videoOffsetTimeText;
                                }
                            });
                            output.push(...rendererDatas);
                        }
                        const replayBannerRenderer = (_k = replayAction === null || replayAction === void 0 ? void 0 : replayAction.addBannerToLiveChatCommand) === null || _k === void 0 ? void 0 : _k.bannerRenderer;
                        if (replayBannerRenderer) {
                            const rendererDatas = parseRenderer(replayBannerRenderer);
                            rendererDatas.forEach((rendererData) => {
                                if (!rendererData.timestampText && !rendererData.timestampUsec) {
                                    rendererData.timestampText = videoOffsetTimeText;
                                }
                            });
                            output.push(...rendererDatas);
                        }
                    }
                }
            }
        }
    }
    return output.filter(x => x.type);
}
function ParseContinuation(jsonElement) {
    var _a, _b, _c, _d, _e;
    var continuations = (_b = (_a = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.continuationContents) === null || _a === void 0 ? void 0 : _a.liveChatContinuation) === null || _b === void 0 ? void 0 : _b.continuations;
    if (continuations)
        for (var singleContinuation of continuations) {
            let timeoutMs = ((_c = singleContinuation === null || singleContinuation === void 0 ? void 0 : singleContinuation.invalidationContinuationData) === null || _c === void 0 ? void 0 : _c.timeoutMs) ||
                ((_d = singleContinuation === null || singleContinuation === void 0 ? void 0 : singleContinuation.timedContinuationData) === null || _d === void 0 ? void 0 : _d.timeoutMs) ||
                ((_e = singleContinuation === null || singleContinuation === void 0 ? void 0 : singleContinuation.liveChatReplayContinuationData) === null || _e === void 0 ? void 0 : _e.timeUntilLastMessageMsec);
            if (timeoutMs)
                return `${timeoutMs}`;
        }
}
function getVideoOffsetTimeMsec(jsonElement) {
    const videoOffsetTimeMsec = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.videoOffsetTimeMsec;
    if (!videoOffsetTimeMsec)
        return;
    const milliseconds = Number(videoOffsetTimeMsec);
    // 將 Unix 毫秒時間轉換為 "HH:mm:ss" 格式
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
function parseRenderer(jsonElement) {
    const output = [];
    if ((setRendererData(output, jsonElement, "liveChatTextMessageRenderer") ||
        setRendererData(output, jsonElement, "liveChatPaidMessageRenderer") ||
        setRendererData(output, jsonElement, "liveChatPaidStickerRenderer") ||
        setRendererData(output, jsonElement, "liveChatMembershipItemRenderer") ||
        setRendererData(output, jsonElement, "liveChatViewerEngagementMessageRenderer") ||
        setRendererData(output, jsonElement, "liveChatModeChangeMessageRenderer") ||
        setRendererData(output, jsonElement, "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer") ||
        setRendererData(output, jsonElement, "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer")))
        return output;
    const liveChatBannerRenderer = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.liveChatBannerRenderer;
    if (setRendererData(output, liveChatBannerRenderer === null || liveChatBannerRenderer === void 0 ? void 0 : liveChatBannerRenderer.header, "liveChatBannerHeaderRenderer"))
        return output;
    const contents = liveChatBannerRenderer === null || liveChatBannerRenderer === void 0 ? void 0 : liveChatBannerRenderer.contents;
    setRendererData(output, contents, "liveChatTextMessageRenderer") || setRendererData(output, contents, "liveChatBannerRedirectRenderer");
    return output;
}
function getRendererDataType(rendererName) {
    return ({
        "liveChatTextMessageRenderer": lang.ChatGeneral,
        "liveChatPaidMessageRenderer": lang.ChatSuperChat,
        "liveChatPaidStickerRenderer": lang.ChatSuperSticker,
        "liveChatMembershipItemRenderer": lang.ChatJoinMember,
        "liveChatViewerEngagementMessageRenderer": exports.YouTube,
        "liveChatModeChangeMessageRenderer": exports.YouTube,
        "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer": lang.ChatMemberGift,
        "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer": lang.ChatReceivedMemberGift,
        "liveChatBannerHeaderRenderer": lang.ChatPinned,
        "liveChatBannerRedirectRenderer": lang.ChatRedirect,
    }[rendererName]);
}
function getAuthorName(jsonElement) {
    var _a;
    return (_a = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorName) === null || _a === void 0 ? void 0 : _a.simpleText;
}
function getAuthorPhoto(jsonElement) {
    return getThumbnailUrl(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorPhoto);
}
function setRendererData(dataSet, jsonElement, rendererName) {
    var _a, _b, _c, _d, _e, _f;
    if (!(jsonElement = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement[rendererName]))
        return false;
    let data = new models_1.RendererData();
    const messageData = parseMessageData(jsonElement);
    data.type = getRendererDataType(rendererName);
    data.channelID = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorExternalChannelId;
    data.name = getAuthorName(jsonElement);
    data.avatarUrl = getAuthorPhoto(jsonElement);
    data.authorBadges = (_a = parseAuthorBadges(jsonElement)) === null || _a === void 0 ? void 0 : _a.text;
    data.content = messageData === null || messageData === void 0 ? void 0 : messageData.text;
    data.purchaseAmountText = (_b = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.purchaseAmountText) === null || _b === void 0 ? void 0 : _b.simpleText;
    data.foregroundColor = messageData === null || messageData === void 0 ? void 0 : messageData.textColor;
    data.backgroundColor = getColorHexCode((_c = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.backgroundColor) !== null && _c !== void 0 ? _c : jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.bodyBackgroundColor);
    data.timestampUsec = Number(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.timestampUsec);
    if (data.timestampUsec)
        data.timestampText = new Date(data.timestampUsec / 1000).toLocaleString(lang.Region.value);
    // Handle special cases
    if (data.type === "YouTube")
        data.name = "[YouTube]";
    if (rendererName === "liveChatMembershipItemRenderer") {
        // Update type based on message content
        if (data.content.includes(lang.MemberUpgrade)) {
            data.type = lang.ChatMemberUpgrade;
        }
        else if (data.content.includes(lang.MemberMilestone)) {
            data.type = lang.ChatMemberMilestone;
        }
    }
    else if (rendererName === "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer") {
        const headerRenderer = (_d = jsonElement.header) === null || _d === void 0 ? void 0 : _d.liveChatSponsorshipsHeaderRenderer;
        if (headerRenderer) {
            data.name = getAuthorName(headerRenderer);
            data.avatarUrl = getAuthorPhoto(headerRenderer);
            data.authorBadges = (_e = parseAuthorBadges(headerRenderer)) === null || _e === void 0 ? void 0 : _e.text;
            data.content = (_f = parseMessageData(headerRenderer)) === null || _f === void 0 ? void 0 : _f.text;
        }
    }
    dataSet.push(data);
    return true;
}
function parseAuthorBadges(jsonElement) {
    var _a, _b, _c, _d, _e, _f, _g;
    const authorBadges = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorBadges;
    if (!Array.isArray(authorBadges))
        return;
    const output = new models_1.AuthorBadgesData();
    const tempBadges = [];
    for (const singleAuthorBadge of authorBadges) {
        const badgeData = new models_1.BadgeData();
        badgeData.url = getThumbnailUrl((_a = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _a === void 0 ? void 0 : _a.customThumbnail);
        badgeData.iconType = (_c = (_b = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _b === void 0 ? void 0 : _b.icon) === null || _c === void 0 ? void 0 : _c.iconType;
        badgeData.tooltip = (_d = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _d === void 0 ? void 0 : _d.tooltip;
        badgeData.label = (_g = (_f = (_e = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _e === void 0 ? void 0 : _e.accessibility) === null || _f === void 0 ? void 0 : _f.accessibilityData) === null || _g === void 0 ? void 0 : _g.label;
        tempBadges.push(badgeData);
    }
    output.text = getBadgeName(tempBadges);
    output.badges = tempBadges;
    return output;
}
function getBadgeName(list) {
    var array = list.map(n => n.label);
    if (Array.isArray(array))
        return array.join("、");
}
function parseMessageData(jsonElement) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const output = new models_1.MessageData();
    let tempText = '';
    let tempTextColor = '';
    let tempFontFace = '';
    let isBold = false;
    const tempStickers = [];
    const tempEmojis = [];
    function addRunData(runsData) {
        if (!runsData)
            return;
        tempText += runsData.text || '';
        isBold = runsData.bold || false;
        tempTextColor = runsData.textColor || '';
        tempFontFace = runsData.fontFace || '';
        if (runsData.emojis)
            tempEmojis.push(...runsData.emojis);
    }
    ;
    const headerPrimaryText = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.headerPrimaryText;
    if (headerPrimaryText) {
        const runsData = parseRunData(headerPrimaryText);
        tempText += ` [${runsData.text}] `;
        addRunData(runsData);
    }
    const headerSubtext = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.headerSubtext;
    if (headerSubtext) {
        const simpleText = headerSubtext === null || headerSubtext === void 0 ? void 0 : headerSubtext.simpleText;
        if (simpleText)
            tempText += ` [${simpleText}] `;
        const runsData = parseRunData(headerSubtext);
        tempText += ` ${runsData.text} `;
        addRunData(runsData);
    }
    addRunData(parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.primaryText));
    addRunData(parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.text));
    addRunData(parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.subtext));
    const sticker = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.sticker;
    if (sticker) {
        const stickerData = new models_1.StickerData();
        const label = (_b = (_a = sticker === null || sticker === void 0 ? void 0 : sticker.accessibility) === null || _a === void 0 ? void 0 : _a.accessibilityData) === null || _b === void 0 ? void 0 : _b.label;
        if (label)
            tempText += `:${label}:`;
        const content = (_g = (_f = (_e = (_d = (_c = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.lowerBumper) === null || _c === void 0 ? void 0 : _c.liveChatItemBumperViewModel) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.bumperUserEduContentViewModel) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.content;
        if (content)
            tempText += ` [${content}] `;
        stickerData.id = label || '';
        stickerData.url = getThumbnailUrl(sticker);
        stickerData.text = label ? `:${label}:` : '';
        stickerData.label = label || '';
        tempStickers.push(stickerData);
    }
    const purchaseAmountText = (_h = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.purchaseAmountText) === null || _h === void 0 ? void 0 : _h.simpleText;
    if (purchaseAmountText)
        tempText += ` [${purchaseAmountText}] `;
    addRunData(parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.message));
    addRunData(parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.bannerMessage));
    if (!tempText)
        tempText = 'No message content';
    output.text = tempText;
    output.bold = isBold;
    output.textColor = tempTextColor;
    output.fontFace = tempFontFace;
    output.stickers = tempStickers;
    output.emojis = tempEmojis;
    return output;
}
function parseRunData(jsonElement) {
    var _a, _b, _c;
    const runs = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.runs;
    if (!Array.isArray(runs))
        return;
    const output = new models_1.RunsData();
    let tempText = '';
    let tempTextColor = '';
    let tempFontFace = '';
    let isBold = false;
    const tempEmojis = [];
    for (const singleRun of runs) {
        const text = singleRun === null || singleRun === void 0 ? void 0 : singleRun.text;
        if (text)
            tempText += text;
        const bold = singleRun === null || singleRun === void 0 ? void 0 : singleRun.bold;
        if (bold)
            isBold = bold;
        const textColor = singleRun === null || singleRun === void 0 ? void 0 : singleRun.textColor;
        if (textColor)
            tempTextColor += getColorHexCode(textColor);
        const fontFace = singleRun === null || singleRun === void 0 ? void 0 : singleRun.fontFace;
        if (fontFace)
            tempFontFace += fontFace;
        const emoji = singleRun === null || singleRun === void 0 ? void 0 : singleRun.emoji;
        if (emoji) {
            const emojiData = new models_1.EmojiData();
            const emojiId = emoji === null || emoji === void 0 ? void 0 : emoji.emojiId;
            if (emojiId)
                emojiData.id = emojiId;
            emojiData.url = getThumbnailUrl(emoji === null || emoji === void 0 ? void 0 : emoji.image);
            const label = (_c = (_b = (_a = emoji === null || emoji === void 0 ? void 0 : emoji.image) === null || _a === void 0 ? void 0 : _a.accessibility) === null || _b === void 0 ? void 0 : _b.accessibilityData) === null || _c === void 0 ? void 0 : _c.label;
            if (label)
                tempText += `:${label}:`;
            const shortcuts = emoji === null || emoji === void 0 ? void 0 : emoji.shortcuts;
            if (shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.length)
                emojiData.text = shortcuts[0];
            emojiData.label = label || '';
            emojiData.isCustomEmoji = (emoji === null || emoji === void 0 ? void 0 : emoji.isCustomEmoji) || false;
            tempEmojis.push(emojiData);
        }
    }
    output.text = tempText;
    output.bold = isBold;
    output.textColor = tempTextColor;
    output.fontFace = tempFontFace;
    output.emojis = tempEmojis;
    return output;
}
function getThumbnailUrl(jsonElement) {
    var _a;
    const thumbnails = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.thumbnails;
    if (Array.isArray(thumbnails) && thumbnails.length > 0) {
        const url = (_a = thumbnails[thumbnails.length == 1 ? 0 : 1]) === null || _a === void 0 ? void 0 : _a.url.split('=')[0];
        if (url === null || url === void 0 ? void 0 : url.startsWith('//'))
            return `https:${url}`;
    }
}
function getColorHexCode(color) {
    if (color)
        return `#${color.toString(16).padStart(6, '0')}`;
}
