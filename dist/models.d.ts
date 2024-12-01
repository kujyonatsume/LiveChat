export declare class RegionData {
    gl: string;
    hl: string;
    timeZone: string;
    AcceptLanguage: string;
    readonly value: string;
    constructor(gl?: string, hl?: string, timeZone?: string, AcceptLanguage?: string);
}
export declare class RendererData {
    /** 類型 */
    type?: string;
    /** 使用者頻道ID */
    channelID?: string;
    /** 使用者名稱 */
    name?: string;
    /** 使用者相片影像檔網址 */
    avatarUrl?: string;
    /** 使用者徽章（文字） */
    authorBadges?: string;
    /** 訊息內容 */
    content?: string;
    /** 購買金額（文字格式） */
    purchaseAmountText?: string;
    /** 前景顏色（Hex 色碼） */
    foregroundColor?: string;
    /** 背景顏色（Hex 色碼） */
    backgroundColor?: string;
    /** 時間標記（Unix 秒數） */
    timestampUsec?: number;
    /** 時間標記（文字格式）*/
    timestampText?: string;
    /** 列表：Sticker 資料 */
    stickers?: StickerData[];
    /** Emoji 資料 */
    emojis?: EmojiData[];
    /** 徽章資料 */
    badges?: BadgeData[];
}
export declare class AuthorBadgesData {
    /** 文字 */
    text?: string;
    /** 列表：徽章資料 */
    badges?: BadgeData[];
}
export declare class BadgeData {
    /** 工具提示 */
    tooltip?: string;
    /** 標籤 */
    label?: string;
    /** 圖示類型 */
    iconType?: string;
    /** 影像檔的網址 */
    url?: string;
}
export declare class EmojiData {
    /** Emoji 的 ID 值*/
    id?: string;
    /** 影像檔的網址*/
    url?: string;
    /** 文字 */
    text?: string;
    /**標籤 */
    label?: string;
    /** 是否為自定義表情符號 */
    isCustomEmoji: boolean;
}
export declare class MessageData {
    /** 文字 */
    text?: string;
    /** 是否為粗體 */
    bold?: boolean;
    /** 文字顏色 */
    textColor?: string;
    /** 字型 */
    fontFace?: string;
    /** Sticker 資料 */
    stickers?: StickerData[];
    /** Emoji 資料 */
    emojis?: EmojiData[];
}
export declare class StickerData {
    /** Sticker 的 ID 值 */
    id?: string;
    /** 影像檔的網址 */
    url?: string;
    /** 文字 */
    text?: string;
    /** 標籤 */
    label?: string;
}
export declare class RunsData {
    /** 文字 */
    text?: string;
    /** 是否為粗體 */
    bold?: boolean;
    /** 文字顏色 */
    textColor?: string;
    /** 字型 */
    fontFace?: string;
    /** 列表：Emoji 資料 */
    emojis?: EmojiData[];
    /** 網址 */
    url?: string;
    /** 是否為連結 */
    isLink: boolean;
}
export declare const Localize: {
    en: {
        ChatGeneral: string;
        ChatSuperChat: string;
        ChatSuperSticker: string;
        ChatJoinMember: string;
        ChatMemberUpgrade: string;
        ChatMemberMilestone: string;
        ChatMemberGift: string;
        ChatReceivedMemberGift: string;
        ChatRedirect: string;
        ChatPinned: string;
        MemberUpgrade: string;
        MemberMilestone: string;
        Region: RegionData;
    };
    zh: {
        ChatGeneral: string;
        ChatSuperChat: string;
        ChatSuperSticker: string;
        ChatJoinMember: string;
        ChatMemberUpgrade: string;
        ChatMemberMilestone: string;
        ChatMemberGift: string;
        ChatReceivedMemberGift: string;
        ChatRedirect: string;
        ChatPinned: string;
        MemberUpgrade: string;
        MemberMilestone: string;
        Region: RegionData;
    };
    jp: {
        ChatGeneral: string;
        ChatSuperChat: string;
        ChatSuperSticker: string;
        ChatJoinMember: string;
        ChatMemberUpgrade: string;
        ChatMemberMilestone: string;
        ChatMemberGift: string;
        ChatReceivedMemberGift: string;
        ChatRedirect: string;
        ChatPinned: string;
        MemberUpgrade: string;
        MemberMilestone: string;
        Region: RegionData;
    };
    kr: {
        ChatGeneral: string;
        ChatSuperChat: string;
        ChatSuperSticker: string;
        ChatJoinMember: string;
        ChatMemberUpgrade: string;
        ChatMemberMilestone: string;
        ChatMemberGift: string;
        ChatReceivedMemberGift: string;
        ChatRedirect: string;
        ChatPinned: string;
        MemberUpgrade: string;
        MemberMilestone: string;
        Region: RegionData;
    };
};
