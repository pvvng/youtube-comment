import { connectDB } from "@/@util/database";
import generateRandomName from "@/@util/functions/generateRandomName";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DBUserdataType } from "@/types/userdata";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";

/** userdata db에서 get하거나 없을경우 post 하는 api */
export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    // 지원하지 않는 메서드 처리
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // 세션에서 사용자 정보 가져오기
    const session: Session | null = await getServerSession(req, res, authOptions);
    const userdata = session?.user;

    if (!userdata) {
        return res.status(401).json({ message: "Authentication required" });
    }

    if (!userdata.email) {
        return res.status(400).json({ message: "User email required" });
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
        const dbUserData = await db.collection('userdata').findOne({ email: userdata.email });

        // 새로운 유저 데이터 준비
        const newUserData : DBUserdataType = {
            _id: new ObjectId(),
            name: userdata.name || generateRandomName(6),
            email: userdata.email,
            image: userdata.image || null,
            youtuberHeart: [],
            videoHeart: [],
        };

        // 기존 유저 데이터가 없으면 새로운 데이터 삽입
        if (!dbUserData) {
            try {
                await db.collection('userdata').insertOne(newUserData);
                
                return res.status(201).json({ userdata: newUserData });
            } catch (insertError) {
                return res.status(500).json({ message: "Failed to create new user data", error: insertError });
            }
        } else {
            // 기존 유저 데이터 반환
            return res.status(200).json({ userdata: dbUserData });
        }
    } catch (dbError) {
        return res.status(500).json({ message: "Database operation failed", error: dbError });
    }
}