import { stopWords } from "@/stopWord";
import { MorpType, OrganizedFeelType } from "@/types/word";

/** 분석한 데이터를 클라이언트가 사용할 수 있도록 가공하는 함수 */
export default function processAnalyzedData(
    morpResult : MorpType[], feelResult : OrganizedFeelType[]
){
    // 감정 분석 결과 카운트
    let feelCounterObj :{[key:string] : number} = {
        'positive' : 0,
        'negative' : 0,
        'neutral' : 0,
    }

    feelResult.forEach(v => {
        let feeling :string = v.sentiment;
        const laughRegex = /[ㅋㅎ]/;
        if(laughRegex.test(v.content || '')){
            feeling = 'positive';
        }
        feelCounterObj[feeling] ++;
    });

    // 형태소 분석 결과 필터링
    const availableType = [
        'NNG', 'NNP', 'NP'
    ];

    let organizedMorpArr :string[] = [];

    morpResult.forEach(v => {
        let pushElement = undefined;
        // 불용어 제거
        if(availableType.includes(v.type)){
            if(!stopWords.has(v.lemma)){
                pushElement = v.lemma;
            }
        }
        if(pushElement){
            organizedMorpArr.push(pushElement);
        }
    });

    return { organizedMorpArr, feelCounterObj };
}