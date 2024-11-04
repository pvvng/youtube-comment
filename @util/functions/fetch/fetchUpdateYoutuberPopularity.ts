import { YoutuberDataType } from "@/types/youtuber";
import axios from "axios";

export interface PopularPostDataType {
    youtuberName : string;
    customUrl : string;
    thumnailUrl : string;
    channelId : string;
}

export default async function fetchUpdateYoutuberPopularity(
    youtuber : YoutuberDataType
){
    try{
        const postData : PopularPostDataType = {
            youtuberName : youtuber.name,
            customUrl : youtuber.customUrl,
            thumnailUrl : youtuber.thumbnail.url,
            channelId : youtuber.channelId
        }
        
        let resultPostPopularity = await axios.post('/api/post/database/popular/youtuber', postData);
        
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