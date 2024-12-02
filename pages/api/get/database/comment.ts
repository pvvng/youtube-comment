import { connectDB } from "@/@util/database";
import { videoCollectionType } from "@/@util/functions/fetch/PATCH/updateDBYoutuberCollection";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const videoId = req.query.videoId;

    // videoId 유효성 검사
    if (Array.isArray(videoId) || !videoId) {
        return res.status(400).json({ message: "videoId is required and must be a string." });
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
        const videoResult = await db.collection<videoCollectionType>("video").findOne(
            { videoId: videoId },
            { projection: { _id: 0 } } // _id 필드를 제외
        );

        return res.status(200).json(videoResult);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving video data.", error });
    }
}
