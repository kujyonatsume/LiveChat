export declare function LiveChatMessage(videoIDorUrl: string): Promise<void>;
export declare function getYouTubeVideoID(url: string): string;
export declare function getLatestStreamingVideoID(channelIDorUrl: string): Promise<string>;
export declare function getYouTubeChannelID(channelUrl: string): Promise<string>;
export declare function parseYouTubeChannelID(channelUrl: string): Promise<string>;
