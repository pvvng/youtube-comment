import fs from 'fs/promises';  // fs 모듈의 promises 사용
import formidable, { File } from 'formidable';
import processAnalyzedData from '@/@util/functions/wordAPI/processAnalyzedData';
import { NextApiRequest, NextApiResponse } from 'next';
import { cleanUpText } from '@/@util/functions/wordAPI/cleanUpText';
import { getAnalyzedWordData } from '@/@util/functions/wordAPI/getAnalyzedWordData';
import moment from 'moment-timezone';
import { connectDB } from '@/@util/database';
import { Db, WithId } from 'mongodb';

// bodyParser 비활성화
export const config = {
    api: {
        bodyParser: false,
    },
};

interface YoutuberDocument {
    _id : string;
    keyWord : {
        text: string;
        value: number;
        lastUpdate : string;
    }[];
    feeling : {[key: string]:number};
    lastUpdate : string;
}

// 파일 파싱을 비동기 함수로 처리
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
    const form = formidable({ multiples: false, keepExtensions: true });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        // 1. Formidable을 사용해 파일 파싱
        const { files, fields } = await parseForm(req);
        // channelId 추출 및 처리
        if(!fields.channelId) return res.status(400).json({ error: 'No videoId uploaded' });
        const channelId = fields.channelId[0];
        
        // 보낸 댓글 전문
        const uploadedFile = files.file;
        const file = Array.isArray(uploadedFile) ? uploadedFile[0] : (uploadedFile as File | undefined);

        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        // 2. 파일의 내용을 비동기적으로 읽음 (fs.promises.readFile 사용)
        const data = await fs.readFile(file.filepath, 'utf8');
        console.log(data)
        // // 3. 파일의 내용을 클린업하여 반환 및 '/' 단위로 split
        // const organizedtextArr = cleanUpText(data).split('/');

        // // 4. 댓글 분석 함수 호출
        // const { morpResult, feelResult } = await getAnalyzedWordData(organizedtextArr);

        // // 5. 데이터 가공 함수 호출
        // let { keyWordData, feelCounterObj } = processAnalyzedData(morpResult, feelResult);

        // // db 연결
        // const db = (await connectDB).db('youtube');

        // // 채널 아이디를 콜렉션 필드의 _id로 지정하여 검색
        // let videoCollectionResult = await db.collection<YoutuberDocument>('youtuber')
        // .find({ _id : channelId }).toArray();

        // updateDBCollectionYoutuber(
        //     db, channelId, keyWordData, 
        //     feelCounterObj, videoCollectionResult
        // );

        // 6. 응답 반환
        return res.status(200).json("안뇽");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/** DB에 유튜버가 올린 영사의 키워드를 바탕으로 
 * 유튜버 키워드 및 감정 분석 결과 업데이트/추가하는 함수 */
function updateDBCollectionYoutuber(
    db :Db, 
    channelId : string, 
    keyWordData: {text: string, value: number}[], 
    feelCounterObj : {[key: string]:number} ,
    videoCollectionResult : WithId<YoutuberDocument>[]
){
    // 현재 한국시 
    const koreaTime = moment().tz('Asia/Seoul').format('YYYYMMDD');

    // string만 추출해서 Set에 저장
    let stringKeyWordSet :Set<string> = new Set();
    keyWordData.forEach(e => stringKeyWordSet.add(e.text));

    // value 순으로 정렬
    let topTenKeyWord = keyWordData
    .sort((a, b) => b.value - a.value)
    .map(v => {return {text : v.text, value : 1, lastUpdate : koreaTime}});

    // 저장된 데이터가 없을때
    if(videoCollectionResult.length === 0){
        // 아래 코드는 await을 사용하지 않음
        db.collection<YoutuberDocument>('youtuber').insertOne({
            _id : channelId,
            keyWord : topTenKeyWord,
            feeling : {
                positive : Math.round(feelCounterObj.positive/10),
                negative : Math.round(feelCounterObj.negative/10),
                neutral : Math.round(feelCounterObj.neutral/10),
            },
            lastUpdate : koreaTime,
        });
    // 유튜버 데이터가 존재할 때
    }else{
        let preKeyWordData = videoCollectionResult[0].keyWord;
        preKeyWordData = preKeyWordData.map(pkw => {
            let {text, value} = pkw;
            if(stringKeyWordSet.has(text)){
                // 존재하는 단어는 set에서 삭제
                stringKeyWordSet.delete(text);
                value ++;
            }
            return {text, value, lastUpdate : koreaTime}
        })

        // 삭제되지 않은 단어 등록
        stringKeyWordSet.forEach((stk :string) => {
            preKeyWordData.push({text : stk, value: 1, lastUpdate : koreaTime})
        });

        // sort
        preKeyWordData = preKeyWordData.sort((a, b) => {
            // value 필드 기준 내림차순 정렬
            if (b.value !== a.value){
                return b.value - a.value;
            }
            // NaN이면 0을 기본값으로
            const dateA = parseInt(a.lastUpdate) || 0; 
            const dateB = parseInt(b.lastUpdate) || 0; 

            // 오래된 날짜가 뒤로 가게 정렬
            return dateA- dateB;
        });

        // 100개 넘으면 slice
        if(preKeyWordData.length > 100){
            preKeyWordData = preKeyWordData.slice(0,100);
        } 

        // 감정 분석 결과도 업데이트
        let preFeelingData = videoCollectionResult[0].feeling;
        preFeelingData.positive += Math.round(feelCounterObj.positive/10);
        preFeelingData.negative += Math.round(feelCounterObj.negative/10);
        preFeelingData.neutral += Math.round(feelCounterObj.neutral/10);

        // 콜렉션 업데이트 
        db.collection<YoutuberDocument>('youtuber').updateOne(
            { _id : channelId },
            { $set : { 
                keyWord : preKeyWordData, 
                feeling : preFeelingData,
                lastUpdate : koreaTime,
            }}
        );
    }
}