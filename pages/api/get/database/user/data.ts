import { connectDB } from "@/@util/database";
import { DBUserdataType } from "@/types/userdata";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

/** userdata db에서 get하거나 없을경우 post 하는 api */
export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    // 지원하지 않는 메서드 처리
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const userEmail = req.query.email;

    // channelId 유효성 검사
    if (Array.isArray(userEmail) || !userEmail) {
        return res.status(400).json({ message: 'Authentication required' });
    }

    // 데이터베이스 연결 처리
    let db: Db;
    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        return res.status(500).json({ message: "Database connection failed", error });
    }

    try {
        // 이메일로 기존 유저 데이터 검색
        const dbUserData = await db.collection<DBUserdataType>('userdata').findOne({ email: userEmail });

        if (!dbUserData) {
            return res.status(404).json({ message: "User data not found" });
        }

        const { refreshToken, ...clientUserdata } = dbUserData;

        return res.status(200).json({ userdata: clientUserdata });
    } catch (dbError) {
        return res.status(500).json({ message: "Database operation failed", error: dbError });
    }
}