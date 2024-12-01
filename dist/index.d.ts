import { Message } from './models';
export declare function LiveChatMessage(videoIDorUrl: string, handler: (message: Message) => any): Promise<void>;
export declare function getYouTubeVideoID(url: string): string;
export declare function getLatestStreamingVideoID(channelIDorUrl: string): Promise<string>;
export declare function getYouTubeChannelID(channelUrl: string): Promise<string>;
export declare function parseYouTubeChannelID(channelUrl: string): Promise<string>;
