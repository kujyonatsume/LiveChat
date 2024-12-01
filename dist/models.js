"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Localize = exports.RunsData = exports.StickerData = exports.MessageData = exports.EmojiData = exports.BadgeData = exports.AuthorBadgesData = exports.RendererData = exports.RegionData = void 0;
class RegionData {
    constructor(gl = "US", hl = "en", timeZone = "America/Los_Angeles", AcceptLanguage = "en-US;q=0.9,en-GB;q=0.8,en;q=0.7") {
        this.gl = gl;
        this.hl = hl;
        this.timeZone = timeZone;
        this.AcceptLanguage = AcceptLanguage;
    }
}
exports.RegionData = RegionData;
class RendererData {
}
exports.RendererData = RendererData;
class AuthorBadgesData {
}
exports.AuthorBadgesData = AuthorBadgesData;
class BadgeData {
}
exports.BadgeData = BadgeData;
class EmojiData {
    constructor() {
        /** 是否為自定義表情符號 */
        this.isCustomEmoji = false;
    }
}
exports.EmojiData = EmojiData;
class MessageData {
}
exports.MessageData = MessageData;
class StickerData {
}
exports.StickerData = StickerData;
class RunsData {
    constructor() {
        /** 是否為連結 */
        this.isLink = false;
    }
}
exports.RunsData = RunsData;
exports.Localize = {
    en: {
        ChatGeneral: "General", ChatSuperChat: "Super Chat", ChatSuperSticker: "Super Sticker", ChatJoinMember: "Join Member", ChatMemberUpgrade: "Member Upgrade", ChatMemberMilestone: "Member Milestone", ChatMemberGift: "Member Gift", ChatReceivedMemberGift: "Received Member Gift", ChatRedirect: "Redirect", ChatPinned: "Pinned", MemberUpgrade: "Upgraded membership to", MemberMilestone: "Member for",
        Region: new RegionData("US", "en", "America/New_York", "en-US,en;q=0.9")
    },
    zh: {
        ChatGeneral: "一般", ChatSuperChat: "超級留言", ChatSuperSticker: "超級貼圖", ChatJoinMember: "加入會員", ChatMemberUpgrade: "會員升級", ChatMemberMilestone: "會員里程碑", ChatMemberGift: "贈送會員", ChatReceivedMemberGift: "接收會員贈送", ChatRedirect: "重新導向", ChatPinned: "置頂留言", MemberUpgrade: "頻道會員等級已升級至", MemberMilestone: "已加入會員",
        Region: new RegionData("TW", "zh-TW", "Asia/Taipei", "zh-TW,zh;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6")
    },
    jp: {
        ChatGeneral: "一般", ChatSuperChat: "スーパーチャット", ChatSuperSticker: "スーパーステッカー", ChatJoinMember: "メンバー登録", ChatMemberUpgrade: "会員アップグレード", ChatMemberMilestone: "会員マイルストーン", ChatMemberGift: "会員ギフト", ChatReceivedMemberGift: "会員プレゼントを受け取る", ChatRedirect: "リダイレクト", ChatPinned: "ピン留め", MemberUpgrade: "にアップグレードされました", MemberMilestone: "メンバー歴",
        Region: new RegionData("JP", "ja", "Asia/Tokyo", "ja-JP,ja;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6")
    },
    kr: {
        ChatGeneral: "일반", ChatSuperChat: "슈퍼 채팅", ChatSuperSticker: "슈퍼 스티커", ChatJoinMember: "회원 가입", ChatMemberUpgrade: "회원 업그레이드", ChatMemberMilestone: "회원 마일스톤", ChatMemberGift: "회원 선물", ChatReceivedMemberGift: "회원 선물 받기", ChatRedirect: "리디렉션", ChatPinned: "고정", MemberUpgrade: "멤버십을", MemberMilestone: "회원 가입 기간",
        Region: new RegionData("KR", "ko", "Asia/Seoul", "ko-KR,ko;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6")
    }
};
