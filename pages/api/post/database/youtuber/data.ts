import { connectDB } from "@/@util/database";
import { YoutuberDataType } from "@/types/youtuber";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const youtuberData: YoutuberDataType = req.body;
    const channelId = youtuberData.channelId;

    checkYoutuberData(youtuberData, res);

    let db: Db;

    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
        return res.status(500).json({ message: 'Database connection failed' });
    }

    try {
        const getResult = await db.collection('youtuber').findOne({ channelId });

        if (!getResult) {
            const insertResult = await db.collection('youtuber').insertOne({
                _id: new ObjectId(),
                channelId : channelId,
                youtuber : {...youtuberData},
                extra : {
                    sentiment : null,
                    keyword : null,
                    popularity : 1,
                }
            });

            if (insertResult.acknowledged) {
                console.log("유튜버 데이터 추가 성공:", channelId);
                return res.status(200).json({ message: "Update successful" });
            } else {
                console.error("유튜버 데이터 추가 실패");
                return res.status(500).json({ message: 'Failed to insert data' });
            }
        }else{
            await db.collection('youtuber').updateOne(
                { _id : getResult._id },
                { $inc : { 
                    'extra.popularity' : 1 
                }},
            )
        }

        return res.status(200).json({ message: "Update successful" });

    } catch (error) {
        console.error("데이터 처리 중 에러 발생:", error);
        return res.status(500).json({ message: 'An error occurred while processing data' });
    }
}

function checkYoutuberData(
    youtuberData : YoutuberDataType, 
    res : NextApiResponse
){
    let { 
        thumbnail, customUrl, videoCount, 
        channelId, name, description, 
        subscriber, totalview 
    } = youtuberData;

    try {
        // 입력 데이터 정리 및 검증
        if (typeof thumbnail.url !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof thumbnail.width !== "number"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof thumbnail.height !== "number"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof customUrl !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof videoCount !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof channelId !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof name !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof description !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof subscriber !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
        if(typeof totalview !== "string"){
            return res.status(400).json({ message: "Invalid type" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Invalid input data" });
    }
}