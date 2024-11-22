import { connectDB } from "@/@util/database";
import { sanitizeValue } from "@/@util/functions/preventNoSQLAttack";
import { getClientIp, rateLimiter } from "@/@util/functions/rateLimit";
import moment from "moment-timezone";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    message: string;
    feedback: 'good' | 'bad';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

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

    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');

    // 요청 데이터 파싱 및 타입 검사
    const { message, feedback }: BodyType = req.body;

    // User-Agent와 IP 로깅
    const userAgent = req.headers['user-agent'];
    console.log("User-Agent:", userAgent);
    console.log("User-IP:", clientIp);

    // 입력값 검증 및 정리
    const sanitizedMessage = sanitizeValue(message);

    if (!sanitizedMessage || sanitizedMessage.trim() === "") {
        return res.status(400).json({ message: "Message cannot be empty. Please provide a valid message." });
    }

    if (!feedback || feedback.trim() === "") {
        return res.status(400).json({ message: "Feedback must be provided. Valid values are 'good' or 'bad'." });
    }

    if (sanitizedMessage.length > 100 || sanitizedMessage.length < 10) {
        return res.status(400).json({ message: "Message must be between 10 and 100 characters." });
    }

    if (feedback !== "bad" && feedback !== "good") {
        return res.status(400).json({ message: "Invalid feedback value. Only 'good' or 'bad' are allowed." });
    }

    // 데이터베이스 연결
    let db: Db;
    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        console.error("Database connection failed:", error);
        return res.status(500).json({ message: "Database connection failed." });
    }

    // 데이터베이스에 데이터 저장
    try {
        await db.collection('feedback').insertOne({
            message: sanitizedMessage,
            feedback,
            userIp: clientIp, // 요청한 IP 저장
            userAgent, // User-Agent 저장
            createdAt: koreaTime, // 요청 시간 저장
        });

        return res.redirect(302, '/contact');
    } catch (error) {
        console.error("Error inserting data into the database:", error);
        return res.status(500).json({
            message: "An error occurred while submitting your feedback. Please try again later.",
        });
    }
}