import { Thumbnail } from "./video";

interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
}

export interface YoutuberSnippetType {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    localized: {
      title: string;
      description: string;
    };
    country: string;
}
  
export interface YoutuberStatisticsType {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
}

export interface YoutuberDataType {
    name: string,
    description: string,
    customUrl: string;
    thumbnail: Thumbnail,
    subscriber: string,
    totalview: string,
    videoCount: string,
    channelId : string,
}

export interface RawSubscribedYoutuberType {
    kind : string;
    etag : string;
    id : string;
    snippet : SubScibedYoutuberSnippetType;
}

export interface SubScibedYoutuberSnippetType {
    publishedAt : string;
    title : string;
    description : string;
    resourceId : {
        kind : string;
        // 유튜버 아이디
        channelId : string;
    };
    // 사용자 아이디
    channelId : string;
    thumbnails : {
        default : { url : string };
        medium ?: { url : string };
        high ?: { url : string };
    };
}

export interface SubScibedYoutuberType {
    publishedAt : string;
    title : string;
    description : string;
    channelId : string;
    thumbnails : string;
}