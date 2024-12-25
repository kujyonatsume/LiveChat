declare const Localize: {
    readonly en: {
        readonly ChatGeneral: "General";
        readonly ChatSuperChat: "Super Chat";
        readonly ChatSuperSticker: "Super Sticker";
        readonly ChatJoinMember: "Join Member";
        readonly ChatMemberUpgrade: "Member Upgrade";
        readonly ChatMemberMilestone: "Member Milestone";
        readonly ChatMemberGift: "Member Gift";
        readonly ChatReceivedMemberGift: "Received Member Gift";
        readonly ChatRedirect: "Redirect";
        readonly ChatPinned: "Pinned";
        readonly MemberUpgrade: "Upgraded membership to";
        readonly MemberMilestone: "Member for";
    };
    readonly zh: {
        readonly ChatGeneral: "一般";
        readonly ChatSuperChat: "超級留言";
        readonly ChatSuperSticker: "超級貼圖";
        readonly ChatJoinMember: "加入會員";
        readonly ChatMemberUpgrade: "會員升級";
        readonly ChatMemberMilestone: "會員里程碑";
        readonly ChatMemberGift: "贈送會員";
        readonly ChatReceivedMemberGift: "接收會員贈送";
        readonly ChatRedirect: "重新導向";
        readonly ChatPinned: "置頂留言";
        readonly MemberUpgrade: "頻道會員等級已升級至";
        readonly MemberMilestone: "已加入會員";
    };
    readonly jp: {
        readonly ChatGeneral: "一般";
        readonly ChatSuperChat: "スーパーチャット";
        readonly ChatSuperSticker: "スーパーステッカー";
        readonly ChatJoinMember: "メンバー登録";
        readonly ChatMemberUpgrade: "会員アップグレード";
        readonly ChatMemberMilestone: "会員マイルストーン";
        readonly ChatMemberGift: "会員ギフト";
        readonly ChatReceivedMemberGift: "会員プレゼントを受け取る";
        readonly ChatRedirect: "リダイレクト";
        readonly ChatPinned: "ピン留め";
        readonly MemberUpgrade: "にアップグレードされました";
        readonly MemberMilestone: "メンバー歴";
    };
    readonly kr: {
        readonly ChatGeneral: "일반";
        readonly ChatSuperChat: "슈퍼 채팅";
        readonly ChatSuperSticker: "슈퍼 스티커";
        readonly ChatJoinMember: "회원 가입";
        readonly ChatMemberUpgrade: "회원 업그레이드";
        readonly ChatMemberMilestone: "회원 마일스톤";
        readonly ChatMemberGift: "회원 선물";
        readonly ChatReceivedMemberGift: "회원 선물 받기";
        readonly ChatRedirect: "리디렉션";
        readonly ChatPinned: "고정";
        readonly MemberUpgrade: "멤버십을";
        readonly MemberMilestone: "회원 가입 기간";
    };
};
type LocalizeType = typeof Localize;
type LocalizeKey = keyof LocalizeType;
type MessageType<T extends LocalizeKey> = LocalizeType[T][keyof LocalizeType[T]] | "[YouTube]" | "";
declare class Message<T extends LocalizeKey> {
    /** 訊息類型 */
    type?: MessageType<T>;
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
declare class BadgeData {
    /** 工具提示 */
    tooltip?: string;
    /** 標籤 */
    label?: string;
    /** 圖示類型 */
    iconType?: string;
    /** 影像檔的網址 */
    url?: string;
}
declare class EmojiData {
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
declare class StickerData {
    /** Sticker 的 ID 值 */
    id?: string;
    /** 影像檔的網址 */
    url?: string;
    /** 文字 */
    text?: string;
    /** 標籤 */
    label?: string;
}
declare class YoutubeChat<T extends LocalizeKey> {
    private lang;
    private ParseActions;
    private ParseContinuation;
    private getVideoOffsetTimeMsec;
    private parseRenderer;
    private getRendererDataType;
    private setRendererData;
    private getAuthorName;
    private getAuthorPhoto;
    private parseAuthorBadges;
    private getBadgeName;
    private parseMessageData;
    private parseRunData;
    private getThumbnailUrl;
    private getColorHexCode;
    constructor(lang: T);
    resloveStreamUrl(input: string): string;
    LiveChatMessage(YouTubeURLorID: string, action?: (videoId: string, message: Message<T>) => any): Promise<false | void>;
}
export = YoutubeChat;
