import { connectDB } from "@/@util/database";
import { DBYoutuberDataType } from "@/pages/api/get/database/youtuber/data";
import { AnalyzedCommentData, PosType, SentimentType } from "@/types/word";
import { Db } from "mongodb";

/**
 * 분석한 데이터 db에 업데이트하는 함수
 * @param videoId 비디오 아이디
 * @param channelId 채널 아이디
 * @param analyzedData 분석 결과 데이터
 * @returns void
 */
export default async function updateDBYAnalyzedDataYoutuberCollection(
    channelId : string, 
    analyzedData : AnalyzedCommentData
){
    // 분석한 댓글 데이터 구조분해 할당
    const { pos : keywordData, sentiment } = analyzedData;

    let db : Db;

    try{
        // db 연결
        db = (await connectDB).db('youtube');
    }catch(error){
        // db 연결 실패시 에러 반환
        throw new Error('Fail to connect to Database');
    }

    try{
        const youtuberResult = await db.collection<DBYoutuberDataType>("youtuber")
        .findOne(
            { channelId: channelId },
            { projection: { _id: 0 } } // _id 필드를 제외
        )
    
        if(!youtuberResult){
            console.log(`${channelId} 데이터가 콜렉션에 존재하지 않음`);
        }else{
            const extradata = youtuberResult.extra;
            let { sentiment : DBSentiment, keyword : DBKeyword } = extradata;
    
            const { DBSentiment : updatedSentiment, DBKeyword : updatedKeyword} 
            = processUpdateDBExtraData(DBSentiment, sentiment, DBKeyword, keywordData);
    
            // 필요한 필드만 업데이트
            db.collection<DBYoutuberDataType>("youtuber").updateOne(
                { channelId: channelId },
                { 
                    $set: { 
                        "extra.keyword": updatedKeyword, 
                        "extra.sentiment": updatedSentiment 
                    }
                }
            ).catch(error => {
                console.error("Error during update:", error);
            });
        }
    }catch(error){
        console.error("Error during update:", error);
    }
}

function processUpdateDBExtraData(
    DBSentiment : SentimentType | null, sentiment : SentimentType,
    DBKeyword : PosType[] | null, keywordData : PosType[]
){
    if(DBSentiment === null){
        DBSentiment = {...sentiment};
    }else{
        DBSentiment = {...calculateUpdatedSentiment(DBSentiment, sentiment)};
    }

    if(DBKeyword === null){
        DBKeyword = [...keywordData];
    }else{
        DBKeyword = [...updateKeyword(DBKeyword, keywordData)];
    }

    return { DBSentiment, DBKeyword };
}

function updateKeyword(
    DBKeyword :PosType[], keywordData : PosType[] 
){
    // 길이가 모두 0이면 얼리 리턴
    if (DBKeyword.length === 0 && keywordData.length === 0) return [];

    const DBKeywordMap = new Map<string, number>();

    DBKeyword.forEach(dbkw => {
        DBKeywordMap.set(dbkw.text, dbkw.value);
    });

    keywordData.forEach(kw => {
        const mapKeyword = DBKeywordMap.get(kw.text);
        if(mapKeyword !== undefined){
            DBKeywordMap.set(kw.text, mapKeyword + kw.value);
        }else{
            DBKeywordMap.set(kw.text, kw.value);
        }
    });

    let totalValue = 0;

    let appendedKeyword: PosType[] = Array.from(
        DBKeywordMap, 
        ([text, value]) => {
            // totalValue에 value 누적
            totalValue += value; 
            return { text, value };
        }
    );

    // // 백분율 로직 => 일단 보류
    // let calculatedNewKeyword :PosType[] = [];

    // appendedKeyword.forEach(apkw => {
    //     let roundedValue = Math.round((apkw.value / totalValue) * 100);
    //     if(roundedValue > 0){
    //         calculatedNewKeyword.push({
    //             text : apkw.text, 
    //             value : roundedValue
    //         });
    //     }
    // })

    // 정렬 후 상위 100개 선택
    if (appendedKeyword.length > 100) {
        appendedKeyword = appendedKeyword
        .sort((a, b) => b.value - a.value) 
        .slice(0, 100); 
    }

    return appendedKeyword;
}

function calculateUpdatedSentiment(
    DBSentiment : SentimentType, sentiment : SentimentType
){
    const sentimentKey : ['positive', 'negative', 'neutral'] = ['positive', 'negative', 'neutral'];

    // 백분율 계산을 위한 총 합 구하기
    let DBsentimentTotalCount = 0;
    let sentimentTotalCount = 0;

    sentimentKey.forEach(key => {
        DBsentimentTotalCount += DBSentiment[key];
        sentimentTotalCount += sentiment[key];
    });

    // 0으로 나누는 에러를 방지하기 위한 예외 처리
    if (DBsentimentTotalCount === 0) DBsentimentTotalCount = 1;
    if (sentimentTotalCount === 0) sentimentTotalCount = 1;

    const calculatedSentiment : SentimentType = {
        positive : 0,
        negative : 0,
        neutral : 0,
    }

    sentimentKey.forEach(key => {
        let updatePercentage = (
            (DBSentiment[key] / DBsentimentTotalCount) * 100 + 
            (sentiment[key] / sentimentTotalCount) * 100
        ) / 2;

        updatePercentage = Math.round(updatePercentage);

        calculatedSentiment[key] = updatePercentage;
    });

    return calculatedSentiment;
}