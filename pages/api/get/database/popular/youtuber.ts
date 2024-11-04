import { connectDB } from "@/@util/database";
import moment from "moment-timezone";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req : NextApiRequest, res : NextApiResponse
){
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');

    let db : Db;

    try{
        // db 연결
        db = (await connectDB).db('youtube');
    }catch(error){
        // db 연결 실패시 에러 반환
        throw new Error('Fail to connect to Database');
    }
    
    let getPopularYoutuberResult = await db.collection('popular-youtuber')
    .find({date : koreaTime}).toArray();

    getPopularYoutuberResult = getPopularYoutuberResult.sort((a, b) => b.count - a.count);
    
    if(getPopularYoutuberResult.length > 10){
        getPopularYoutuberResult = getPopularYoutuberResult.slice(0, 10);
    }

    return res.status(200).json(getPopularYoutuberResult);
}