import { CommentDataType } from "@/types/comment";
import axios from "axios";

/** 댓글 데이터 패칭 함수 */
export async function fetchCommentData(
    videoId : string,
){
    try{
        let resultGetComment = await axios.get('/api/get/comment', {
            params : {
                videoId : videoId,
            }
        })
        let result : CommentDataType = resultGetComment.data;
        return result;
    }catch(error){
        console.error("댓글 데이터를 가져오는 데 오류가 발생했습니다:", error);
    }
}