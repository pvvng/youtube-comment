import { connectDB } from "@/@util/database";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    let db: Db;

    try {
        // 데이터베이스 연결
        db = (await connectDB).db("youtube");
    } catch (error) {
        // 데이터베이스 연결 실패
        console.error("Database connection error:", error);
        return res.status(500).json({ message: "Failed to connect to database" });
    }

    try {
        // 데이터 조회 및 정렬
        const getYoutuberArr = await db.collection("youtuber").find().toArray();

        if (!getYoutuberArr || getYoutuberArr.length === 0) {
            return res.status(404).json({ message: "No youtubers found" });
        }

        getYoutuberArr.sort((a, b) => b.extra.popularity - a.extra.popularity);
        const topYoutuber = getYoutuberArr[0];

        return res.status(200).json(topYoutuber);
    } catch (error) {
        // 데이터 조회 실패
        console.error("Error fetching youtubers:", error);
        return res.status(500).json({ message: "Failed to fetch youtubers" });
    }
}