import { FilteredCommentType } from "@/types/comment";
import { AnalyzedCommentData } from "@/types/word";
import axios, { AxiosResponse } from "axios";

/** 댓글 데이터 합본 파일로 만들어 API에 보내는(POST) 함수 
 * 
 * **댓글 데이터 배열 인자로 필요**
*/
export async function fetchAnalyzedCommentData(commentData : FilteredCommentType[]){
    let sumString = '';

    commentData.forEach(cd => sumString += (cd.text + '/'));

    const blob = new Blob([sumString], {type : 'text/plain'});
    const formData = new FormData();
    formData.append('file', blob, 'textdata.txt');

    try{
        const res : AxiosResponse<AnalyzedCommentData> = await axios.post('/api/post/word', formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
        });
        return res.data;
    }catch(error){
        console.log('댓글 데이터 분석 중 오류가 발생했습니다 : ', error);
    }
}
