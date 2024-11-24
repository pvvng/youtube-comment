import generateRandomName from "@/@util/functions/generateRandomName";
import { connectDB } from "@/@util/database";
import { DBUserdataType } from "@/types/userdata";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { getClientIp, rateLimiter } from "@/@util/functions/rateLimit";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { encrypt } from "@/@util/functions/cryptoValue";

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
        return res.status(429).json({ message: "Too many requests. Please try again later." });
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

    if (!userdata.email) {
        return res.status(400).json({ message: "User Email required." });
    }

    let refreshToken = session.refreshToken;

    // refresh token 이 할당되지 않은 경우
    let encryptedToken: string | null = null;

    // refreshToken이 없는 경우 처리
    if (!refreshToken) {
        console.warn("Refresh token is undefined. Skipping encryption.");
    } else {
        encryptedToken = encrypt(refreshToken);
    }

    let db: Db;

    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        return res.status(500).json({ message: 'Database connection failed' });
    }

    if (!userdata.email || userdata.email === undefined) {
        return res.status(403).json({ message: "user email required" });
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
            refreshToken: encryptedToken,
            youtuberHeart: [],
            videoHeart: [],
        };

        if (!dbUserData) {
            // 유저 데이터가 존재하지 않으면 새로 삽입
            try {
                await db.collection('userdata').insertOne(newUserData);

                const { refreshToken, ...clientUserdata } = newUserData;

                // `refreshToken`을 제외한 나머지 프로퍼티 분리
                return res.status(201).json({ userdata: clientUserdata });
            } catch (insertError) {
                return res.status(500).json({
                    message: "Failed to create new user data",
                    error: insertError,
                });
            }
        } else {
            // 유저 데이터가 존재하는 경우
            if (!dbUserData.refreshToken && encryptedToken) {
                // 기존 refreshToken이 null이고, 새 encryptedToken이 존재하면 업데이트
                try {
                    await db.collection('userdata').updateOne(
                        { email: userEmail },
                        { $set: { refreshToken: encryptedToken } }
                    );
                    // 업데이트된 데이터를 반환
                    const updatedUserData = await db.collection<DBUserdataType>('userdata')
                    .findOne({ email: userEmail });

                    if (!updatedUserData) {
                        return res.status(404).json({ message: "User data not found" });
                    }
                    
                    // `refreshToken`을 제외한 나머지 프로퍼티 분리
                    const { refreshToken, ...clientUserdata } = updatedUserData;

                    return res.status(200).json({
                        message: "User refresh token updated",
                        userdata: clientUserdata,
                    });
                } catch (updateError) {
                    return res.status(500).json({
                        message: "Failed to update user refresh token",
                        error: updateError,
                    });
                }
            }

            // `refreshToken`을 제외한 나머지 프로퍼티 분리
            const { refreshToken, ...clientUserdata } = dbUserData;

            // refreshToken 업데이트 필요 없는 경우 기존 데이터 반환
            return res.status(200).json({ userdata: clientUserdata });
        }
    } catch (dbError) {
        return res.status(500).json({ message: "Database operation failed", error: dbError });
    }
}