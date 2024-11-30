import { connectDB } from "@/@util/database";
import moment from "moment-timezone";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');

    let db: Db;

    try {
        // db 연결
        db = (await connectDB).db('youtube');
    } catch (error) {
        console.error("Database connection error:", error);
        return res.status(500).json({ message: "Failed to connect to the database" });
    }

    try {
        // 인기 유튜버 데이터 조회
        let getPopularYoutuberResult = await db.collection('popular-video')
        .find({ date: koreaTime }).toArray();

        // 인기 비디오 카운트 기준으로 내림차순 정렬
        getPopularYoutuberResult.sort((a, b) => b.count - a.count);

        // 상위 10개만 가져오기
        if (getPopularYoutuberResult.length > 10) {
            getPopularYoutuberResult = getPopularYoutuberResult.slice(0, 10);
        }

        return res.status(200).json(getPopularYoutuberResult);
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        return res.status(500).json({ message: "Error fetching popular videos data" });
    }
}