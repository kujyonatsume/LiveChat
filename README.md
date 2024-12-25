```ts
const YoutubeChat = require("@natsume0304/livechat")
or
import YoutubeChat from "@natsume0304/livechat"

new YoutubeChat('zh').LiveChatMessage("https://www.youtube.com/@IruniIanvs", (videoId, msg) => {
    // TODO: console.log(videoId, msg)
})
```
# MessageType:

## english: 
General | Super Chat | Super Sticker | Join Member | Member Upgrade | Member Milestone | Member Gift | Received Member Gift | Redirect | Pinned

## 中文: 
一般 | 超級留言 | 超級貼圖 | 加入會員 | 會員升級 | 會員里程碑 | 贈送會員 | 接收會員贈送 | 重新導向 | 置頂留言

## 日本語: 
一般 | スーパーチャット | スーパーステッカー | メンバー登録 | 会員アップグレード | 会員マイルストーン | 会員ギフト | 会員プレゼントを受け取る | リダイレクト | ピン留め

## 한국어: 
일반 | 슈퍼 채팅 | 슈퍼 스티커 | 회원 가입 | 회원 업그레이드 | 회원 마일스톤 | 회원 선물 | 회원 선물 받기 | 리디렉션 | 고정