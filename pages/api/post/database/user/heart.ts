import { connectDB } from "@/@util/database";
import { DBUserdataType, UserHeartedType } from "@/types/userdata";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyType {
    id: string;
    name: string;
    thumbnailUrl: string;
    type: 'youtuber' | 'video';
    userEmail: string;
    isChecked: boolean;
}

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // 입력 값 확인
    const { id, name, thumbnailUrl, type, userEmail, isChecked }: BodyType = req.body;


    if(type !== "video" && type !== "youtuber"){
        return res.status(405).json({ message : "Not Validate Type" });
    }

    if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
    }

    let db: Db;
    
    try {
        db = (await connectDB).db('youtube');
    } catch (error) {
        console.error("Database connection failed:", error);
        return res.status(500).json({ message: 'Database connection failed', error });
    }

    let dbUserData: DBUserdataType | null;
    try {
        dbUserData = await db.collection<DBUserdataType>('userdata').findOne({ email: userEmail });
    } catch (error) {
        console.error("Failed to retrieve user data:", error);
        return res.status(500).json({ message: "Failed to retrieve user data", error });
    }

    if (!dbUserData) {
        return res.status(404).json({ message: "User data not found" });
    }

    try {
        let fieldType = getUpdateHeart(type);

        if(!fieldType) {
            return res.status(405).json({ message : "Not Validate Type" });
        }

        let newVideoHeart: UserHeartedType[] = [...dbUserData[fieldType]];
        const exists = newVideoHeart.some(e => e.id === id);

        if (!exists && isChecked) {
            newVideoHeart.push({ id, name, thumbnailUrl }); // 중복이 없으면 추가
        }else {
            newVideoHeart = newVideoHeart.filter(e => e.id !== id);
        }
        
        await db.collection('userdata').updateOne(
            { email: userEmail },
            { $set: { [fieldType]: newVideoHeart } }
        );

        return res.status(200).json({ message: "User data updated successfully" });
    } catch (updateError) {
        console.error("Failed to update user data:", updateError);
        return res.status(500).json({ message: "Failed to update user data", error: updateError });
    }
}

function getUpdateHeart(
    type : "video"|"youtuber", 
):"videoHeart"|"youtuberHeart"|undefined{
    if(type === "video"){
        return "videoHeart";
    }else if (type === "youtuber"){
        return "youtuberHeart";
    }else{
        return undefined;
    }
}