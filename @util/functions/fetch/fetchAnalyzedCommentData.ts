import { FilteredCommentType } from "@/types/comment";
import { AnalyzedCommentData } from "@/types/word";
import axios from "axios";

/** 댓글 데이터 합본 파일로 만들어 API에 보내는(POST) 함수 
 * 
 * **댓글 데이터 배열 인자로 필요**
*/
export async function fetchAnalyzedCommentData(
    commentData : FilteredCommentType[], videoId :string, channelId :string
){  
    try{
        const response = await axios.post('/api/post/analyze', {
            commentData: commentData,
            channelId: channelId,
            videoId : videoId
        });
        let result : AnalyzedCommentData = response.data 
        return result;
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
