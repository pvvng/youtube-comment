import { VideoDataType } from "@/types/video";
import { create } from "zustand"

/** video data store type */
interface VideoDataStoreType {
    videoData: VideoDataType | undefined; // 비디오 데이터가 없을 때는 null

    // 상태 업데이트 함수들
    setVideoData: (data: VideoDataType | undefined) => void;
}

/** 비디오 데이터 store */
export const useVideoDataStore = create<VideoDataStoreType>((set) => ({
    // 데이터
    videoData : undefined,

    // 상태 업데이트 함수
    setVideoData: (data) => set({ videoData: data }),
}))