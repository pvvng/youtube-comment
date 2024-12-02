import { VideoDataType } from "@/types/video";
import axios from "axios";

export default async function fetchYoutuberProfileData(
    channelId : string
){
    try {
        const resultGetChannel = await axios.get('/api/get/channel', {
            params: {
                channelId: channelId, // 비디오 ID 대신 채널 ID 사용
            }
        });
    
        const channelData: VideoDataType = resultGetChannel.data; 
        const { youtuber } = channelData;
    
        let resultPostYoutuberData = await axios.post(
            '/api/post/database/youtuber/data', youtuber
        );
    
        return resultPostYoutuberData.data.message;
    }catch(error){
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