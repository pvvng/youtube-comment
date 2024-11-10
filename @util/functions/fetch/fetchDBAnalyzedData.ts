import axios from "axios";
import { videoCollectionType } from "./updateDBYoutuberCollection";

export async function fetchDBAnalyzedData(
    videoId : string
){
    try{
        let resultGetComment = await axios.get('/api/get/database/comment', {
            params : {
                videoId : videoId,
            }
        });
        let result : videoCollectionType|null  = resultGetComment.data;

        return result;
    }catch(error){
        // error가 AxiosError인지 확인
        if (axios.isAxiosError(error)) {
            // AxiosError 타입에 따라 에러 처리
            console.error("Axios 에러 발생:", error.response?.data);
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