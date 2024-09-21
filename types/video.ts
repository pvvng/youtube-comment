import { YoutuberDataType } from "./youtuber";

/** 섬네일 타입 */
export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
/** 비디오 스니펫 타입 */
export interface VideoSnippetType {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
}
/** 비디오 스니펫의 filtered 타입 */
export interface FilteredVideoSnippet {
  thumbnails: Thumbnail;
  title: string;
  publishedAt: string;
  channelTitle: string;
}
/** 비디오의 static 데이터 타입 */
export interface VideoStatisticsType {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
/** 반환되는 비디오 데이터의 타입 */
export type VideoDataType = {
  video : FilteredVideoSnippet & VideoStatisticsType;
  youtuber : YoutuberDataType
};