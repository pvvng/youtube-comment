import { VideoDataType } from "@/types/video";
import axios from "axios";

/** 비디오 데이터 패칭 함수 */
export async function fetchVideoData(videoId: string): Promise<VideoDataType | undefined> {
    
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
        // error가 AxiosError인지 확인
        if (axios.isAxiosError(error)) {
            // AxiosError 타입에 따라 에러 처리
            console.error("Axios 에러 발생:", error.message);
        } else if (error instanceof Error) {
            // 다른 일반 에러 처리
            console.error("일반 에러 발생:", error.message);
        } else {
            console.error("알 수 없는 에러 발생");
        }

        // 에러를 다시 던져 useQuery에서 처리하도록 함
        throw error;
    }
}
