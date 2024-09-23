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

    const keyWordMap = new Map();
    for(let i = 0; i < organizedMorpArr.length; i++){
        let getter = keyWordMap.get(organizedMorpArr[i]) || 0;
        keyWordMap.set(organizedMorpArr[i], getter + 1);
    }
    let keyWordData = Array.from(keyWordMap)
    .sort((a, b) => b[1] - a[1])
    .map((v : [string, number]) => {return { text : v[0], value : v[1]} });

    // 길이가 100 이상이면 자르기
    if(keyWordData.length > 100){
        keyWordData = keyWordData.slice(0,100);
    }

    return { keyWordData, feelCounterObj };
}