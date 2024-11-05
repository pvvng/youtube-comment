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
