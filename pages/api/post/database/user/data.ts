import generateRandomName from "@/@util/functions/generateRandomName";
import { connectDB } from "@/@util/database";
import { DBUserdataType } from "@/types/userdata";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getClientIp, rateLimiter } from "@/@util/functions/rateLimit";
import { sanitizeValue } from "@/@util/functions/preventNoSQLAttack";

interface UserdataType {
    name?: string | null;
    email: string;
    image?: string | null;
}

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

    const session: Session = req.body;
    const userdata = session?.user;

    if (!userdata) {
        return res.status(400).json({ message: "user data required" });
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

    try {
        const dbUserData = await db.collection('userdata')
        .findOne({ email: userdata.email });

        const checkingUserdata : UserdataType = {
            name : userdata.name,
            email : userdata.email,
            image : userdata.image
        }

        const checkedUserData = checkUserdataValidation(checkingUserdata);

        // 새로운 유저 데이터 준비
        const newUserData : DBUserdataType = {
            _id: new ObjectId(),
            name: checkedUserData.sanitizedName,
            email: checkedUserData.sanitizedEmail,
            image: checkedUserData.sanitizedImage,
            youtuberHeart: [],
            videoHeart: [],
        };

        if (!dbUserData) {
            try {
                await db.collection('userdata').insertOne(newUserData);
                
                return res.status(201).json({ userdata: newUserData });
            } catch (insertError) {
                return res.status(500).json({ message: "Failed to create new user data", error: insertError });
            }
        } else {
            return res.status(200).json({ userdata : dbUserData });
        }
    } catch (dbError) {
        return res.status(500).json({ message: "Database operation failed", error: dbError });
    }
}

function checkUserdataValidation(userdata: UserdataType): {
    sanitizedName: string;
    sanitizedEmail: string;
    sanitizedImage: string | null;
} {
    const username = userdata.name || generateRandomName(6);
    const userEmail = userdata.email;
    const userImage = userdata.image || null;

    const sanitizedName = sanitizeValue(username);
    const sanitizedEmail = sanitizeValue(userEmail);

    let sanitizedImage = userImage;
    if (userImage) {
        sanitizedImage = sanitizeValue(userImage);
    }

    return { sanitizedName, sanitizedEmail, sanitizedImage };
}