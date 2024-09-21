import { DataObjectType, MorpType, OrganizedFeelType, RawFeelType } from "@/types/word";
import { callClovaFeelingAPI } from "./callClovaFeelingAPI";
import { callMorpAPI } from "./callMorpAPI";
import { stopWords } from "@/stopWord";

/** 형태소 분석, 감정 분석 API 호출 후 데이터 가공하여 반환하는 함수 */
export async function getAnalyzedWordData(organizedtextArr :string[]){

    const [FEEL_MAX_LENGTH, MORP_MAX_LENGTH] = [700, 8000]; 
    let [feelResult, morpResult] :[OrganizedFeelType[], MorpType[]] = [[], []];
    let [feelBatch, morpBatch] : [string[], string[]] = [[], []];

    let feelValue = '';
    let morpValue = '';

    for(let i = 0 ; i < organizedtextArr.length; i++){
        const text = organizedtextArr[i];

        if(feelValue.length + text.length <= FEEL_MAX_LENGTH){
            feelValue += text;
            feelBatch.push(text);
        }else{
            // 댓글에 독후감 쓰는 미친새끼들 걸러내는 패턴
            // 1000자 초과로 적은 댓글은 걸러버리기
            if(feelValue.length <= 1000){
                const res :RawFeelType[] = await callClovaFeelingAPI(feelValue);
                res.forEach(r => {
                    const {content, sentiment} = r;
                    feelResult.push({
                        content : content,
                        sentiment : sentiment,
                    })
                });
                // 초기화 후 현재 댓글 처리
                feelValue = text;
                feelBatch = [text];
            }
        }

        if(morpValue.length + text.length <= MORP_MAX_LENGTH){
            morpValue += text;
            morpBatch.push(text);
        }else{
            // API 호출
            const res = await callMorpAPI(morpValue);
            const sentenceArray: DataObjectType[] = res.data.return_object.sentence;
    
            sentenceArray.forEach(e => {
                morpResult.push(...e.morp);
            });
            
            // 초기화 후 현재 댓글 처리
            morpValue = text;
            morpBatch = [text];
        }
    }

    // 마지막 남은 morpBatch 처리
    if(morpBatch.length > 0) {
        const morpRes = await callMorpAPI(morpValue);
        const sentenceArray :DataObjectType[] = morpRes.data.return_object.sentence;
        sentenceArray.forEach(e => morpResult.push(...e.morp));
    }
    // 마지막 남은 feelBatch 처리
    if(feelBatch.length > 0) {
        // 댓글에 독후감 쓰는 미친새끼들 걸러내는 패턴
        if(feelValue.length <= 1000){
            const feelRes :RawFeelType[] = await callClovaFeelingAPI(feelValue);
            feelRes.forEach(r => {
                const {content, sentiment} = r;
                feelResult.push({
                    content : content,
                    sentiment : sentiment,
                })
            });
        }
    }

    return { morpResult, feelResult }
}