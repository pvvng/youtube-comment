import generateRandomName from "@/@util/functions/generateRandomName";
import { connectDB } from "@/@util/database";
import { DBUserdataType } from "@/types/userdata";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

/** userdata db에 존재하는지 확인하는 api 존재하지 않으면 insert */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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

        // 새로운 유저 데이터 준비
        const newUserData : DBUserdataType = {
            _id: new ObjectId(),
            name: userdata.name || generateRandomName(6),
            email: userdata.email,
            image: userdata.image || null,
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