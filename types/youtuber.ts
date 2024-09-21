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