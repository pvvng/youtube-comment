import { connectDB } from "@/@util/database";
import { PosType, SentimentType } from "@/types/word";
import { YoutuberDataType } from "@/types/youtuber";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export interface DBYoutuberDataType {
    youtuber : YoutuberDataType;
    extra : {
        sentiment : SentimentType | null;
        keyword : PosType[] | null;
        popularity : number;
    }
}

export default async function handler(
    req : NextApiRequest, res : NextApiResponse
){
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { channelId } = req.query;

    // videoId 유효성 검사
    if (Array.isArray(channelId) || !channelId) {
        return res.status(400).json({ message: 'channelId is required and must be a string.' });
    }

    let db: Db;

    try {
        // db 연결
        db = (await connectDB).db("youtube");
    } catch (error) {
        return res.status(500).json({ message: "Failed to connect to the database.", error });
    }

    try {
        // 데이터베이스 쿼리
        const youtuberResult = await db.collection<DBYoutuberDataType>("youtuber")
        .findOne(
            { channelId: channelId },
            { projection: { _id: 0 } } // _id 필드를 제외
        );
        
        return res.status(200).json(youtuberResult);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving video data.", error });
    }
}