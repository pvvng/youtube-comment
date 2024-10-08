import { FilteredCommentType } from "@/types/comment";
import { AnalyzedCommentData } from "@/types/word";
import axios, { AxiosResponse } from "axios";
import { cleanUpText } from "../wordAPI/cleanUpText";

const flask_url = process.env.NEXT_PUBLIC_FLASK_URL

/** 댓글 데이터 합본 파일로 만들어 API에 보내는(POST) 함수 
 * 
 * **댓글 데이터 배열 인자로 필요**
*/
export async function fetchAnalyzedCommentData(
    commentData : FilteredCommentType[], channelId :string
){
    if(!flask_url) return null;

    // flask 서버에 보낼 수 있는 데이터로 수정
    let flaskArr : {text :string, like : number}[] = [];
    commentData.forEach(cd => {
        let cleandComment = cleanUpText(cd.text);
        flaskArr.push({
            text : cleandComment,
            like : cd.likeCount
        })
    })
    // 수정한 데이터 stringify
    let stringifyData = JSON.stringify(flaskArr);

    const blob = new Blob([stringifyData], {type : 'text/plain'});
    const formData = new FormData();
    formData.append('file', blob, 'textdata.txt');

    // videoId를 FormData에 추가
    formData.append('channelId', channelId);

    try{
        const res : AxiosResponse<AnalyzedCommentData> = 
        await axios.post(flask_url, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
        });
        return res.data;
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
