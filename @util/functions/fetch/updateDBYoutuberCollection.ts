import { connectDB } from "@/@util/database";
import { AnalyzedCommentData, PosType, SentimentType } from "@/types/word";
import moment from "moment-timezone";
import { Db, ObjectId } from "mongodb";

export interface videoCollectionType {
    videoId : string;
    channelId : string;
    sentiment : SentimentType;
    keyword : PosType[];
    lastUpdate : string;
}

export interface videoCollectionTypeWithId extends videoCollectionType {
    _id : ObjectId;
}

/**
 * 분석한 데이터 db에 업데이트하는 함수
 * @param videoId 비디오 아이디
 * @param channelId 채널 아이디
 * @param analyzedData 분석 결과 데이터
 * @returns void
 */
export default async function updateDBYoutuberCollection(
    videoId : string,
    channelId : string, 
    analyzedData : AnalyzedCommentData
){
    // 현재 한국시 
    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');

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
    
    // 업데이트할 데이터
    const updateData = { 
        videoId, 
        channelId, 
        sentiment, 
        keyword: keywordData, 
        lastUpdate: koreaTime 
    };

    try{
        const videoCollectionResult = 
        await db.collection<videoCollectionTypeWithId>('video')
        .findOne({videoId});
    
        if(!videoCollectionResult){
            db.collection('video')
            .insertOne(updateData)        
            .catch(error => {
                console.error("Error during upload:", error);
            });
            console.log(`${videoId} 영상 데이터 콜렉션에 추가 성공`);
        }else if(videoCollectionResult.lastUpdate !== koreaTime){
            db.collection('video').updateOne(
                { videoId : videoId },
                { $set : updateData }
            ).catch(error => {
                console.error("Error during update:", error);
            });
            console.log(`${videoId} 영상 데이터가 콜렉션에 ${koreaTime} 날짜로 업데이트 완료`);
        }else{
            console.log('최근 문서가 이미 존재합니다.');
        }
    }catch(error){
        console.error("Error during update:", error);
    }
}