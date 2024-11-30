import { connectDB } from "@/@util/database";
import { getClientIp, rateLimiter } from "@/@util/functions/rateLimit";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // 클라이언트 IP 추출 및 Rate Limiting 적용
        const clientIp = getClientIp(req);

        try {
            await rateLimiter.consume(clientIp);
        } catch (rateLimiterRes) {
            return res.status(429).json({
                message: "너무 많은 요청이 확인되었습니다. 잠시 후 다시 실행해주세요.",
            });
        }

        // 요청 메서드 확인
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method Not Allowed" });
        }

        // 세션 확인
        const session: Session | null = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "세션이 확인되지 않습니다." });
        }

        const userdata = session.user;

        if (!userdata) {
            return res.status(400).json({ message: "유저 정보를 확인하지 못했습니다." });
        }

        if (!userdata.email) {
            return res.status(403).json({ message: "유저 이메일을 확인하지 못했습니다." });
        }

        // 데이터베이스 연결
        let db: Db;
        try {
            db = (await connectDB).db('youtube');
        } catch (error) {
            console.error("Database connection error:", error);
            return res.status(500).json({ message: "Database connection failed" });
        }

        const userEmail = userdata.email;

        console.log(userEmail)

        // 유저 데이터 삭제
        try {
            const deleteResult = await db.collection('userdata').deleteOne({ email: userEmail });

            if (deleteResult.deletedCount === 0) {
                return res.status(404).json({
                    message: "삭제하려는 유저 데이터를 찾을 수 없습니다.",
                });
            }
        } catch (error) {
            console.error("Error deleting user data:", error);
            return res.status(500).json({ message: "회원 탈퇴 중 오류가 발생했습니다." });
        }

        return res.status(200).json({ message: "회원 탈퇴가 성공적으로 이루어졌습니다." });

    } catch (error) {
        // 최상위 에러 핸들링
        console.error("Unexpected error:", error);
        return res.status(500).json({
            message: "서버에서 예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
    }
}