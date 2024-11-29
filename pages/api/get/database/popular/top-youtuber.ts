import { connectDB } from "@/@util/database";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    let db: Db;

    try {
        // db 연결
        db = (await connectDB).db('youtube');
    } catch (error) {
        console.error("Database connection error:", error);
        return res.status(500).json({ message: "Failed to connect to the database" });
    }

    try {
        // 유튜버 데이터 가져오기
        let getYoutuberArr = await db.collection("youtuber").find().toArray();

        // 데이터가 없으면 404 응답
        if (!getYoutuberArr || getYoutuberArr.length === 0) {
            return res.status(404).json({ message: "No YouTubers found" });
        }

        // 인기 유튜버 정렬
        getYoutuberArr.sort((a, b) => b.extra.popularity - a.extra.popularity);
        const topYoutuber = getYoutuberArr[0];

        // 정상적으로 반환
        return res.status(200).json(topYoutuber);
    } catch (error) {
        console.error("Error while fetching data:", error);
        return res.status(500).json({ message: "Error fetching data from the database" });
    }
}