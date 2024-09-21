import { VideoDataType } from "@/types/video";
import axios from "axios";

/** 비디오 데이터 패칭 함수 */
export async function fetchVideoData(
    videoId: string): Promise<VideoDataType | undefined> 
{
    try {
        const resultGetVideo = await axios.get('/api/get/video', {
            params: {
                videoId: videoId,
            }
        });
        
        const videoData: VideoDataType = resultGetVideo.data; 
        // 비디오 데이터 저장
        return videoData;

    } catch (error) {
        console.error("비디오 데이터를 가져오는 데 오류가 발생했습니다:", error);
    }
}
