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
const langs = {
    en: { gl: "US", hl: "en" },
    zh: { gl: "TW", hl: "zh-TW" },
    jp: { gl: "JP", hl: "ja" },
    kr: { gl: "KR", hl: "ko" }
};
const Localize = {
    en: {
        ChatGeneral: "General",
        ChatSuperChat: "Super Chat",
        ChatSuperSticker: "Super Sticker",
        ChatJoinMember: "Join Member",
        ChatMemberUpgrade: "Member Upgrade",
        ChatMemberMilestone: "Member Milestone",
        ChatMemberGift: "Member Gift",
        ChatReceivedMemberGift: "Received Member Gift",
        ChatRedirect: "Redirect",
        ChatPinned: "Pinned",
        MemberUpgrade: "Upgraded membership to",
        MemberMilestone: "Member for",
    },
    zh: {
        ChatGeneral: "一般",
        ChatSuperChat: "超級留言",
        ChatSuperSticker: "超級貼圖",
        ChatJoinMember: "加入會員",
        ChatMemberUpgrade: "會員升級",
        ChatMemberMilestone: "會員里程碑",
        ChatMemberGift: "贈送會員",
        ChatReceivedMemberGift: "接收會員贈送",
        ChatRedirect: "重新導向",
        ChatPinned: "置頂留言",
        MemberUpgrade: "頻道會員等級已升級至",
        MemberMilestone: "已加入會員",
    },
    jp: {
        ChatGeneral: "一般",
        ChatSuperChat: "スーパーチャット",
        ChatSuperSticker: "スーパーステッカー",
        ChatJoinMember: "メンバー登録",
        ChatMemberUpgrade: "会員アップグレード",
        ChatMemberMilestone: "会員マイルストーン",
        ChatMemberGift: "会員ギフト",
        ChatReceivedMemberGift: "会員プレゼントを受け取る",
        ChatRedirect: "リダイレクト",
        ChatPinned: "ピン留め",
        MemberUpgrade: "にアップグレードされました",
        MemberMilestone: "メンバー歴",
    },
    kr: {
        ChatGeneral: "일반",
        ChatSuperChat: "슈퍼 채팅",
        ChatSuperSticker: "슈퍼 스티커",
        ChatJoinMember: "회원 가입",
        ChatMemberUpgrade: "회원 업그레이드",
        ChatMemberMilestone: "회원 마일스톤",
        ChatMemberGift: "회원 선물",
        ChatReceivedMemberGift: "회원 선물 받기",
        ChatRedirect: "리디렉션",
        ChatPinned: "고정",
        MemberUpgrade: "멤버십을",
        MemberMilestone: "회원 가입 기간",
    }
};
//#region YTDataType
class Message {
}
class AuthorBadgesData {
}
class BadgeData {
}
class EmojiData {
    constructor() {
        /** 是否為自定義表情符號 */
        this.isCustomEmoji = false;
    }
}
class MessageData {
}
class StickerData {
}
class RunsData {
}
//#endregion
class YoutubeChat {
    //#region YTDataParser
    ParseActions(jsonElement) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!jsonElement)
            return;
        const output = [];
        let actions = (_b = (_a = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.continuationContents) === null || _a === void 0 ? void 0 : _a.liveChatContinuation) === null || _b === void 0 ? void 0 : _b.actions;
        if (!actions) {
            actions = (_d = (_c = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.contents) === null || _c === void 0 ? void 0 : _c.liveChatRenderer) === null || _d === void 0 ? void 0 : _d.actions;
        }
        if (Array.isArray(actions)) {
            for (const singleAction of actions) {
                // Handle `addChatItemAction`.
                const item = (_e = singleAction === null || singleAction === void 0 ? void 0 : singleAction.addChatItemAction) === null || _e === void 0 ? void 0 : _e.item;
                if (item)
                    output.push(...this.parseRenderer(item));
                // Handle `addBannerToLiveChatCommand`.
                const singleBannerRenderer = (_f = singleAction === null || singleAction === void 0 ? void 0 : singleAction.addBannerToLiveChatCommand) === null || _f === void 0 ? void 0 : _f.bannerRenderer;
                if (singleBannerRenderer)
                    output.push(...this.parseRenderer(singleBannerRenderer));
                // Handle `videoOffsetTimeMsec`.
                const videoOffsetTimeMsec = (_g = singleAction === null || singleAction === void 0 ? void 0 : singleAction.addChatItemAction) === null || _g === void 0 ? void 0 : _g.videoOffsetTimeMsec;
                const videoOffsetTimeText = this.getVideoOffsetTimeMsec(videoOffsetTimeMsec);
                // Handle `replayChatItemAction`.
                const replayActions = (_h = singleAction === null || singleAction === void 0 ? void 0 : singleAction.replayChatItemAction) === null || _h === void 0 ? void 0 : _h.actions;
                if (Array.isArray(replayActions)) {
                    for (const replayAction of replayActions) {
                        const replayItem = (_j = replayAction === null || replayAction === void 0 ? void 0 : replayAction.addChatItemAction) === null || _j === void 0 ? void 0 : _j.item;
                        if (replayItem) {
                            const rendererDatas = this.parseRenderer(replayItem);
                            rendererDatas.forEach((rendererData) => {
                                if (!rendererData.timestampText && !rendererData.timestampUsec) {
                                    rendererData.timestampText = videoOffsetTimeText;
                                }
                            });
                            output.push(...rendererDatas);
                        }
                        const replayBannerRenderer = (_k = replayAction === null || replayAction === void 0 ? void 0 : replayAction.addBannerToLiveChatCommand) === null || _k === void 0 ? void 0 : _k.bannerRenderer;
                        if (replayBannerRenderer) {
                            const rendererDatas = this.parseRenderer(replayBannerRenderer);
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
        return output.filter(x => x.type);
    }
    ParseContinuation(jsonElement) {
        var _a, _b;
        const output = [null, null];
        const continuations = (_b = (_a = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.continuationContents) === null || _a === void 0 ? void 0 : _a.liveChatContinuation) === null || _b === void 0 ? void 0 : _b.continuations;
        if (Array.isArray(continuations)) {
            for (const singleContinuation of continuations) {
                const invalidationContinuationData = singleContinuation.invalidationContinuationData;
                if (invalidationContinuationData) {
                    const continuation = invalidationContinuationData.continuation;
                    if (continuation) {
                        output[0] = continuation;
                    }
                    const timeoutMs = invalidationContinuationData.timeoutMs;
                    if (timeoutMs) {
                        output[1] = timeoutMs;
                    }
                    break;
                }
                const timedContinuationData = singleContinuation.timedContinuationData;
                if (timedContinuationData) {
                    const continuation = timedContinuationData.continuation;
                    if (continuation) {
                        output[0] = continuation;
                    }
                    const timeoutMs = timedContinuationData.timeoutMs;
                    if (timeoutMs) {
                        output[1] = timeoutMs;
                    }
                    break;
                }
                const liveChatReplayContinuationData = singleContinuation.liveChatReplayContinuationData;
                if (liveChatReplayContinuationData) {
                    const continuation = liveChatReplayContinuationData.continuation;
                    if (continuation) {
                        output[0] = continuation;
                    }
                    const timeUntilLastMessageMsec = liveChatReplayContinuationData.timeUntilLastMessageMsec;
                    if (timeUntilLastMessageMsec) {
                        output[1] = timeUntilLastMessageMsec;
                    }
                    break;
                }
            }
        }
        return output;
    }
    getVideoOffsetTimeMsec(jsonElement) {
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
    parseRenderer(jsonElement) {
        const output = [];
        if ((this.setRendererData(output, jsonElement, "liveChatTextMessageRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatPaidMessageRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatPaidStickerRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatMembershipItemRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatViewerEngagementMessageRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatModeChangeMessageRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer") ||
            this.setRendererData(output, jsonElement, "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer")))
            return output;
        const liveChatBannerRenderer = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.liveChatBannerRenderer;
        if (this.setRendererData(output, liveChatBannerRenderer === null || liveChatBannerRenderer === void 0 ? void 0 : liveChatBannerRenderer.header, "liveChatBannerHeaderRenderer"))
            return output;
        const contents = liveChatBannerRenderer === null || liveChatBannerRenderer === void 0 ? void 0 : liveChatBannerRenderer.contents;
        this.setRendererData(output, contents, "liveChatTextMessageRenderer") || this.setRendererData(output, contents, "liveChatBannerRedirectRenderer");
        return output;
    }
    getRendererDataType(rendererName) {
        var _a;
        return (_a = {
            "liveChatViewerEngagementMessageRenderer": "[YouTube]",
            "liveChatModeChangeMessageRenderer": "[YouTube]",
            "liveChatTextMessageRenderer": Localize[this.lang].ChatGeneral,
            "liveChatPaidMessageRenderer": Localize[this.lang].ChatSuperChat,
            "liveChatPaidStickerRenderer": Localize[this.lang].ChatSuperSticker,
            "liveChatMembershipItemRenderer": Localize[this.lang].ChatJoinMember,
            "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer": Localize[this.lang].ChatMemberGift,
            "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer": Localize[this.lang].ChatReceivedMemberGift,
            "liveChatBannerHeaderRenderer": Localize[this.lang].ChatPinned,
            "liveChatBannerRedirectRenderer": Localize[this.lang].ChatRedirect,
        }[rendererName]) !== null && _a !== void 0 ? _a : "";
    }
    setRendererData(dataSet, jsonElement, rendererName) {
        var _a, _b, _c, _d, _e, _f;
        if (!(jsonElement = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement[rendererName]))
            return;
        let data = new Message();
        const messageData = this.parseMessageData(jsonElement);
        data.type = this.getRendererDataType(rendererName);
        data.channelID = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorExternalChannelId;
        data.name = this.getAuthorName(jsonElement);
        data.avatarUrl = this.getAuthorPhoto(jsonElement);
        data.authorBadges = (_a = this.parseAuthorBadges(jsonElement)) === null || _a === void 0 ? void 0 : _a.text;
        data.content = messageData === null || messageData === void 0 ? void 0 : messageData.text;
        data.purchaseAmountText = (_b = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.purchaseAmountText) === null || _b === void 0 ? void 0 : _b.simpleText;
        data.foregroundColor = messageData === null || messageData === void 0 ? void 0 : messageData.textColor;
        data.backgroundColor = this.getColorHexCode((_c = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.backgroundColor) !== null && _c !== void 0 ? _c : jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.bodyBackgroundColor);
        data.timestampUsec = Number(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.timestampUsec);
        if (data.timestampUsec)
            data.timestampText = new Date(data.timestampUsec / 1000).toLocaleString();
        if (rendererName === "liveChatMembershipItemRenderer") {
            // Update type based on message content
            if (data.content.includes(Localize[this.lang].MemberUpgrade)) {
                data.type = Localize[this.lang].ChatMemberUpgrade;
            }
            else if (data.content.includes(Localize[this.lang].MemberMilestone)) {
                data.type = Localize[this.lang].ChatMemberMilestone;
            }
        }
        else if (rendererName === "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer") {
            const headerRenderer = (_d = jsonElement.header) === null || _d === void 0 ? void 0 : _d.liveChatSponsorshipsHeaderRenderer;
            if (headerRenderer) {
                data.name = this.getAuthorName(headerRenderer);
                data.avatarUrl = this.getAuthorPhoto(headerRenderer);
                data.authorBadges = (_e = this.parseAuthorBadges(headerRenderer)) === null || _e === void 0 ? void 0 : _e.text;
                data.content = (_f = this.parseMessageData(headerRenderer)) === null || _f === void 0 ? void 0 : _f.text;
            }
        }
        dataSet.push(data);
        return true;
    }
    getAuthorName(jsonElement) {
        var _a;
        return (_a = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorName) === null || _a === void 0 ? void 0 : _a.simpleText;
    }
    getAuthorPhoto(jsonElement) {
        return this.getThumbnailUrl(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorPhoto);
    }
    parseAuthorBadges(jsonElement) {
        var _a, _b, _c, _d, _e, _f, _g;
        const authorBadges = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.authorBadges;
        if (!Array.isArray(authorBadges))
            return;
        const output = new AuthorBadgesData();
        const tempBadges = [];
        for (const singleAuthorBadge of authorBadges) {
            const badgeData = new BadgeData();
            badgeData.url = this.getThumbnailUrl((_a = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _a === void 0 ? void 0 : _a.customThumbnail);
            badgeData.iconType = (_c = (_b = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _b === void 0 ? void 0 : _b.icon) === null || _c === void 0 ? void 0 : _c.iconType;
            badgeData.tooltip = (_d = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _d === void 0 ? void 0 : _d.tooltip;
            badgeData.label = (_g = (_f = (_e = singleAuthorBadge === null || singleAuthorBadge === void 0 ? void 0 : singleAuthorBadge.liveChatAuthorBadgeRenderer) === null || _e === void 0 ? void 0 : _e.accessibility) === null || _f === void 0 ? void 0 : _f.accessibilityData) === null || _g === void 0 ? void 0 : _g.label;
            tempBadges.push(badgeData);
        }
        output.text = this.getBadgeName(tempBadges);
        output.badges = tempBadges;
        return output;
    }
    getBadgeName(list) {
        var array = list.map(n => n.label);
        if (Array.isArray(array))
            return array.join("、");
    }
    parseMessageData(jsonElement) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const output = new MessageData();
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
            const runsData = this.parseRunData(headerPrimaryText);
            tempText += ` [${runsData.text}] `;
            addRunData(runsData);
        }
        const headerSubtext = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.headerSubtext;
        if (headerSubtext) {
            const simpleText = headerSubtext === null || headerSubtext === void 0 ? void 0 : headerSubtext.simpleText;
            if (simpleText)
                tempText += ` [${simpleText}] `;
            const runsData = this.parseRunData(headerSubtext);
            if (runsData === null || runsData === void 0 ? void 0 : runsData.text)
                tempText += ` ${runsData.text} `;
            addRunData(runsData);
        }
        addRunData(this.parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.primaryText));
        addRunData(this.parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.text));
        addRunData(this.parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.subtext));
        const sticker = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.sticker;
        if (sticker) {
            const stickerData = new StickerData();
            const label = (_b = (_a = sticker === null || sticker === void 0 ? void 0 : sticker.accessibility) === null || _a === void 0 ? void 0 : _a.accessibilityData) === null || _b === void 0 ? void 0 : _b.label;
            if (label)
                tempText += `:${label}:`;
            const content = (_g = (_f = (_e = (_d = (_c = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.lowerBumper) === null || _c === void 0 ? void 0 : _c.liveChatItemBumperViewModel) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.bumperUserEduContentViewModel) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.content;
            if (content)
                tempText += ` [${content}] `;
            stickerData.id = label || '';
            stickerData.url = this.getThumbnailUrl(sticker);
            stickerData.text = label ? `:${label}:` : '';
            stickerData.label = label || '';
            tempStickers.push(stickerData);
        }
        const purchaseAmountText = (_h = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.purchaseAmountText) === null || _h === void 0 ? void 0 : _h.simpleText;
        if (purchaseAmountText)
            tempText += ` [${purchaseAmountText}] `;
        addRunData(this.parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.message));
        addRunData(this.parseRunData(jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.bannerMessage));
        output.text = tempText;
        output.bold = isBold;
        output.textColor = tempTextColor;
        output.fontFace = tempFontFace;
        output.stickers = tempStickers;
        output.emojis = tempEmojis;
        return output;
    }
    parseRunData(jsonElement) {
        var _a, _b, _c;
        const runs = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.runs;
        if (!Array.isArray(runs))
            return;
        const output = new RunsData();
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
                tempTextColor += this.getColorHexCode(textColor);
            const fontFace = singleRun === null || singleRun === void 0 ? void 0 : singleRun.fontFace;
            if (fontFace)
                tempFontFace += fontFace;
            const emoji = singleRun === null || singleRun === void 0 ? void 0 : singleRun.emoji;
            if (emoji) {
                const emojiData = new EmojiData();
                const emojiId = emoji === null || emoji === void 0 ? void 0 : emoji.emojiId;
                if (emojiId)
                    emojiData.id = emojiId;
                emojiData.url = this.getThumbnailUrl(emoji === null || emoji === void 0 ? void 0 : emoji.image);
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
    getThumbnailUrl(jsonElement) {
        var _a;
        const thumbnails = jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.thumbnails;
        if (Array.isArray(thumbnails) && thumbnails.length > 0) {
            const url = (_a = thumbnails[0]) === null || _a === void 0 ? void 0 : _a.url.split('=')[0];
            if (url === null || url === void 0 ? void 0 : url.startsWith('//'))
                return `https:${url}`;
            return url;
        }
    }
    getColorHexCode(color) {
        if (color)
            return `#${color.toString(16).padStart(6, '0')}`;
    }
    //#endregion
    constructor(lang) {
        this.lang = lang;
    }
    resloveStreamUrl(input) {
        input = input.replace(/https?:\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:channel\/|embed\/|live\/|watch.*v=)?/, "").split(/\/|\?/)[0];
        if (!input)
            return;
        if (input.startsWith("UC"))
            return `https://www.youtube.com/channel/${input}/live`;
        if (input.startsWith("@"))
            return `https://www.youtube.com/${input}/live`;
        if (input.length == 11)
            return `https://www.youtube.com/watch?v=${input}`;
    }
    LiveChatMessage(YouTubeURLorID_1) {
        return __awaiter(this, arguments, void 0, function* (YouTubeURLorID, action = (id, m) => console.log(`[${m.name}] ${m.content}`)) {
            var _a;
            var url = this.resloveStreamUrl(YouTubeURLorID);
            console.log(url);
            if (!url) {
                console.error(`NotYoutubeURL ${url}`);
                return false;
            }
            const html = yield (yield fetch(url)).text();
            const videoId = (_a = html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)) === null || _a === void 0 ? void 0 : _a[1];
            console.log(url);
            if (/LIVE_STREAM_OFFLINE/.test(html))
                return console.error('Not Streaming Now');
            let [apiKey, continuation] = [...html.matchAll(/"INNERTUBE_API_KEY":"(.*?)"|"continuation":"(.*?)"/g)].map(x => x[1] || x[2]);
            if (!(apiKey && continuation))
                return console.error('Failed to fetch required parameters.');
            const chatUrl = `https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${apiKey}`; // 替換為實際 API 密鑰
            console.log(1);
            while (true) {
                var data = yield (yield fetch(chatUrl, {
                    method: "post", body: JSON.stringify({
                        context: { client: Object.assign({ clientName: "WEB", clientVersion: "2.20230228.00.00" }, langs[this.lang]), },
                        continuation
                    })
                })).json();
                if (!data)
                    break;
                const next = this.ParseContinuation(data);
                continuation = next[0];
                const messages = this.ParseActions(data);
                if (!Array.isArray(messages))
                    break;
                for (const msg of messages)
                    action(videoId, msg);
                yield new Promise(res => { var _a; return setTimeout(res, (((_a = next[1]) !== null && _a !== void 0 ? _a : 5000) / 2)); });
            }
            console.log("Stream End");
        });
    }
}
module.exports = YoutubeChat;
