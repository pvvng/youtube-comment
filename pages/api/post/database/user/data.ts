import generateRandomName from "@/@util/functions/generateRandomName";
import { connectDB } from "@/@util/database";
import { DBUserdataType } from "@/types/userdata";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { getClientIp, rateLimiter } from "@/@util/functions/security/rateLimit";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/** userdata db에 존재하는지 확인하는 api 존재하지 않으면 insert */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // rate limiting
    const clientIp = getClientIp(req); // 클라이언트 IP 추출

    try {
        // Rate Limiting 적용
        await rateLimiter.consume(clientIp);
    } catch (rateLimiterRes) {
        return res.status(429).json({ message: "너무 많은 요청이 확인되었습니다. 잠시 후 다시 실행해주세요." });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const session: Session | null = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(405).json({ message: "User Not Defined." });
    }

    const userdata = session.user;

    if (!userdata) {
        return res.status(400).json({ message: "User Data required." });
    }

    if (!userdata.email || userdata.email === undefined) {
        return res.status(403).json({ message: "user email required" });
    }

    let db: Db;

    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        return res.status(500).json({ message: 'Database connection failed' });
    }

    const userEmail = userdata.email;

    try {
        const dbUserData = await db.collection<DBUserdataType>('userdata')
        .findOne({ email: userEmail });

        // 새로운 유저 데이터 준비
        const newUserData: DBUserdataType = {
            _id: new ObjectId(),
            name: userdata.name || generateRandomName(6),
            email: userEmail,
            image: userdata.image || null,
            youtuberHeart: [],
            videoHeart: [],
        };

        if (!dbUserData) {
            // 유저 데이터가 존재하지 않으면 새로 삽입
            try {
                await db.collection('userdata').insertOne(newUserData);

                return res.status(201).json({ userdata: newUserData });
            } catch (insertError) {
                return res.status(500).json({
                    message: "Failed to create new user data",
                    error: insertError,
                });
            }
        } else {
            // 유저 데이터가 존재하는 경우
            return res.status(200).json({ userdata: dbUserData });
        }
    } catch (dbError) {
        return res.status(500).json({ message: "Database operation failed", error: dbError });
    }
}